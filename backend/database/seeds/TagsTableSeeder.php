<?php

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $count = 15;
        $savedCount = Tag::count();

        if ($savedCount < $count) {
            factory(Tag::class, $count - $savedCount)->create();
        }
    }
}

