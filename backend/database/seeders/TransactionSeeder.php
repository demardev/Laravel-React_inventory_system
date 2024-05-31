<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Transaction;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\ProductBox;

class TransactionSeeder extends Seeder
{
    public function run()
    {
        $products = Product::all();
        $suppliers = Supplier::all();

        $types = ['Entrada', 'Salida', 'Ajuste'];
        $transactionsToCreate = 15;

        for ($i = 0; $i < $transactionsToCreate; $i++) {
            $product = $products->random();
            $supplier = $suppliers->random();
            $quantity = rand(3, 12);
            $type = $this->getRandomType($product->id, $supplier->id, $quantity);

            if ($type === null) {
                continue; 
            }

            $transaction = Transaction::create([
                'product_id' => $product->id,
                'supplier_id' => $supplier->id,
                'user_id' => 1,
                'quantity' => $quantity,
                'type' => $type,
                'affected_uccs' => null,
            ]);

            $affectedUCCs = [];

            if ($type == 'Entrada') {
                for ($j = 0; $j < $quantity; $j++) {
                    $ucc = $this->generateUniqueUCC();
                    ProductBox::create([
                        'product_id' => $product->id,
                        'supplier_id' => $supplier->id,
                        'ucc' => $ucc,
                    ]);
                    $affectedUCCs[] = $ucc;
                }
            } elseif ($type == 'Salida') {
                $boxes = ProductBox::where('product_id', $product->id)
                    ->where('supplier_id', $supplier->id)
                    ->take($quantity)
                    ->get();

                foreach ($boxes as $box) {
                    $affectedUCCs[] = $box->ucc;
                    $box->delete();
                }
            } elseif ($type == 'Ajuste') {
                $currentCount = ProductBox::where('product_id', $product->id)
                    ->where('supplier_id', $supplier->id)
                    ->count();

                if ($quantity > $currentCount) {
                    $difference = $quantity - $currentCount;
                    for ($j = 0; $j < $difference; $j++) {
                        $ucc = $this->generateUniqueUCC();
                        ProductBox::create([
                            'product_id' => $product->id,
                            'supplier_id' => $supplier->id,
                            'ucc' => $ucc,
                        ]);
                        $affectedUCCs[] = $ucc;
                    }
                } elseif ($quantity < $currentCount) {
                    $difference = $currentCount - $quantity;
                    $boxes = ProductBox::where('product_id', $product->id)
                        ->where('supplier_id', $supplier->id)
                        ->take($difference)
                        ->get();

                    foreach ($boxes as $box) {
                        $affectedUCCs[] = $box->ucc;
                        $box->delete();
                    }
                }
            }

            $transaction->affected_uccs = json_encode($affectedUCCs);
            $transaction->save();
        }
    }

    private function generateUniqueUCC()
    {
        do {
            $ucc = mt_rand(100000000000, 999999999999); // Genera un número aleatorio de 12 dígitos
        } while (ProductBox::where('ucc', $ucc)->exists());

        return $ucc;
    }

    private function hasSufficientQuantity($productId, $supplierId, $quantity)
    {
        $currentCount = ProductBox::where('product_id', $productId)
            ->where('supplier_id', $supplierId)
            ->count();

        return $quantity <= $currentCount;
    }

    private function getRandomType($productId, $supplierId, $quantity)
    {
        $types = ['Entrada', 'Salida', 'Ajuste'];
        $type = $types[array_rand($types)];

        if ($type == 'Salida' || $type == 'Ajuste') {
            if ($this->hasSufficientQuantity($productId, $supplierId, $quantity)) {
                return $type;
            } else {
                return 'Entrada';
            }
        }

        return $type;
    }
}
