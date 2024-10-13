<?php

namespace App\Http\Controllers;

use App\Helpers\FilterHelper;
use App\Helpers\ValidationHelper;
use App\Rules\PropertyControllerRules;
use App\Http\Resources\PropertyResource;
use App\Http\Resources\PropertyShortResource;
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
            PropertyShortResource::collection(Property::all()),
            Response::HTTP_OK
        );
    }

    public function search(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(), 
            PropertyControllerRules::search()
        );

        if ($validator->fails())
            return ValidationHelper::invalidate($validator);

        $data = $validator->validated();

        $status = $data['status'] ?? null;
        $type = $data['type'] ?? null;
        $location = $data['location'] ?? null;
        $column = $data['column'] ?? null;
        $sort = $data['sort'] ?? 'asc';

        $query = FilterHelper::filter_by(
            Property::with('address')->whereHas('address'),
            $status,
            $type,
            $location
        );

        if ($column)
            $query->orderBy($column, $sort);

        return response()->json(
            PropertyShortResource::collection($query->get()),
            Response::HTTP_OK
        );
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make(
            $request->all(), 
            PropertyControllerRules::store()
        );

        if ($validator->fails())
            return ValidationHelper::invalidate($validator);

        $data = $validator->validated();

        $property = Property::create([
            'status' => $data['status'],
            'type' => $data['type'],
            'price' => $data['price'],
            'bathrooms' => $data['bathrooms'],
            'bedrooms' => $data['bedrooms'],
            'area' => $data['area'],
            'description' => $data['description'] ?? 'No description provided.',
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

        $validator = Validator::make($request->all(), PropertyControllerRules::update());

        if ($validator->fails())
            return ValidationHelper::invalidate($validator);

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
