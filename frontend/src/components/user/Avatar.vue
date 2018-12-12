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
  name: 'UserAvatr',
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
      // TODO edit
      return this.src || 'http://sharethingz.com/wp-content/uploads/2014/08/avatar-512x350.png?x96597' // this.$auth.user.avatar
    }
  }
}
</script>
