<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;

// Rutas para productos
Route::apiResource('products', ProductController::class);

// Rutas para transacciones
Route::apiResource('transactions', TransactionController::class);

// Rutas para proveedores
Route::apiResource('suppliers', SupplierController::class);

// Ruta de ejemplo para verificar que las rutas funcionan
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
