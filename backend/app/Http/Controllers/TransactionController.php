<?php

namespace App\Http\Controllers;

use App\Models\ProductBox;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = Transaction::with('product', 'supplier', 'user');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->orWhereHas('supplier', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->orWhereHas('user', function ($q) use ($search) {
                $q->where('email', 'like', "%{$search}%");
            })
            ->orWhere('affected_uccs', 'like', "%{$search}%");
        }

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }

    public function store(Request $request)
    {
        Log::info('Request data:', $request->all());

        $request->validate([
            'product_id' => 'required|exists:products,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'type' => 'required|string|in:Entrada,Salida,Ajuste',
            'quantity' => 'required|numeric|min:1',
        ]);

        try {
            $affectedUCCs = [];

            $transaction = Transaction::create([
                'product_id' => $request->product_id,
                'supplier_id' => $request->supplier_id,
                'user_id' => 1, // Cambia esto según el usuario autenticado
                'quantity' => $request->quantity,
                'type' => $request->type,
                'affected_uccs' => null,
            ]);

            if ($request->type == 'Entrada') {
                for ($i = 0; $i < $request->quantity; $i++) {
                    $ucc = $this->generateUniqueUCC();
                    ProductBox::create([
                        'product_id' => $request->product_id,
                        'supplier_id' => $request->supplier_id,
                        'ucc' => $ucc,
                    ]);
                    $affectedUCCs[] = $ucc;
                }

                $transaction->affected_uccs = json_encode($affectedUCCs);
                $transaction->save();
            } elseif ($request->type == 'Salida') {
                $boxes = ProductBox::where('product_id', $request->product_id)
                    ->where('supplier_id', $request->supplier_id)
                    ->take($request->quantity)
                    ->get();

                foreach ($boxes as $box) {
                    $affectedUCCs[] = $box->ucc;
                    $box->delete();
                }

                $transaction->affected_uccs = json_encode($affectedUCCs);
                $transaction->save();
            } elseif ($request->type == 'Ajuste') {
                $currentCount = ProductBox::where('product_id', $request->product_id)
                    ->where('supplier_id', $request->supplier_id)
                    ->count();

                if ($request->quantity > $currentCount) {
                    $difference = $request->quantity - $currentCount;
                    for ($i = 0; $i < $difference; $i++) {
                        $ucc = $this->generateUniqueUCC();
                        ProductBox::create([
                            'product_id' => $request->product_id,
                            'supplier_id' => $request->supplier_id,
                            'ucc' => $ucc,
                        ]);
                        $affectedUCCs[] = $ucc;
                    }
                } elseif ($request->quantity < $currentCount) {
                    $difference = $currentCount - $request->quantity;
                    $boxes = ProductBox::where('product_id', $request->product_id)
                        ->where('supplier_id', $request->supplier_id)
                        ->take($difference)
                        ->get();

                    foreach ($boxes as $box) {
                        $affectedUCCs[] = $box->ucc;
                        $box->delete();
                    }
                }

                $transaction->affected_uccs = json_encode($affectedUCCs);
                $transaction->save();
            }

            Log::info('Transaction created successfully:', $transaction->toArray());
            return response()->json(['message' => 'Transaction created successfully']);
        } catch (\Exception $e) {
            Log::error('Error saving transaction:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error saving transaction', 'error' => $e->getMessage()], 500);
        }
    }

    private function generateUniqueUCC()
    {
        do {
            $ucc = mt_rand(100000000000, 999999999999); // Genera un número aleatorio de 12 dígitos
        } while (ProductBox::where('ucc', $ucc)->exists());

        return $ucc;
    }
}
