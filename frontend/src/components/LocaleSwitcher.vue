<template>
  <div>
    <v-btn
      v-for="locale in $i18n.locales"
      v-if="locale.code !== $i18n.locale"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      color="primary lighten-1"
      size="mini"
      nuxt
    >
      <span class="mr-2">
        {{ locale.name }}
      </span>

      <img
        :src="`https://www.countryflags.io/${locale.flag}/shiny/24.png`"
        alt="flag"
      >
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'nuxt-class-component'

@Component
class LocaleSwitcher extends Vue {
}

export default LocaleSwitcher
</script>
