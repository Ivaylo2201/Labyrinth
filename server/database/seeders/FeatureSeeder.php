<?php

namespace Database\Seeders;

use App\Models\Feature;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeatureSeeder extends Seeder
{
    public function run(): void
    {
        $features = [
            'Refrigerator',
            'Oven and Stove',
            'Dishwasher',
            'Washer and Dryer',
            'Air Conditioning',
            'Heating System',
            'Television',
            'Internet',
            'Balcony',
            'Closets',
            'Swimming Pool',
            'Fireplace',
            'Security System',
            'Parking Space',
            'Landscaping'
        ];

        foreach ($features as $feature) {
            Feature::create(['name' => $feature]);
        }
        
    }
}
