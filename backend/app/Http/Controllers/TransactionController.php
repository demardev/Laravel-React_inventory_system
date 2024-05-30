<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::with('product', 'user', 'supplier')->get();
    }

    public function store(Request $request)
    {
        Log::info('Transaction store called');

        // Log the incoming request data
        Log::info('Request Data: ', $request->all());

        // Validate the incoming request data
        try {
            $validatedData = $request->validate([
                'product_id' => 'required|exists:products,id',
                'user_id' => 'required|exists:users,id',
                'supplier_id' => 'nullable|exists:suppliers,id',
                'type' => 'required|in:entrada,salida,ajuste',
                'quantity' => 'required|integer',
            ]);
            Log::info('Validated Data: ', $validatedData);
        } catch (\Exception $e) {
            Log::error('Validation Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 400);
        }

        // Update the product quantity based on the transaction type
        try {
            $product = Product::findOrFail($validatedData['product_id']);
            if ($validatedData['type'] === 'entrada') {
                $product->quantity += $validatedData['quantity'];
            } elseif ($validatedData['type'] === 'salida') {
                $product->quantity -= $validatedData['quantity'];
                if ($product->quantity < 0) {
                    return response()->json(['error' => 'Insufficient product quantity'], 400);
                }
            } // For 'ajuste', you may want to implement custom logic based on your requirements
            $product->save();
        } catch (\Exception $e) {
            Log::error('Product Update Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }

        // Create the transaction
        try {
            $transaction = Transaction::create($validatedData);
            Log::info('Transaction created: ', $transaction->toArray());
            return response()->json($transaction, 201);
        } catch (\Exception $e) {
            Log::error('Transaction Creation Error: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
