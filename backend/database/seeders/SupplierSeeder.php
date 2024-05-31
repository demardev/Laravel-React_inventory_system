<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Supplier;

class SupplierSeeder extends Seeder
{
    public function run()
    {
        Supplier::create(['name' => 'Proveedor 1', 'address' => 'Dirección del Proveedor 1']);
        Supplier::create(['name' => 'Proveedor 2', 'address' => 'Dirección del Proveedor 2']);
        Supplier::create(['name' => 'Proveedor 3', 'address' => 'Dirección del Proveedor 3']);
        Supplier::create(['name' => 'Proveedor 4', 'address' => 'Dirección del Proveedor 4']);
        Supplier::create(['name' => 'Proveedor 5', 'address' => 'Dirección del Proveedor 5']);
        Supplier::create(['name' => 'Proveedor 6', 'address' => 'Dirección del Proveedor 6']);
        Supplier::create(['name' => 'Proveedor 7', 'address' => 'Dirección del Proveedor 7']);
    }
}
