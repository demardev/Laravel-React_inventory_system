<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        // Incluir el proveedor en la consulta
        $products = Product::with('supplier')->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ucc' => 'required|string|max:12|unique:products',
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product = Product::create($request->all());

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        return $product;
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'ucc' => 'required|string|max:12|unique:products,ucc,' . $product->id,
            'quantity' => 'required|integer',
            'price' => 'required|numeric',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product->update($request->all());

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(null, 204);
    }
}
