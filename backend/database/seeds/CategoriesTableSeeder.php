<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\KeepInMindRecord;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoriesConfigs = [
            'tests' => '/self-development/tests/',
            'keepInMind' => '/self-development/keep-in-mind/'
        ];

        foreach ($categoriesConfigs as $config => $urlPrefix) {
            $configPath = "categories.$config";
            $scopeId = config("$configPath.scope");
            $tree = config("$configPath.tree");

            $this->createCategories($tree, $scopeId, $urlPrefix);
        }
    }

    protected function createCategories($items, $scopeId, $urlPrefix, $parent = null)
    {
//        dump($items);
        collect($items)->each(function ($item) use ($scopeId, $urlPrefix, $parent) {
            $fields = array_merge([
                    'parent_id' => $parent ? $parent->id : null, // $parent ? $parent->id : null, is_null($parent) ? null : $parent->id
                    'scope_id' => $scopeId,
                    'name_slug' => str_slug($item['name']),
                    'path' => '' // дальше поставится
                ],
                array_except($item, ['_children', '_kim_records'])
            );

//            dump('category: ' . $item['name']);

            $category = Category::create($fields);

            $this->setPath($category, $urlPrefix);

            if (isset($item['_kim_records'])) {
                $this->createKIMRecords($category, $item['_kim_records']);
            }
//            if (isset($parent)) {
//                $category->makeChildOf($parent);
//            }

            if (isset($item['_children'])) {
                $this->createCategories($item['_children'], $scopeId, $urlPrefix, $category);
            }
        });
    }

    protected function setPath($model, $urlPrefix)
    {
        if (is_null($model->parent_id)) {
            $pathAttribute = $model->name_slug;
        } else {
            // getAncestorsAndSelf возращает коллекцию, ancestorsAndSelf возвращал бы экземпляр Illuminate\Database\Eloquent\Builder
            $pathAttribute = $model->getAncestorsAndSelf()->pluck('name_slug')->implode('/');
        }

        $model->path = $urlPrefix . $pathAttribute;
        $model->save();
    }

    protected function createKIMRecords($category, $arr)
    {
        $models = [];

        foreach ($arr as $item) {
            $models[] = new KeepInMindRecord($item);
        }

        $category->keepInMindRecords()->saveMany($models);
    }
}

