<?php

namespace App\Models;

use App\Models\Resources\Ratingable\Ratingable;
use Illuminate\Database\Eloquent\Builder;
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
        'content', 'user_id', 'post_id', 'comment_id', 'rating_value', 'rating_value_positive', 'rating_value_negative',
        'replies_count'
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
        return $this->belongsTo(__CLASS__, 'comment_id');
    }

    public function repliesComments(): HasMany
    {
        return $this->hasMany(__CLASS__);
    }

    public function scopeIsRoot(Builder $query): Builder
    {
        return $query->where('comment_id');
    }

//    public function saveComment(Comment $comment): self
//    {
//        $this->increment('replies_comments_count');
//        $comment->user()->increment('comments_count');
//        $this->repliesComments()->save($comment);
//
//        return $this;
//    }
//
//    public function deleteComment(Post $comment): self
//    {
//        $this->decrement('replies_comments_count');
//        $comment->user()->decrement('comments_count');
//        $comment->delete();
//
//        return $this;
//    }

    /**
     * Дети и их дети (рекурсивно все дети)
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function allRepliesComments(): HasMany
    {
        return $this->repliesComments()->with([
            'allRepliesComments'
        ]);
    }
}
