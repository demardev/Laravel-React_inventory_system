<?php

namespace App\Http\Controllers;

use App\Models\ProductBox;
use Illuminate\Http\Request;

class ProductBoxController extends Controller
{
    // Método para obtener y filtrar cajas de productos con funcionalidad de búsqueda
    public function index(Request $request)
    {
        // Inicializar la consulta con relaciones
        $query = ProductBox::with('product', 'supplier');

        // Aplicar filtros de búsqueda si se proporcionan en la solicitud
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->whereHas('product', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->orWhereHas('supplier', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            })
            ->orWhere('ucc', 'like', "%{$search}%");
        }

        // Devolver resultados paginados y ordenados
        return $query->orderBy('created_at', 'desc')->paginate(10);
    }
}
