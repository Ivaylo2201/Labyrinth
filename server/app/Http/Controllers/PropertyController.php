<?php

namespace App\Http\Controllers;

use App\Enums\Status;
use App\Http\Resources\PropertyResource;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\Property;
use Illuminate\Validation\ValidationException;

class PropertyController extends Controller
{
    public function index()
    {
        return PropertyResource::collection(Property::all());
    }

    public function search(Request $request)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|string|in:buy,rent',
                'type' => 'required|string|in:apartment,house',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], Status::BadRequest->value);
        }

        $status = $validated['status'];
        $type = $validated['type'];
        $location = $validated['location'];

        $query = Property::with('address')->whereHas('address');

        $query->when($status, function ($query, $status) {
            return $query->where('status', $status);
        })->when($type, function ($query, $type) {
            return $query->where('type', $type);
        });

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
        try {
            $validated = $request->validate([
                'status' => 'required|string',
                'type' => 'required|string',
                'price' => 'required|numeric',
                'bathrooms' => 'required|integer',
                'bedrooms' => 'required|integer',
                'area' => 'required|integer',
                'description' => 'nullable|string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], Status::BadRequest->value);
        }

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

        return response()->json($property, Status::Created->value);
    }

    public function show(int $id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'message' => 'Property not found'
            ], Status::NotFound->value);
        }

        return new PropertyResource(Property::find($id));
    }

    public function update(Request $request, int $id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'message' => 'Property not found'
            ], Status::NotFound->value);
        }

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property'
            ], Status::Forbidden->value);
        }

        $property->fill($request->all());
        $property->save();

        return response()->json($property, Status::OK->value);
    }

    public function destroy(Request $request, int $id)
    {
        $property = Property::find($id);

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property'
            ], Status::Forbidden->value);
        }

        Property::destroy($id);

        return response()->json([
            'message' => "Property $id has been deleted"
        ], Status::OK->value);
    }
}
