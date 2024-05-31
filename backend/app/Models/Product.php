<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    // Campos que se pueden llenar masivamente
    protected $fillable = ['name', 'description'];

    // Relación uno a muchos con transacciones
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
