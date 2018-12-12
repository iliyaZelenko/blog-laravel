<template>
  <div
    v-if="owner"
    style="width: 100%;"
  >
    <h1 class="display-2">{{ owner.name }}</h1>

    <v-layout
      flex
      wrap
    >
      <v-flex
        xs12
        sm5
        md4
        lg3
        xl2
      >
        <!--left sidebar 300px; -->
        <left-sidebar style="max-width: 100%;" />
      </v-flex>
      <!--right sidebar-->
      <v-flex
        xs12
        sm7
        md8
        lg9
        xl10
      >
        <div :class="{ 'pl-4': $breakpoint.is('smAndUp') }">
          <v-toolbar
            class="mb-3"
            color="lime"
            tabs
          >
            <v-tabs
              color="transparent"
              slider-color="green"
              centered
            >
              <v-tab :to="{ name: 'profile-user', params: { user: $auth.user.id } }">
                Main info
              </v-tab>
              <v-tab :to="{ name: 'profile-user-friends', params: { user: $auth.user.id } }">
                Friends
              </v-tab>
            </v-tabs>
          </v-toolbar>

          <!--v-model="model"-->
          <v-tabs-items>
            <v-tab-item class="px-1 py-1">
              <transition
                name="router"
                mode="out-in"
              >
                <nuxt-child :owner="owner" />
                <!--<router-view :owner="owner" />-->
              </transition>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import LeftSidebar from '~/components/pages/profile/LeftSidebar.vue'

export default {
  name: 'Profile',
  middleware: 'auth',
  meta: {
    auth: true
  },
  components: { LeftSidebar },
  // props: {
  //   user: {
  //     type: String | Number,
  //     required: true
  //   }
  // },
  // validate ({ params }) {
  //   return params.user instanceof String || params.user instanceof Number
  // },
  // TODO взять и context error и сделать error({ statusCode: 404, message: 'Пользователь не найден' })
  async asyncData ({ app, route }) {
    let owner

    if (app.$auth.loggedIn && +route.params.user === app.$auth.user.id) {
      owner = app.$auth.user
    } else {
      owner = await app.$get('profile/other/get-user', {
        params: { id: route.params.user }
      })
    }

    return { owner }
  },
  data: () => ({
    owner: null
  })
}
</script>
