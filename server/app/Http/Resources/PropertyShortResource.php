<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyShortResource extends JsonResource
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
            'price' => number_format($this->price, 0, '.', ','),
            'bathrooms' => $this->bathrooms,
            'bedrooms' => $this->bedrooms,
            'area' => $this->area,
            'image' => $this->images->first()?->image,
        ];
    }
}
