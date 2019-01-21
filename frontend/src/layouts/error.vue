<template>
  <div>
    <v-img
      :src="require('~/assets/backgrounds/illustrations/md_oops.png')"
      :lazy-src="require('~/assets/backgrounds/illustrations/md_oops.png')"
      height="500"
      aspect-ratio="1"
      class="grey lighten-2"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        />
      </v-layout>
    </v-img>

    <v-alert
      :value="true"
      type="error"
      class="display-1 text-xs-center"
    >
      {{ text }}

      <v-btn
        :to="localePath({ name: 'index' })"
        class="ml-3"
        color="primary"
      >
        На главную
      </v-btn>
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    return {
      title: `Ошибка ${this.error.statusCode}`
    }
  },
  computed: {
    text () {
      // Ниже не подъодит из-за того что message есть всегда, если его не указать, то message: "{↵  "statusCode": 404↵}"
      // `Произошла ошибка ${this.error.statusCode}${this.error.message ? ': ' + this.error.message : ''}.`
      return `Произошла ошибка ${this.error.statusCode}: ${this.error.message}.`
    }
  }
}
</script>
