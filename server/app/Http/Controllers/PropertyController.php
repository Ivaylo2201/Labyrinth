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

    public function search(Request $request)
    {
        $status = $request->query('status');
        $type = $request->query('type');
        $location = $request->query('location');

        $query = Property::with('address')->whereHas('address');

        if ($status) {
            $query->where('status', $status);
        }

        if ($type) {
            $query->where('type', $type);
        }

        if ($location) {
            $query->whereHas('address', function ($query) use ($location) {
                $query->where('country', 'LIKE', "%{$location}%")
                    ->orWhere('city', 'LIKE', "%{$location}%")
                    ->orWhere('street', 'LIKE', "%{$location}%");
            });
        }

        return PropertyResource::collection($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'status' => 'required|string',
            'type' => 'required|string',
            'price' => 'required|numeric',
            'bathrooms' => 'required|integer',
            'bedrooms' => 'required|integer',
            'area' => 'required|integer',
            'description' => 'nullable|string',
        ]);

        $property = Property::create([
            'status' => $validated['status'],
            'type' => $validated['type'],
            'price' => $validated['price'],
            'bathrooms' => $validated['bathrooms'],
            'bedrooms' => $validated['bedrooms'],
            'area' => $validated['area'],
            'description' => $validated['description'],
            'user_id' => $request->user()->id,
        ]);

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
        $property = Property::find($id);

        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        return new PropertyResource(Property::find($id));
    }

    public function update(Request $request, int $id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json(['message' => 'Property not found'], 404);
        }

        if ($property->user_id !== $request->user()->id) {
            return response()->json(['message' => 'User does not own the property'], 403);
        }

        $property->fill($request->all());
        $property->save();

        return response()->json($property, 200);
    }

    public function destroy(Request $request, int $id)
    {
        $property = Property::find($id);

        if ($property->user_id !== $request->user()->id) {
            return response()->json(['message' => 'User does not own the property'], 403);
        }

        Property::destroy($id);
        return response()->json(['message' => "Property $id has been deleted"], 200);
    }
}
