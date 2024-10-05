<?php

namespace App\Http\Controllers;

use App\Http\Resources\PropertyResource;
use App\Models\Address;
use Illuminate\Http\Request;
use App\Models\Property;
use App\Models\Image;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class PropertyController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            PropertyResource::collection(Property::all()),
            Response::HTTP_OK
        );
    }

    public function search(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'status' => 'string|in:buy,rent',
                'type' => 'string|in:apartment,house',
                'location' => 'string',
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $status = $validated['status'] ?? null;
        $type = $validated['type'] ?? null;
        $location = $validated['location'] ?? null;

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

        return response()->json(
            PropertyResource::collection($query->get()),
            Response::HTTP_OK
        );
    }

    public function store(Request $request): JsonResponse
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
                'message' => 'Validation failed.',
                'errors' => $e->errors()
            ], Response::HTTP_BAD_REQUEST);
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

        foreach ($request->file('images') as $image) {
            $path = Storage::disk('public')->putFile('/images', $image);
            Image::create(['image' => $path, 'property_id' => $property->id]);
        }

        Address::create([
            'country' => $request->country,
            'city' => $request->city,
            'street' => $request->street,
            'property_id' => $property->id,
        ]);

        return response()->json(
            new PropertyResource($property),
            Response::HTTP_CREATED
        );
    }

    public function show(int $id): JsonResponse
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'message' => 'Property not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json(
            new PropertyResource($property),
            Response::HTTP_OK,
        );
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'message' => 'Property not found.'
            ], Response::HTTP_NOT_FOUND);
        }

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property.'
            ], Response::HTTP_FORBIDDEN);
        }

        $property->fill($request->all());
        $property->save();

        return response()->json($property, Response::HTTP_OK);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $property = Property::find($id);

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property.'
            ], Response::HTTP_FORBIDDEN);
        }

        Property::destroy($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
