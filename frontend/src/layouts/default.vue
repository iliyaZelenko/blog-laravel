<template>
  <v-app>
    <the-toolbar @navigation-drawer="onNavigationDrawerChange" />
    <the-navigation-drawer v-model="navigationDrawer" />
    <v-content>
      <!-- fluid -->
      <v-container style="height: 100%; width: 100%;">
        <v-layout
          class="pt-3"
          column
          justify-start
          fill-height
          wrap
          align-start
        >
          <transition
            name="router"
            mode="out-in"
            tag="div"
          >
            <nuxt style="width: 100%;" />
          </transition>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { Provide as ProvideServiceContainerForInversify } from 'vue-inversify-decorator'
import Component from '~/plugins/nuxt-class-component'
import TheToolbar from '~/components/layouts/main/TheToolbar.vue'
import TheNavigationDrawer from '~/components/layouts/main/TheNavigationDrawer.vue'
import { serviceContainer } from '~/configs/dependencyInjection/container'

@Component({
  name: 'MainLayout',
  components: {
    TheToolbar, TheNavigationDrawer
  }
})
@ProvideServiceContainerForInversify(serviceContainer)
export default class MainLayout extends Vue {
  navigationDrawer = false

  mounted () {
    this.showErrorFromServer()
  }

  onNavigationDrawerChange () {
    this.navigationDrawer = !this.navigationDrawer
  }

  showErrorFromServer () {
    const errorMsg = this.$cookies.get('showErrorInBrowser')

    if (errorMsg) {
      this.$cookies.set('showErrorInBrowser', null)
      // this.$notify.error(errorMsg)
    }
  }
}
</script>
