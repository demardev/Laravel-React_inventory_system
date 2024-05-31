<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Método para obtener todos los productos
    public function index()
    {
        return Product::all();
    }

    // Método para almacenar un nuevo producto
    public function store(Request $request)
    {
        // Validación de los datos de la solicitud
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Creación del producto
        $product = Product::create($request->all());

        // Respuesta exitosa en formato JSON
        return response()->json(['message' => 'Producto creado exitosamente', 'product' => $product]);
    }
}
