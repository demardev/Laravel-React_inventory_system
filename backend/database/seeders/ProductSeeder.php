<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create(['name' => 'Producto 1', 'description' => 'Descripción del Producto 1']);
        Product::create(['name' => 'Producto 2', 'description' => 'Descripción del Producto 2']);
        Product::create(['name' => 'Producto 3', 'description' => 'Descripción del Producto 3']);
        Product::create(['name' => 'Producto 4', 'description' => 'Descripción del Producto 4']);
        Product::create(['name' => 'Producto 5', 'description' => 'Descripción del Producto 5']);
    }
}
