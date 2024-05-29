<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Product;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::with(['product', 'user', 'supplier'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'user_id' => 'required|exists:users,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'type' => 'required|in:entrada,salida,ajuste',
            'quantity' => 'required|integer',
        ]);

        $transaction = Transaction::create($request->all());

        $product = Product::find($request->product_id);

        if ($request->type === 'entrada') {
            $product->quantity += $request->quantity;
        } elseif ($request->type === 'salida') {
            $product->quantity -= $request->quantity;
        }

        $product->save();

        return response()->json($transaction, 201);
    }
}

