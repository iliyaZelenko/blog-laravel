<template>
  <v-avatar
    :size="size"
    color="grey lighten-4"
  >
    <v-img
      :src="imgSrc"
      aspect-ratio="1"
      lazy-src="https://practice.privatbank.ua/Content/images/no-avatar.png"
    >
      <v-layout
        slot="placeholder"
        fill-height
        align-center
        justify-center
        ma-0
      >
        <v-progress-circular
          color="grey lighten-5"
          indeterminate
        />
      </v-layout>
    </v-img>
  </v-avatar>
</template>

<script>
export default {
  name: 'UserAvatar',
  props: {
    size: {
      type: String,
      default: '38px'
    },
    src: {
      type: String,
      default: null
    }
  },
  computed: {
    imgSrc () {
      return this.src || this.$auth.user.avatar
    }
  }
}
</script>
