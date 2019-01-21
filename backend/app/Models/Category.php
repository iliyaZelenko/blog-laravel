<?php

namespace App\Models;


class Category extends BaseModelBaum {

    protected $table = 'categories';

//    // 'parent_id' column name
//    protected $parentColumn = 'parent_id';

//    // 'lft' column name
//    protected $leftColumn = 'lidx';
//
//    // 'rgt' column name
//    protected $rightColumn = 'ridx';
//
//    // 'depth' column name
//    protected $depthColumn = 'nesting';
//
//    // guard attributes from mass-assignment
//    protected $guarded = array('id', 'parent_id', 'lidx', 'ridx', 'nesting');

    protected $fillable = [
        'name',
        // TODO было закомментировано
        'name_slug',
        'path',
        'description',
        'parent_id',
        'posts_count',
        'all_posts_count'
    ];

    protected $guarded = [
        'name_slug'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
//    public function keepInMindRecords()
//    {
//        return $this->hasMany(KeepInMindRecord::class);
//    }


    /**
     * Какие Accessors при сериализации должны быть выданы
     */
//    TODO возможно чтобы не делать rename тут можно сразу написать camelCase
    protected $appends = ['have_child', 'ancestors_and_self_info', 'path_info']; // , 'path'

    public function getHaveChildAttribute()
    {
        return $this->haveChild();
    }

    /**
     * @return mixed|string
     */
//    public function getPathAttribute()
//    {
//        if (is_null($this->parent_id)) {
//            return $this->name_slug;
//        }
//
//        // getAncestorsAndSelf возращает коллекцию, ancestorsAndSelf возвращал бы экземпляр Illuminate\Database\Eloquent\Builder
//        return $this->getAncestorsAndSelf()->pluck('name_slug')->implode('/');
//    }

    public function getAncestorsAndSelfInfoAttribute()
    {
        return $this->getAncestorsAndSelf()->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'name_slug' => $item->name_slug,
                'path' => $item->path,
            ];
        });
    }

    /**
     * Информация о предках и о себе в формате [ [ <id> => <value> ], [ <id> => <value> ] ]
     *
     * @return \Illuminate\Support\Collection
     */
    public function getPathInfoAttribute()
    {
        return $this->getAncestorsAndSelf()->pluck('name', 'id');
    }

    /**
     * Есть ли дети у категории
     *
     * @return bool
     */
    public function haveChild()
    {
        // TODO $this->isLeaf()
        return +$this->rgt - +$this->lft !== 1;
    }

    // TODO красивы вынести или убрать
    public function savePost($post)
    {
        $this->increment('all_posts_count');
        $this->increment('posts_count');

        // обновляет кол-во постов в родителських категориях
        $this->ancestors()->get()->each(function($ancestor) {
            $ancestor->increment('all_posts_count');
        });
//        $question->autor()->increment('messages_count');

        // сохраняет пост
        $this->posts()->save($post);
    }

    // TODO красивы вынести или убрать
    public function deletePost($post) {
        $this->decrement('all_posts_count');
        $this->decrement('posts_count');

        // обновляет кол-во постов в родителських категориях
        $this->ancestors()->get()->each(function ($ancestor) {
            $ancestor->decrement('all_posts_count');
        });
//        $topic->autor()->decrement('messages_count');

        // удаляет пост
        $post->delete();
    }

//    // TODO красиво вынести или убрать
//    public function saveQuestion($question)
//    {
//        $this->increment('questions_count');
//        $this->save();
//
//        // обновляет кол-во топиков в родителських категориях
//        $this->ancestors()->get()->each(function($ancestor) {
//            $ancestor->increment('questions_count');
//        });
////        $question->autor()->increment('messages_count');
//
//        // сохраняет топик
//        $this->questions()->save($question);
//    }
//
//    // TODO красиво вынести или убрать
//    public function deleteQuestion($question) {
//        $this->decrement('topics_count');
//
//        // обновляет кол-во топиков в родителських категориях
//        $this->ancestors()->get()->each(function ($ancestor) {
//            $ancestor->decrement('topics_count');
//        });
////        $topic->autor()->decrement('messages_count');
//
//        // удаляет топик
//        $question->delete();
//    }

    /**
     * Дети и их дети
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function allChildren()
    {
        return $this->children()->with([
            'allChildren',
//            'questions'
        ]);
//            ->withCount('questions as my_questions_count');
    }
}
