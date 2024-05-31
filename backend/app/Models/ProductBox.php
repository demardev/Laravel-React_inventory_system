<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductBox extends Model
{
    use HasFactory;

    // Campos que se pueden llenar masivamente
    protected $fillable = ['product_id', 'supplier_id', 'ucc'];

    // Relación muchos a uno con productos
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // Relación muchos a uno con proveedores
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
