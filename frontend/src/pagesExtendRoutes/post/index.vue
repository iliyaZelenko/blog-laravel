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
      <profile-menu :user="post.user">
        <v-layout
          slot="activator"
          align-center
        >
          <!--`https://randomuser.me/api/portraits/men/${post.id}.jpg`-->
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

      <v-icon class="ml-4">
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

    <pre>
      {{ post }}
    </pre>
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
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'
import Tags from '~/components/pages/posts/post/tags/Tags.vue'
import ProfileMenu from '~/components/user/ProfileMenu.vue'

const PathGenerator = serviceContainer.get<PathGeneratorInterface>(TYPES.PathGeneratorInterface)

@Component({
  components: { UserAvatar, ProfileMenu, Tags }
})
export default class Post extends Vue {
  @Prop(String) id!: string
  @Prop(String) slug!: string

  // @ts-ignore
  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface
  // @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public post!: PostInterface

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

  async asyncData ({ app, redirect, error, params: { id, slug } }) {
    const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

    const post = await PostRepo.getPost(id)

    if (!post) {
      return error({
        statusCode: 404,
        message: 'пост не найден'
      })
    }
    if (post.titleSlug !== slug) {
      redirect(getPostPath(post))
    }

    return { post }
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