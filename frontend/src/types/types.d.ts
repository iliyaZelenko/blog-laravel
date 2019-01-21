// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
import { NuxtCookies } from 'cookie-universal-nuxt'
import VueRouter, { RawLocation } from 'vue-router'
// import { ApolloProperty } from 'vue-apollo/types/vue-apollo'
// import { VuetifyObject } 'vuetify'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
// это как расширить типы vue
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $apollo: any // ApolloProperty<any>
    // $vuetify: VuetifyObject,
    $router: VueRouter,
    $cookies: NuxtCookies
    $auth: any
    $formValidator: any
    localePath (route: RawLocation, locale?: string): string
    $actionWithLoading (action: string, loadingVariable: string, ...arg: any)
  }
}

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean
      server: boolean
    }
    // interface Global {
    //   spotConfig: any
    // }
  }

  interface Window {
    onNuxtReady: any
    $nuxt: any
  }
}

// custom Process node variable
// interface AppProcessInterface extends NodeJS.Process {
//   browser: boolean
// }
// declare const AppProcess: AppProcessInterface
// export { AppProcess as process }

// interface window extends Window {
//   onNuxtReady: any
// }
// interface AppWindowInterface extends Window {
//   onNuxtReady: any
// }
// declare const AppWindow: AppWindowInterface
// export { AppWindow as window }
