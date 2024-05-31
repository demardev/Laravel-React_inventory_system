<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProductQuantityController;
use App\Http\Controllers\ProductBoxController;

// Rutas para recursos API de proveedores
Route::apiResource('suppliers', SupplierController::class);

// Rutas para recursos API de productos
Route::apiResource('products', ProductController::class);

// Rutas para recursos API de transacciones
Route::apiResource('transactions', TransactionController::class);

// Ruta para obtener cantidades de productos (solo índice)
Route::apiResource('product-quantities', ProductQuantityController::class)->only(['index']);

// Ruta para obtener cajas de productos (solo índice)
Route::apiResource('product-boxes', ProductBoxController::class)->only(['index']);

// Ruta para obtener el usuario autenticado
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
