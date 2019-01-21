<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scope extends Model
{
    protected $table = 'scopes';

    protected $fillable = [
        'name',
        'name_slug',
        'description',
        'icon',
        'url',
        'img'
    ];

    public function categories()
    {
        return $this->hasMany(Category::class);
    }
}
