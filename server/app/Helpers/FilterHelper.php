<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Builder;

class FilterHelper
{
    public static function filter_by(Builder $query, $status, $type, $location): Builder
    {
        return $query->when($status, function ($query, $status) {
            return $query->where('status', $status);
        })
            ->when($type, function ($query, $type) {
                return $query->where('type', $type);
            })
            ->when($location, function ($query, $location) {
                return $query->whereHas('address', function ($query) use ($location) {
                    $query->where('country', 'LIKE', "%{$location}%")
                        ->orWhere('city', 'LIKE', "%{$location}%")
                        ->orWhere('street', 'LIKE', "%{$location}%");
                });
            });
    }
}
