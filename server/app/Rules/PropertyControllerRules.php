<?php

namespace App\Rules;

class PropertyControllerRules
{
    public static function store(): array
    {
        return [
            'status' => 'required|string|in:buy,rent',
            'type' => 'required|string|in:apartment,house,office,garage',
            'price' => 'required|numeric|min:1',
            'bathrooms' => 'required|integer|min:1',
            'bedrooms' => 'required|integer|min:1',
            'area' => 'required|integer|min:1',
            'description' => 'nullable|string',
            'features' => 'required|array',
            'images' => 'required|array',
            'country' => 'required|string',
            'city' => 'required|string',
            'street' => 'required|string',
        ];
    }

    public static function search(): array
    {
        return [
            'status' => 'string|in:buy,rent',
            'type' => 'string|in:apartment,house,office,garage',
            'location' => 'string',
            'column' => 'string|in:price,bathrooms,bedrooms,area',
            'sort' => 'string|in:asc,desc',
        ];
    }

    public static function update(): array
    {
        return [
            'status' => 'string|in:buy,rent',
            'price' => 'numeric|min:1',
            'description' => 'nullable|string',
        ];
    }
}
