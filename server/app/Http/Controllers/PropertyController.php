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
use Illuminate\Support\Facades\Validator;

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
        $validator = Validator::make($request->all(), [
            'status' => 'string|in:buy,rent',
            'type' => 'string|in:apartment,house',
            'location' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);
        }

        $data = $validator->validated();

        $status = $data['status'] ?? null;
        $type = $data['type'] ?? null;
        $location = $data['location'] ?? null;

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
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:buy,rent',
            'type' => 'required|string|in:apartment,house',
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
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);

        $data = $validator->validated();

        $property = Property::create([
            'status' => $data['status'],
            'type' => $data['type'],
            'price' => $data['price'],
            'bathrooms' => $data['bathrooms'],
            'bedrooms' => $data['bedrooms'],
            'area' => $data['area'],
            'description' => $data['description'],
            'user_id' => $request->user()->id,
        ]);

        Address::create([
            'country' => $data['country'],
            'city' => $data['city'],
            'street' => $data['street'],
            'property_id' => $property->id,
        ]);

        foreach ($request->file('images') as $image) {
            $path = Storage::disk('public')->putFile('/images', $image);
            Image::create(['image' => $path, 'property_id' => $property->id]);
        }

        // 'features' is the array of the ids of each checked feature
        $property->features()->attach($data['features']);

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

        if (!$property)
            return response()->json([
                'message' => 'Property not found.'
            ], Response::HTTP_NOT_FOUND);

        $validator = Validator::make($request->all(), [
            'status' => 'string|in:buy,rent',
            'price' => 'numeric|min:1',
            'description' => 'nullable|string',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], Response::HTTP_BAD_REQUEST);

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property.'
            ], Response::HTTP_FORBIDDEN);
        }

        $property->fill($validator->validated());
        $property->save();

        return response()->json($property, Response::HTTP_OK);
    }

    public function destroy(Request $request, int $id): JsonResponse
    {
        $property = Property::find($id);

        if (!$property)
            return response()->json([
                'message' => 'Property not found.'
            ], Response::HTTP_NOT_FOUND);

        if ($property->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'User does not own the property.'
            ], Response::HTTP_FORBIDDEN);
        }

        Property::destroy($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
