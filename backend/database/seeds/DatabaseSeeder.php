<?php

use Illuminate\Database\Seeder;
use App\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        if (User::count() < 10) {
            factory(User::class, 5)->create();
        }

        if (!User::where('name', 'Vladimir Putin')->first()) {
            factory(User::class)->create([
                'name' => 'Vladimir Putin',
                'email' => 'test@test.com',
                'password' => Hash::make('password')
            ]);
        }

        $this->call(ScopesTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(QuestionsTableSeeder::class);
    }
}
