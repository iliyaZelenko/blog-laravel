<template>
  <v-card
    style="display: flex;"
    flat
  >
    <div
      v-if="innerLvl > 1"
      class="pt-4"
    >
      <!--{{ '->'.repeat(innerLvl) }}-->
      <v-icon
        v-for="lvl of innerLvl - 1"
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
      <v-card-text>
        <div v-html="comment.content" />

        <div v-if="hasRepliesComments">
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
            <v-btn
              v-if="comment.repliesCount > 1"
              color="primary"
              small
              @click="onClickShowMore"
            >
              <v-icon left>
                arrow_downward
              </v-icon>

              Показать еще {{ comment.repliesCount - 1 }}
            </v-btn>
          </template>

          <v-expand-transition>
            <post-comments
              v-if="showRepliesComments"
              :comments.sync="comment.repliesComments"
              :post="post"
              :comments-replied-comment="comment"
              :inner-lvl="innerLvl + 1"
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
import { ObservableInterface } from '~/configs/dependencyInjection/interfaces'

@Component({
  name: 'PostComment',
  components: { User, Rating }
})
export default class PostComment extends Vue {
  @Prop(Object) post!: PostInterface
  @Prop(Object) comment!: CommentInterface
  @Prop(Number) innerLvl!: number

  @Inject(TYPES.ObservableInterface) private observable!: ObservableInterface

  public showRepliesComments: boolean = true

  get ratingInfo () {
    return {
      value: this.comment.ratingValue,
      positive: this.comment.ratingValuePositive,
      negative: this.comment.ratingValueNegative
    }
  }

  get hasRepliesComments () {
    return this.comment.repliesComments && this.comment.repliesComments.data.length
  }

  get hasRepliesCommentsFullLoaded () {
    return this.comment.repliesComments.paginatorInfo
  }

  onClickShowMore () {
    this.observable.emit('clickShowMore')
  }
}
</script>
