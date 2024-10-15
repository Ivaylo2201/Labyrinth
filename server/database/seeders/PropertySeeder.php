<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $properties = [
            [
                'status' => 'rent',
                'type' => 'house',
                'price' => 500,
                'bathrooms' => 1,
                'bedrooms' => 2,
                'area' => 100,
                'description' => 'A nice house',
                'user_id' => User::first()->id,
            ],
            [
                'status' => 'buy',
                'type' => 'apartment',
                'price' => 150000,
                'bathrooms' => 2,
                'bedrooms' => 3,
                'area' => 120,
                'description' => 'A nice apartment',
                'user_id' => User::skip(1)->take(1)->first()->id,
            ]
        ];

        foreach ($properties as $property) {
            $instance = Property::create($property);

            Address::create([
                'country' => 'Bulgaria',
                'city' => 'Sofia',
                'street' => '123 Ivan Vazov str.',
                'property_id' => $instance->id,
            ]);
        }
    }
}
