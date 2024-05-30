<?php

namespace App\Http\Controllers;

use App\Models\ProductQuantity;
use Illuminate\Http\Request;

class ProductQuantityController extends Controller
{
    public function index()
    {
        return ProductQuantity::with('product', 'supplier')->get();
    }
}
