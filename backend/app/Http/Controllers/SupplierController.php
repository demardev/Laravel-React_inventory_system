<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    // Método para obtener todos los proveedores
    public function index()
    {
        return Supplier::all();
    }

    // Método para almacenar un nuevo proveedor
    public function store(Request $request)
    {
        // Validación de los datos de la solicitud
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
        ]);

        // Creación del proveedor
        $supplier = Supplier::create($request->all());

        // Respuesta exitosa en formato JSON
        return response()->json(['message' => 'Proveedor creado exitosamente', 'supplier' => $supplier]);
    }
}
