<template>
  <div class="w-100 h-100">
    <h1 class="mt-5">
      {{ id }} | {{ slug }}
    </h1>

    {{ $route.params }}

    Post page
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Component from '~/plugins/nuxt-class-component'
import PathGenerator from '~/services/PathGenerator'

@Component({
})
export default class Post extends Vue {
  @Prop(String) id!: string
  @Prop(String) slug!: string

  mounted () {
    // if (process.browser) {
    console.log(
      new PathGenerator().generate('post', {
        slug: 'programmirovanie/php/oop',
        id: '23'
      })
    )
    // }
  }
}
</script>
