<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model as Eloquent;
use App\Traits\BaseModelTimezones;

class BaseModel extends Eloquent
{
    use BaseModelTimezones;

    /**
     * Order by DESC
     *
     * @param $query
     * @return Builder
     */
    public function scopeOrderByDESC($query): Builder
    {
        return $query->orderBy('created_at', 'desc');
    }

    /**
     * Order by ASC
     *
     * @param $query
     * @return Builder
     */
    public function scopeOrderByASC($query): Builder
    {
        return $query->orderBy('created_at', 'asc');
    }
}
