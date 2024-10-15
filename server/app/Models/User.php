<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'email',
        'username',
        'password',
        'phone_number',
        'location',
        'role_id',
    ];

    protected $hidden = [
        'password',
    ];

    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function isAdmin() {
        return $this->role->name === 'admin';
    }
}
