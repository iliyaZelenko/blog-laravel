<template>
  <div class="w-100 h-100">
    <h1 class="mt-5 mb-3 display-3 font-weight-light">
      {{ post.title }}
    </h1>

    <v-layout
      class="mb-4"
      align-center
      wrap
    >
      <!--
      <profile-menu :user="post.user">
        <v-layout
          slot="activator"
          align-center
          @click="onUserClick"
        >
          <user-avatar :user="post.user" />

          <span class="body-2 ml-2">
            {{ post.user.nickname }}
            <span
              v-if="post.user.fullName"
              class="grey--text"
            >
              <br>
              {{ post.user.fullName }}
            </span>
          </span>
        </v-layout>
      </profile-menu>
      -->
      <user :user="post.user" />

      <v-icon class="ml-4">
        category
      </v-icon>

      <div class="body-2 ml-1 mr-2">
        Category:

        <nuxt-link
          :to="categoryPath(post.category)"
        >
          <b>
            {{ post.category.name }}
          </b>
        </nuxt-link>
      </div>

      <rating
        class="mx-4"
        :info="ratingInfo"
      />

      <v-icon>
        label
      </v-icon>

      <span class="body-2 ml-1 mr-2">
        Tags:
      </span>

      <tags :post="post" />
    </v-layout>

    <p class="body-1">
      {{ post.content }}
    </p>

    <v-card style="position: absolute; width: 100vw; left: 0;">
      <v-container>
        <!--:root-comments-per-page="rootCommentsPerPage"-->
        <post-comments
          :comments.sync="post.comments"
          :post="post"
          :is-root="true"
          :nested-lvl="0"
        />
      </v-container>
    </v-card>

    <!--<pre>
      {{ post }}
    </pre>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PathGeneratorInterface, PostRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import { CategoryInterface } from '~/apollo/schema/categories'
import { PostInterface } from '~/apollo/schema/posts'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import Tags from '~/components/posts/post/tags/Tags.vue'
import Rating from '~/components/rating/Rating.vue'
// import PostComments from '~/components/posts/post/comments/PostComments.vue' PostComments,
import User from '~/components/user/User.vue'

const PathGenerator = serviceContainer.get<PathGeneratorInterface>(TYPES.PathGeneratorInterface)

@Component({
  name: 'Post',
  components: { User, Tags, Rating },
  scrollToTop: true,
  head () {
    return {
      title: this.post.title,
      meta: [
        { content: `Просмотр поста "${this.post.title}"`, name: 'description', hid: 'description' }
      ]
    }
  }
})
export default class Post extends Vue {
  @Prop(String) id!: string
  @Prop(String) slug!: string

  // @ts-ignore
  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface
  // @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public post!: PostInterface
  // public rootCommentsPerPage!: number

  async asyncData ({ app, redirect, error, params: { id, slug } }) {
    const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)
    const rootCommentsPerPage = PostRepo.POST_COMMENTS_PER_PAGE
    const post = await PostRepo.getPost(id, rootCommentsPerPage)

    if (!post) {
      return error({
        statusCode: 404,
        message: 'пост не найден'
      })
    }
    if (post.titleSlug !== slug) {
      redirect(getPostPath(post))
    }

    return {
      post
      // rootCommentsPerPage
    }
  }

  get ratingInfo () {
    return {
      value: this.post.ratingValue,
      positive: this.post.ratingValuePositive,
      negative: this.post.ratingValueNegative
    }
  }

  onUserClick () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'profile-user',
        params: {
          user: this.post.user.id.toString()
        }
      })
    )
  }

  categoryPath (category: CategoryInterface) {
    return this.pathGenerator.generate({
      name: 'category-with-path',
      params: {
        id: category.id.toString(),
        path: category.path.slice(1),
        page: '1'
      }
    })
  }
}

function getPostPath (post: PostInterface) {
  return PathGenerator.generate({
    name: 'post',
    params: {
      slug: post.titleSlug,
      id: post.id.toString()
    }
  })
}
</script>
