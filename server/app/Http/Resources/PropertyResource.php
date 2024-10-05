<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'type' => $this->type,
            'address' => new AddressResource($this->address),
            'price' => $this->price,
            'bathrooms' => $this->bathrooms,
            'bedrooms' => $this->bedrooms,
            'area' => $this->area,
            'description' => $this->description,
            'images' => $this->images->pluck('image'),
            'features' => $this->features->pluck('name'),
            'created_at' => $this->created_at,
            'user' => new UserResource($this->user),
        ];
    }
}
