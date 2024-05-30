<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SupplierController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ProductQuantityController;
use App\Http\Controllers\ProductBoxController;

Route::apiResource('suppliers', SupplierController::class);
Route::apiResource('products', ProductController::class);
Route::apiResource('transactions', TransactionController::class);
Route::apiResource('product-quantities', ProductQuantityController::class)->only(['index']);
Route::apiResource('product-boxes', ProductBoxController::class)->only(['index']);
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
