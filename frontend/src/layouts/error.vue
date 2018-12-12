<template>
  <v-app>
    <v-content>
      <v-layout
        style="height: 100vh;"
        align-center
        justify-center
      >
        <v-alert
          :value="true"
          type="error"
          class="display-1 text-xs-center red"
        >
          {{ text }}
          <br>

          <nuxt-link :to="localePath({ name: 'index' })">
            На главную
          </nuxt-link>
        </v-alert>
      </v-layout>
    </v-content>
  </v-app>
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
      return this.error.statusCode === 404 ? 'Страница не найдена.' : `Произошла ошибка ${this.error.statusCode}.`
    }
  }
}
</script>
