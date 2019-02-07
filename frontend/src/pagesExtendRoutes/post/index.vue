<template>
  <div class="w-100 h-100">
    <h1 class="mt-5 mb-3 display-3 font-weight-light">
      {{ post.title }}
    </h1>

    <p>
      <v-layout align-center>
        <avatar :src="`https://randomuser.me/api/portraits/men/${post.id}.jpg`" />

        <span class="body-2 ml-2">
          {{ post.user.nickname }}
        </span>

        <v-icon class="ml-4">
          category
        </v-icon>

        <span class="body-2 ml-1 mr-2">
          Category:

          <nuxt-link
            :to="categoryPath(post.category)"
          >
            <b>
              {{ post.category.name }}
            </b>
          </nuxt-link>
        </span>

        <v-icon class="ml-4">
          label
        </v-icon>

        <span class="body-2 ml-1 mr-2">
          Tags:
        </span>

        <v-chip
          v-for="tag of post.tags"
          :key="tag.id"
        >
          <v-avatar class="teal white--text">
            {{ tag.name.slice(0, 1).toUpperCase() }}
          </v-avatar>

          <span class="body-1">
            {{ tag.name }}
          </span>
        </v-chip>
      </v-layout>
    </p>

    <p class="body-1">
      {{ post.content }}
    </p>

    <hr>

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
import { serviceContainer } from '~/configs/dependencyInjection/container'
import { PostInterface } from '~/apollo/schema/posts'
import Avatar from '~/components/user/Avatar.vue'
import { CategoryInterface } from '~/apollo/schema/categories'

@Component({
  components: { Avatar }
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

  async asyncData ({ app, redirect, error, params: { id } }) {
    const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

    const post = await PostRepo.getPost(id)

    return { post }
  }
}
</script>
