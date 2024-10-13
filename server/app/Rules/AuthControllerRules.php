<?php

namespace App\Rules;

class AuthControllerRules
{
    public static function sign_up(): array
    {
        return [
            'email' => 'required|email|unique:users,email',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:5|confirmed',
            'phone_number' => ['required', 'string'],
            'location' => 'nullable|string',
        ];
    }

    public static function reset(): array
    {
        return [
            'email' => 'required|email',
            'phone_number' => 'required|string',
            'password' => 'required|string|confirmed',
        ];
    }
}
