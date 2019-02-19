<?php

namespace App\Http\GraphQL\Mutations;

use App\Models\Comment;
use GraphQL\Type\Definition\ResolveInfo;

class CommentMutator
{
    public function create($root, array $args, $context, ResolveInfo $resolveInfo): Comment
    {
//        dump($args);

        $input = $args['input'];
        $created = Comment::create([
            'post_id' => $input['postId'],
            'user_id' => $input['userId'],
            'comment_id' => $input['commentId'],
            'content' => $input['content']
        ]);

        dump($created);

        return $created;
    }
}
