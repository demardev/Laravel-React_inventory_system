<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'ucc' => 'required|string|size:12|unique:products',
            'quantity' => 'required|integer',
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }
}




