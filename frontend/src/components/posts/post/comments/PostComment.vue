<template>
  <v-card
    class="post-comment"
    flat
  >
    <div
      v-if="nestedLvl"
      class="pt-4"
    >
      <!--{{ '->'.repeat(nestedLvl) }}-->
      <v-icon
        v-for="lvl of nestedLvl"
        :key="'nested-level-' + lvl"
        style="display: inline;"
        small
      >
        arrow_forward_ios
      </v-icon>
    </div>
    <div style="width: 100%;">
      <v-card-title>
        <user
          class="mr-3"
          :user="comment.user"
        />

        <rating
          class="mx-3"
          :info="ratingInfo"
          sm-buttons
        />

        <time class="mt-2 grey--text">
          {{ $date(comment.createdAt) }}
        </time>
      </v-card-title>
      <v-card-text style="margin-right: 0; padding-right: 0;">
        <div
          class="mb-4"
          v-html="comment.content"
        />

        <div class="post-comment__buttons-menu">
          <v-btn
            :color="showCommentCreationForm ? 'error' : ''"
            small
            @click="showCommentCreationForm = !showCommentCreationForm"
          >
            <v-icon left>
              {{ showCommentCreationForm ? 'close' : 'add_comment' }}
            </v-icon>

            {{ showCommentCreationForm ? 'Скрыть форму' : 'Комментировать' }}
          </v-btn>

          <template v-if="hasRepliesComments">
            <template v-if="hasRepliesCommentsFullLoaded">
              <v-btn
                color="primary"
                small
                @click="showRepliesComments = !showRepliesComments"
              >
                <v-icon left>
                  {{ showRepliesComments ? 'visibility_off' : 'visibility' }}
                </v-icon>

                {{ showRepliesComments ? 'Скрыть комменты' : `Показать комменты (${comment.repliesCount})` }}
              </v-btn>
            </template>
            <template v-else>
              <!--v-if="comment.repliesCount > 1"-->
              <v-btn
                color="info"
                small
                @click="onClickShowMore"
              >
                <v-icon left>
                  arrow_downward
                </v-icon>

                <template v-if="isBeforeLastNestedLvl">
                  <!-- Для последнего уровня вложенности не показывается 1 коммент -->
                  Показать ответы ({{ comment.repliesCount }})
                </template>
                <template v-else>
                  Показать еще ответы ({{ comment.repliesCount - 1 }})
                </template>
              </v-btn>
            </template>
          </template>
        </div>

        <div>
          <v-expand-transition>
            <post-comment-creation-form
              v-if="showCommentCreationForm"
              v-model="commentCreationFormText"
              :post="post"
              :comment="comment"
              @comment-created="onCommentCreated"
            />
          </v-expand-transition>

          <v-expand-transition>
            <!-- Также работает условие: !isBeforeLastNestedLvl && ... -->
            <post-comments
              v-if="showRepliesComments"
              :comments.sync="repliesComments"
              :post="post"
              :comments-replied-comment="comment"
              :nested-lvl="nestedLvl + 1"
              :observable="observable"
            />
          </v-expand-transition>
        </div>
      </v-card-text>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import { TYPES } from '~/configs/dependencyInjection/types'
import { CommentInterface } from '~/apollo/schema/comments'
import Rating from '~/components/rating/Rating.vue'
import User from '~/components/user/User.vue'
import { PostInterface } from '~/apollo/schema/posts'
import { ObservableInterface, CommentRepositoryInterface } from '~/configs/dependencyInjection/interfaces'
import PostCommentCreationForm from '~/components/posts/post/comments/PostCommentCreationForm.vue'
import { COMMENTS_MAX_NESTED_LVL } from '~/apollo/queries/posts/getPost'

@Component({
  name: 'PostComment',
  components: { PostCommentCreationForm, User, Rating }
})
export default class PostComment extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comment!: CommentInterface
  @Prop(Number) nestedLvl!: number

  @Inject(TYPES.ObservableInterface) private observable!: ObservableInterface
  @Inject(TYPES.CommentRepositoryInterface) private commentRepo!: CommentRepositoryInterface

  public showRepliesComments: boolean = true
  public showCommentCreationForm: boolean = false
  public commentCreationFormText: string = ''
  public readonly COMMENTS_MAX_NESTED_LVL: number = COMMENTS_MAX_NESTED_LVL

  get ratingInfo () {
    return {
      value: this.comment.ratingValue,
      positive: this.comment.ratingValuePositive,
      negative: this.comment.ratingValueNegative
    }
  }

  get repliesComments () {
    const defaultComments = { data: [] }

    return this.comment.repliesComments || defaultComments
  }
  set repliesComments (val) {
    this.$set(this.comment, 'repliesComments', val)
  }

  get isBeforeLastNestedLvl () {
    return this.COMMENTS_MAX_NESTED_LVL - 1 <= this.nestedLvl
  }

  get hasRepliesComments () {
    return this.comment.repliesCount // this.comment.repliesComments // && this.comment.repliesComments.data.length
  }

  get hasRepliesCommentsFullLoaded () {
    // this.comment.repliesComments &&
    return this.repliesComments.paginatorInfo
  }

  onClickShowMore () {
    this.observable.emit('loadComments')
  }

  async onCommentCreated () {
    let comment

    if (this.hasRepliesCommentsFullLoaded) {
      comment = await this.commentRepo.getComment(
        this.comment.id,
        this.repliesComments.paginatorInfo!.currentPage,
        this.repliesComments.paginatorInfo!.perPage
      )
    } else {
      comment = await this.commentRepo.getComment(this.comment.id, undefined, undefined)
    }

    this.$emit('update:comment', comment)

    // this.comment.repliesCount++
    this.showCommentCreationForm = false
  }
}
</script>

<style lang="stylus">
  .post-comment
    display: flex !important
</style>
