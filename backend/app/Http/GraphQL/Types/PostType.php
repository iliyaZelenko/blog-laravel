<?php

namespace App\Http\GraphQL\Types;

use App\Models\Post;
use GraphQL\Type\Definition\ResolveInfo;

class PostType
{
    public function getRatingInfo(Post $root, array $args, $context, ResolveInfo $resolveInfo)
    {
//        dump($root, $args, $context, $resolveInfo);

//        return '123';

        return [
            'value' => $root->ratingValue // $root->rating()
        ];
    }
}
