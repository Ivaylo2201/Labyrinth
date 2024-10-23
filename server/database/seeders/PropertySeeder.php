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

        $images = [
            ['2i27hA8Onbx2WJ1BhxhqGnVr5LajoreHEAOGxKnY.jpg', 'D4w0xIFbGi1A9Xc2wsGuJo1Vvri69RVUvg8QefeO.jpg'],
            ['zySVnSDJaqTEhTYIaGLxYFs2Hr4Vp9hNvdMgnCMX.jpg', '5ObX6wppdD4egUp24OCY2hvuMbPqNwoXbmejMUfh.jpg'],
        ];

        $features = [
            Feature::whereRaw('id % 2 = 0')->pluck('id'),
            Feature::whereRaw('id % 2 != 0')->pluck('id'),
        ];

        for ($i = 0; $i < 2; $i++) {
            $instance = Property::create($properties[$i]);

            Address::create([
                'country' => 'Bulgaria',
                'city' => 'Sofia',
                'street' => '123 Ivan Vazov str.',
                'property_id' => $instance->id,
            ]);

            foreach ($images[$i] as $image) {
                Image::create([
                    'image' => 'images/' . $image,
                    'property_id' => $instance->id,
                ]);
            }

            $instance->features()->attach($features[$i]);
        }
    }
}
