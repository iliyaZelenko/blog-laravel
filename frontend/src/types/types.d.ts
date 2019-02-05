// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'
import { NuxtCookies } from 'cookie-universal-nuxt'
import VueRouter, { RawLocation } from 'vue-router'
// import 'vue-i18n'
// import VueI18n, { IVueI18n } from 'vue-i18n'
// import 'vue-router'
// import 'nuxt-i18n'

// import { ApolloProperty } from 'vue-apollo/types/vue-apollo'
// import { VuetifyObject } 'vuetify'

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean
      server: boolean
    }
    interface Global {
      appEnv: any
      // spotConfig: any
    }
  }

  interface Window {
    onNuxtReady: any
    $nuxt: any
  }

  // interface IVueI18n {
  //   locales: any
  // }
}

// пример как можно расширять типы пакетов
declare module 'vue-i18n' {
  interface IVueI18n {
    locales: any
  }
}

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    // locale
    // readonly $i18n: VueI18n & IVueI18n
    switchLocalePath: any
    $apollo: any // ApolloProperty<any>
    // $vuetify: VuetifyObject,
    // $router: VueRouter,
    $cookies: NuxtCookies
    $auth: any
    $formValidator: any
    localePath (route: RawLocation, locale?: string): string
    $actionWithLoading (action: string, loadingVariable: string, ...arg: any)
  }
}
