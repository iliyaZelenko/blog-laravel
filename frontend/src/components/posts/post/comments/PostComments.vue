<template>
  <v-layout
    class="post-comments"
    column
  >
    <v-expand-transition>
      <div
        v-if="comments.paginatorInfo"
        :class="{
          'post-comments__top-panel': true,
          'post-comments__top-panel--root': isRoot
        }"
      >
        <div
          v-if="isRoot"
          style="position: absolute; left: 50px;"
        >
          <!--TODO with nested comments-->
          <b>На странице: </b> {{ comments.paginatorInfo.count }}.
          <b>Всего: </b> {{ comments.paginatorInfo.total }}.
        </div>

        <v-card
          v-if="showPagination"
          :class="{
            'pt-2 mt-2': true,
            'root-comments-pagination-card': isRoot,
            'replies-comments-pagination-card replies-comments-pagination-card--top': !isRoot
          }"
          :flat="isRoot"
        >
          <v-layout
            justify-center
          >
            <v-pagination
              :value="comments.paginatorInfo.currentPage"
              :length="comments.paginatorInfo.lastPage"
              :circle="!isRoot"
              @input="onPageChange(arguments[0], perPage)"
            />
          </v-layout>
        </v-card>

        <post-comments-per-page
          v-model="perPage"
          :style="'position: absolute; margin-top: 15px;' + (isRoot ? 'right: 45px;' : 'right: 0;')"
          @input="loadComments(comments.paginatorInfo.currentPage, arguments[0])"
        />
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <div
        v-if="!loading || !comments.paginatorInfo"
        style="width: 100%;"
      >
        <transition-group
          name="v-expand-transition"
          tag="div"
        >
          <post-comment
            v-for="(comment, i) of comments.data"
            :key="'comment-' + i + comment.id"
            :comment.sync="comments.data[i]"
            :post="post"
            :nested-lvl="nestedLvl"
          />
        </transition-group>
      </div>
    </v-expand-transition>

    <v-layout
      justify-center
    >
      <v-progress-circular
        v-if="loading"
        :size="50"
        class="ma-5"
        color="blue"
        indeterminate
      />
    </v-layout>

    <v-card
      v-if="!loading && showPagination"
      :class="{
        'pb-2 mb-2': true,
        'root-comments-pagination-card': isRoot,
        'replies-comments-pagination-card replies-comments-pagination-card--bottom': !isRoot
      }"
      :flat="isRoot"
    >
      <v-layout
        justify-center
      >
        <v-pagination
          :value="comments.paginatorInfo.currentPage"
          :length="comments.paginatorInfo.lastPage"
          :circle="!isRoot"
          @input="onPageChange(arguments[0], perPage)"
        />
      </v-layout>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import {
  CommentRepositoryInterface,
  ObservableInterface,
  PostRepositoryInterface
} from '~/configs/dependencyInjection/interfaces'
import { CommentInterface, CommentsInterface } from '~/apollo/schema/comments'
import PostComment from '~/components/posts/post/comments/PostComment.vue'
import { PostInterface } from '~/apollo/schema/posts'
import PostCommentsPerPage from '~/components/posts/post/comments/PostCommentsPerPage.vue'

@Component({
  name: 'PostComments',
  components: { PostComment, PostCommentsPerPage }
})
export default class PostComments extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comments!: CommentsInterface
  @Prop(Object) commentsRepliedComment!: CommentInterface | null
  @Prop(Object) observable!: ObservableInterface | null
  @Prop(Number) nestedLvl!: number
  @Prop(Boolean) isRoot!: boolean

  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface
  @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public loading: boolean = false
  public perPage: number | null = null

  get showPagination () {
    return this.comments.paginatorInfo && this.comments.paginatorInfo.lastPage > 1
  }

  // @Watch('perPage')
  // onPerPageChange (newValue) {
  //   this.$emit('update:per-page', newValue)
  // }
  //
  // @Watch('comments.paginatorInfo.currentPage')
  // onCurrentPageChange (newValue) {
  //   this.$emit('update:current-page', newValue)
  // }

  created () {
    this.perPage = this.isRoot ? this.postRepo.POST_COMMENTS_PER_PAGE : this.commentRepo.COMMENTS_PER_PAGE

    if (!this.observable) return

    const defaultPage = 9999 // (this.comments.paginatorInfo && this.comments.paginatorInfo.currentPage) || 1

    this.observable.on('loadComments', async ({ page, perPage } = {
      page: defaultPage,
      perPage: this.perPage
    }) => {
      await this.loadComments(page, perPage)
    })
  }

  async onPageChange (page: number, perPage?) {
    await this.loadComments(page, perPage)
  }

  async loadComments (page: number, perPage?) {
    if (this.commentsRepliedComment) { // получает комменты-ответы коммента
      this.loading = true
      const repliesComments: CommentsInterface = await this.commentRepo.getCommentRepliesPaginated(
        this.commentsRepliedComment.id,
        page,
        perPage
      )
      this.$emit('update:comments', repliesComments)
      this.loading = false
    } else if (this.isRoot) { // получает комменты поста
      this.loading = true
      const comments = await this.commentRepo.getCommentsPaginatedByPost(
        this.post.id,
        page,
        perPage
      )
      this.$emit('update:comments', comments)
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
  .post-comments__top-panel
    display: flex
    z-index: 1

    &.post-comments__top-panel--root
      height: 50px
      /*margin-bottom: 16px*/

  .root-comments-pagination-card
    width: 100%
    background: none !important
    background-color: none !important

  .replies-comments-pagination-card
    width: 100%

    &.replies-comments-pagination-card--top
      box-shadow: 0 -5px 1px -2px rgba(0,0,0,0.2), 0 -2px 1px -2px rgba(0,0,0,0.2);
      border-top-left-radius: 25px
      border-top-right-radius: 25px
      border-bottom: 0

    &.replies-comments-pagination-card--bottom
      box-shadow: 0 3px 1px -3px rgba(0,0,0,0.2), 0px 3px 0px 0 rgba(0,0,0,0.14), 0px 6px 1px -1px rgba(0,0,0,0.12);
      border-bottom-left-radius: 25px
      border-bottom-right-radius: 25px
      border-top: 0
</style>
