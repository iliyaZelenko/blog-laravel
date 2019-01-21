<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KeepInMindRecord extends Model
{
    protected $table = 'keep_in_mind_records';

    protected $fillable = [
        'title',
        'text',
        'links'
    ];

    protected $casts = [
        'links' => 'array',
    ];
}
