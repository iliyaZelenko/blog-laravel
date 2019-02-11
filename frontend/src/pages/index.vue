<template>
  <div class="w-100 h-100">
    <h2>
      Облако тегов
    </h2>

    <no-ssr>
      <tags-cloud />
    </no-ssr>

    <h1 class="mt-5">
      Все посты
    </h1>

    <p>
      <b>Постов на странице: </b> {{ posts.paginatorInfo.count }}.
      <b>Постов всего: </b> {{ posts.paginatorInfo.total }}.
    </p>

    <posts-list
      v-if="posts.paginatorInfo.total"
      :posts="posts.data"
      :loading="loading"
      :page="posts.paginatorInfo.currentPage"
      :pages="posts.paginatorInfo.lastPage"
      @page-change="onPageChange"
    />
    <v-alert
      v-else
      :value="true"
      type="info"
    >
      Категория не содержит постов.
    </v-alert>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Watch } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import PostsList from '~/components/pages/posts/PostsList'
import { serviceContainer } from '~/configs/dependencyInjection/container'
import { PostRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PostsInterface } from '~/apollo/schema/posts'
import TagsCloud from '~/components/tags/TagsCloud.vue'

const PostRepo = serviceContainer.get<PostRepositoryInterface>(TYPES.PostRepositoryInterface)

@Component({
  components: { PostsList, TagsCloud }
})
export default class Posts extends Vue {
  async asyncData () {
    const page = 1
    const posts = await PostRepo.getAll()

    return {
      posts,
      page
    }
  }

  public posts!: PostsInterface
  public loading: boolean = false
  public page: number | null = null

  @Watch('page')
  async onPageChange (page: number) {
    // this.$router.push(
    //   this.localePath({
    //     name: 'posts-page',
    //     params: { page: page.toString() }
    //   })
    // )

    // TODO ActionWithLoading
    this.loading = true
    this.posts = await PostRepo.getAll(page)
    this.loading = false
  }
}

// async function getByPage (page: number = 1, context = this) {
//   /*
//   {
//     data: posts,
//       paginatorInfo: {
//         lastPage: pages
//       }
//   } */
//   const {
//     data: {
//       allPosts: posts
//     }
//   } = await context.$apollo.query({
//     query: GET_ALL_POSTS_QUERY,
//     variables: {
//       page,
//       perPage: 8
//     }
//   })
//
//   return posts
// }
</script>
