<template>
  <v-layout
    column
  >
    <div
      style="display: flex;"
      class="mb-3"
    >
      <template v-if="comments.paginatorInfo">
        <div
          v-if="isRoot"
          style="position: absolute; left: 50px;"
        >
          <!--TODO with nested comments-->
          <b>На странице: </b> {{ comments.paginatorInfo.count }}.
          <b>Всего: </b> {{ comments.paginatorInfo.total }}.
        </div>

        <v-card
          v-if="comments.paginatorInfo.lastPage > 1"
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
      </template>

      <div
        v-if="comments.paginatorInfo"
        style="position: absolute; right: 45px; margin-top: 15px;"
      >
        <!--v-if="isRoot"-->
        <v-autocomplete
          v-model="perPage"
          :items="perPageItems"
          :search-input.sync="perPageItemsSearch"
          item-text="text"
          item-value="value"
          label="Комментов за страницу"
          required
          @input="loadComments(comments.paginatorInfo.currentPage, perPage)"
          @keyup.enter="perPageItemAddNew"
        >
          <template slot="no-data">
            <v-list-tile>
              <template v-if="perPageItemsNoDataCanCreate">
                <span class="subheading">
                  Создать выбор для
                </span>
                <v-chip
                  color="lighten-3"
                  label
                  small
                >
                  {{ perPageItemsSearch }}
                </v-chip>
              </template>
              <template v-else>
                Введите число и нажмите Enter чтобы создать
              </template>
            </v-list-tile>
          </template>
        </v-autocomplete>
      </div>
    </div>

    <v-expand-transition>
      <div
        v-if="!loading || !comments.paginatorInfo"
        style="width: 100%;"
      >
        <!--<transition-group name="v-expand-transition">-->
        <post-comment
          v-for="(comment, i) of comments.data"
          :key="'comment-' + i + comment.id"
          :comment="comment"
          :post="post"
          :inner-lvl="innerLvl"
        />
        <!--</transition-group>-->
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
      v-if="!loading && comments.paginatorInfo && comments.paginatorInfo.lastPage > 1"
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

@Component({
  name: 'PostComments',
  components: { PostComment }
})
export default class PostComments extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comments!: CommentsInterface
  @Prop(Object) commentsRepliedComment!: CommentInterface | null
  @Prop(Object) observable!: ObservableInterface | null
  @Prop(Number) innerLvl!: number
  @Prop(Boolean) isRoot!: boolean
  // @Prop(Number) rootCommentsPerPage!: number

  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface
  @Inject(TYPES.PostRepositoryInterface) private postRepo!: PostRepositoryInterface

  public loading: boolean = false
  public perPageItems = [
    // первым элементом поставится то что указанно в репозитории (created hook)
    {
      text: 'По 2',
      value: 2
    },
    {
      text: 'По 5',
      value: 5
    },
    {
      text: 'По 10',
      value: 10
    },
    {
      text: 'По 20',
      value: 20
    },
    {
      text: 'По 50',
      value: 50
    }
  ]
  public perPage!: number
  public perPageItemsSearch: string = ''

  get perPageItemsNoDataCanCreate () {
    return !isNaN(+this.perPageItemsSearch)
  }

  created () {
    const value = this.isRoot ? this.postRepo.POST_COMMENTS_PER_PAGE : this.commentRepo.COMMENTS_PER_PAGE

    this.perPage = value
    this.perPageItemsAddItem({
      text: 'По ' + value,
      value
    })

    if (!this.observable) return

    this.observable.on('clickShowMore', async () => {
      await this.loadComments(1, this.perPage)
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
      console.log(this.commentsRepliedComment.id, repliesComments)
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

  perPageItemsAddItem (item) {
    this.perPageItems.unshift(item)
    this.perPage = this.perPageItems[0].value
    this.perPageItems.sort((a, b) => a.value - b.value)
  }

  async perPageItemAddNew () {
    if (!this.perPageItemsNoDataCanCreate) return

    this.perPageItemsAddItem({
      text: 'По ' + +this.perPageItemsSearch,
      value: +this.perPageItemsSearch
    })

    await this.loadComments(this.comments.paginatorInfo.currentPage, this.perPage)
  }
}
</script>

<style lang="stylus">
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
