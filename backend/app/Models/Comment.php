<?php

namespace App\Models;

use App\Models\Resources\Ratingable\Ratingable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Comment extends Model
{
    use Ratingable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content', 'user_id', 'post_id', 'comment_id', 'rating_value', 'rating_value_positive', 'rating_value_negative'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    public function repliedComment(): BelongsTo
    {
        return $this->belongsTo(__CLASS__);
    }

    public function repliesComments(): HasMany
    {
        return $this->hasMany(__CLASS__);
    }
}
