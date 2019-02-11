<template>
  <div
    class="post"
  >
    <v-card>
      <v-img
        :src="'https://picsum.photos/200/300?image=' + post.id"
        aspect-ratio="2.75"
      />

      <v-card-title primary-title>
        <h3 class="headline mb-0">
          {{ post.title }}
        </h3>

        <time class="mt-2 grey--text">
          {{ $date(post.createdAt) }}
        </time>
      </v-card-title>

      <v-card-text class="pt-0">
        {{ post.contentShort }}
      </v-card-text>

      <v-card-actions>
        <div class="pl-3">
          <!--Автор: <b>{{ post.user.nickname }}</b> {{ post.user.fullName ? `(${post.user.fullName})` : '' }}-->

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
        </div>

        <v-spacer />

        <v-btn
          color="orange"
          text
          @click="goToPost"
        >
          {{ $t('posts_page_read_more_btn') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'
import { Prop } from 'vue-property-decorator'
import { Inject } from 'vue-inversify-decorator'
import { TYPES } from '~/configs/dependencyInjection/types'
import { PathGeneratorInterface } from '~/configs/dependencyInjection/interfaces'
import { PostInterface } from '~/apollo/schema/posts'
import UserAvatar from '~/components/user/avatar/UserAvatar.vue'
import ProfileMenu from '~/components/user/ProfileMenu.vue'

@Component({
  components: { UserAvatar, ProfileMenu }
})
export default class Post extends Vue {
  @Prop() post!: PostInterface

  @Inject(TYPES.PathGeneratorInterface) private pathGenerator!: PathGeneratorInterface

  goToPost () {
    this.$router.push(
      this.pathGenerator.generate({
        name: 'post',
        params: {
          id: this.post.id.toString(),
          slug: this.post.titleSlug
        }
      })
    )
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
}
</script>
