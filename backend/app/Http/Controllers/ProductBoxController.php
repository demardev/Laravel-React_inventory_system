<?php

namespace App\Http\Controllers;

use App\Models\ProductBox;
use Illuminate\Http\Request;

class ProductBoxController extends Controller
{
    public function index(Request $request)
    {
        $query = ProductBox::with('product', 'supplier');

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

        return $query->orderBy('created_at', 'desc')->paginate(10);
    }
}
