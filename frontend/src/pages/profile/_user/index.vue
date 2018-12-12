<template>
  <div style="width: 100%;">
    <posts :owner="owner" />
  </div>
</template>

<script>
import Posts from '~/components/pages/profile/ActivityPosts.vue'

export default {
  name: 'ProfileActivity',
  components: { Posts },
  props: {
    owner: {
      type: Object,
      required: true
    }
  }
}
</script>
