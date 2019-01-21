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
        <div>
          <h3 class="headline mb-0">
            {{ post.title }}
          </h3>
        </div>
      </v-card-title>

      <v-card-text>
        {{ post.contentShort }}
      </v-card-text>

      <v-card-actions>
        <div>
          Автор: <b>{{ post.user.nickname }}</b> {{ post.user.fullName ? `(${post.user.fullName})` : '' }}
        </div>

        <v-spacer />

        <v-btn
          color="orange"
          text
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

@Component
export default class Post extends Vue {
  @Prop() post!: {}
  // @Prop({}) post!: {}
}
</script>
