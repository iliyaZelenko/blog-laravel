<?php

namespace App;


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
//        'name_slug',
        'path',
        'description',
        'parent_id',
        'questions_count'
    ];

    protected $guarded = [
        'name_slug'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function keepInMindRecords()
    {
        return $this->hasMany(KeepInMindRecord::class);
    }


    /**
     * Какие Accessors при сериализации должны быть выданы
     */
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
    public function saveQuestion($question)
    {
        $this->increment('questions_count');
        $this->save();

        // обновляет кол-во топиков в родителських категориях
        $this->ancestors()->get()->each(function($ancestor) {
            $ancestor->increment('questions_count');
        });
//        $question->autor()->increment('messages_count');

        // сохраняет топик
        $this->questions()->save($question);
    }

    // TODO красивы вынести или убрать
    public function deleteQuestion($question) {
        $this->decrement('topics_count');

        // обновляет кол-во топиков в родителських категориях
        $this->ancestors()->get()->each(function ($ancestor) {
            $ancestor->decrement('topics_count');
        });
//        $topic->autor()->decrement('messages_count');

        // удаляет топик
        $question->delete();
    }

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

//Модель RequestPurchase:
//
//    public function requestPurchaseAccepted()
//{
//    return $this->belongsTo(RequestPurchaseAccepted::class, 'id_request_accept');
//}
//
//Модель RequestPurchaseAccepted:
//
//    public function products()
//{
//    return $this->belongsToMany(Product::class, 'request_purchase_accepted_products', 'id_request', 'id_product');
//}
//
//    public function car()
//{
//    return $this->belongsTo(Car::class, 'id_car');
//}
//
//    public function contactConsignee()
//{
//    return $this->belongsTo(Contact::class, 'id_consignee');
//}
//
//    public function contactShipper()
//{
//    return $this->belongsTo(Contact::class, 'id_shipper');
//}
//
//    public function requestPurchase()
//{
//    return $this->hasMany(RequestPurchase::class, 'id_request_accept');
//}
//
//Модель Car:
//
//    public function driver()
//{
//    return $this->belongsTo(Driver::class, 'id_driver');
//}
//
//    public function requestPurchaseAccepted()
//{
//    return $this->hasMany(RequestPurchaseAccepted::class, 'id_car');
//}
//
//Модель Driver:
//
//    public function car()
//{
//    return $this->belongsTo(Car::class, 'id_driver');
//}
//
//Модель RequestPurchaseAcceptedProduct:
//
//    public function product()
//{
//    return $this->belongsTo(Product::class, 'id_product');
//}
//
//    public function requestPurchaseAccepted()
//{
//    return $this->belongsTo(RequestPurchaseAccepted::class, 'id_request');
//}
//
//Модель Product:
//
//    public function requestPurchaseAcceptedProducts()
//{
//    return $this->hasMany(RequestPurchaseAcceptedProducts::class, 'id_product');
//}
//
//Для примера я получаю данные в контроллере следующим образом:
//
//    $requests = RequestPurchase::with(['requestPurchaseAccepted'])->paginate(20);
//
//Каким образом можно получить данные из других таблиц, если мне также необходимо получать данные порционо и без кучи запросов в БД для каждой записи RequestPurchase?
//
//
//    $requests = RequestPurchase::with(['requestPurchaseAccepted', 'requestPurchaseAccepted.products', 'requestPurchaseAccepted.car', 'requestPurchaseAccepted.contactConsignee'])->paginate(20);
