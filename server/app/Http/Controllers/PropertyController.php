<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\Property;

class PropertyController extends Controller
{

    public function index()
    {
        return PropertyResource::collection(Property::all());
    }

    public function store(Request $request)
    {
        // Implement validation rules
        $property = Property::create($request->all());

        Address::create([
            'country' => $request->country,
            'city' => $request->city,
            'street' => $request->street,
            'property_id' => $property->id,
        ]);

        return response()->json($property, 201);
    }

    public function show(int $id)
    {
        return response()->json(Property::find($id), 200);
    }

    public function update(Request $request, int $id)
    {
        $property = Property::find($id);

        $validated = $request->validate([
            'type' => 'sometimes|string|max:10',
            'price' => 'sometimes|numeric|min:0|max:99999999.99',
            'bathrooms' => 'sometimes|integer|min:0|max:32767',
            'bedrooms' => 'sometimes|integer|min:0|max:32767',
            'area' => 'sometimes|numeric|min:0|max:999.99',
            'description' => 'sometimes|string',
            'user_id' => 'sometimes|exists:users,id',
        ]);

        $property->fill($validated);
        $property->save();
        return response()->json($property, 200);
    }

    public function destroy(int $id)
    {
        Property::destroy($id);
        return response()->json(['message' => "Property $id has been deleted"], 204);
    }
}
