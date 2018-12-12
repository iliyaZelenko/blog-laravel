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
          <div>
            {{ post.text }}
          </div>
        </div>
      </v-card-title>

      <v-card-actions>
        <v-spacer />

        <v-btn
          flat
          color="orange"
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
