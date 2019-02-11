<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Collection;

class Post extends BaseModel
{
    protected $fillable = [
        'title', 'title_slug', 'content', 'content_short', 'user_id', 'category_id'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function tags(): BelongsToMany
    {
        // ->withTimestamps()
        return $this->belongsToMany(Tag::class);
    }

    public function saveComment(Comment $comment)
    {
        return $this->comments()->save($comment);
    }

    public function setTags(array $idArr)
    {
        /** @var Collection $tags */
        $tags = Tag::find($idArr);

        $tags->each(function (Tag $tag) {
            $tag->increment('posts_count');
        });

        return $this->tags()->sync($idArr);
    }
}
