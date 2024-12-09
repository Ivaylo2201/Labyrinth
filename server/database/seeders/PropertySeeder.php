<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Feature;
use App\Models\Image;
use App\Models\Property;
use App\Models\User;
use Illuminate\Database\Seeder;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $first_user_id = User::first()->id;
        $second_user_id = User::skip(1)->take(1)->first()->id;

        $properties = [
            [
                'status' => 'rent',
                'type' => 'house',
                'price' => 500,
                'bathrooms' => 1,
                'bedrooms' => 2,
                'area' => 100,
                'description' => 'A nice house',
                'user_id' => $first_user_id,
            ],
            [
                'status' => 'buy',
                'type' => 'apartment',
                'price' => 150000,
                'bathrooms' => 2,
                'bedrooms' => 3,
                'area' => 120,
                'description' => 'A nice apartment',
                'user_id' => $second_user_id,
            ],
            [
                'status' => 'rent',
                'type' => 'apartment',
                'price' => 750,
                'bathrooms' => 1,
                'bedrooms' => 1,
                'area' => 80,
                'description' => 'A cozy apartment in the city center',
                'user_id' => $first_user_id,
            ],
            [
                'status' => 'buy',
                'type' => 'house',
                'price' => 250000,
                'bathrooms' => 3,
                'bedrooms' => 4,
                'area' => 200,
                'description' => 'A spacious house with a garden',
                'user_id' => $second_user_id,
            ],
            [
                'status' => 'rent',
                'type' => 'house',
                'price' => 1200,
                'bathrooms' => 2,
                'bedrooms' => 3,
                'area' => 150,
                'description' => 'A modern house near the park',
                'user_id' => $first_user_id,
            ],
            [
                'status' => 'buy',
                'type' => 'apartment',
                'price' => 200000,
                'bathrooms' => 2,
                'bedrooms' => 3,
                'area' => 110,
                'description' => 'A luxurious apartment with great views',
                'user_id' => $second_user_id,
            ],
        ];

        $images = [
            ['house5.jpg', 'house6.jpg'],
            ['apartment5.jpeg', 'apartment6.jpg'],
            ['apartment1.jpg', 'apartment2.jpg'],
            ['house1.jpg', 'house2.jpg'],
            ['house3.jpg', 'house4.jpg'],
            ['apartment3.jpg', 'apartment4.jpg'],
        ];

        $features = [
            Feature::inRandomOrder()->take(3)->pluck('id'),
            Feature::inRandomOrder()->take(4)->pluck('id'),
            Feature::inRandomOrder()->take(2)->pluck('id'),
            Feature::inRandomOrder()->take(5)->pluck('id'),
            Feature::inRandomOrder()->take(3)->pluck('id'),
            Feature::inRandomOrder()->take(4)->pluck('id'),
        ];

        foreach ($properties as $index => $property) {
            $instance = Property::create($property);

            Address::create([
                'country' => fake()->country(),
                'city' => fake()->city(),
                'street' => fake()->streetAddress(),
                'property_id' => $instance->id,
            ]);

            foreach ($images[$index] as $image) {
                Image::create([
                    'image' => 'images/' . $image,
                    'property_id' => $instance->id,
                ]);
            }

            $instance->features()->attach($features[$index]);
        }
    }
}
