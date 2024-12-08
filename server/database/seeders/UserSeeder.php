<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user_role_id = Role::where('name', '=', 'user')->first()->id;
        $admin_role_id = Role::where('name', '=', 'admin')->first()->id;

        $users = [
            [
                'email' => 'ivan.petrov@test.com',
                'username' => 'ivanpetrov',
                'password' => 'ivanpetrov',
                'phone_number' => '0892450786',
                'location' => 'Varna',
                'role_id' => $admin_role_id,
            ],
            [
                'email' => 'petar.ivanov@test.com',
                'username' => 'petarivanov',
                'password' => 'petarivanov',
                'phone_number' => '08892350842',
                'location' => 'Sofia',
                'role_id' => $user_role_id,
            ]
        ];

        User::insert(array_map(function ($user) {
            $user['password'] = Hash::make($user['password']);
            return $user;
        }, $users));
    }
}
