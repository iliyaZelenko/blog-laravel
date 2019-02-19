import Vue from 'vue'
import Vuetify from 'vuetify'
// import colors from 'vuetify/es5/util/colors'
import 'vuetify/dist/vuetify.min.css'
// IE 11 + Safari 9
import 'babel-polyfill'

Vue.use(Vuetify, {
  lang: {
    locales: { zhHans, pl, sv },
    current: 'zhHans'
  }
})

// Vue.use(Vuetify, {
//   theme: {
//     primary: '#121212' // a color that is not in the material colors palette
//     //   accent: colors.grey.darken3,
//     //   secondary: colors.amber.darken3,
//     //   info: colors.teal.lighten1,
//     //   warning: colors.amber.base,
//     //   error: colors.deepOrange.accent4,
//     //   success: colors.green.accent3
//     // }
//   }
// })

// https://github.com/vuetifyjs/vuetify/issues/3436
Vue.prototype.$breakpoint = new Vue({
  data () {
    return {
      isMounted: false,
      default: {
        xs: true,
        xsOnly: true,
        xsAndUp: false,
        sm: true,
        smOnly: true,
        smAndDown: true,
        smAndUp: false,
        md: false,
        mdOnly: false,
        mdAndDown: false,
        mdAndUp: false,
        lg: false,
        lgOnly: false,
        lgAndDown: false,
        lgAndUp: false,
        xl: false,
        xlOnly: false,
        xlAndDown: false
      }
    }
  },
  methods: {
    is (breakpoint) {
      return this.isMounted ? this.$vuetify.breakpoint[breakpoint] : this.$data.default[breakpoint]
    }
  }
})

// async
export default function ({ app }) {
  if (!app.mixins) {
    app.mixins = []
  }
  app.mixins.push({
    mounted () {
      this.$breakpoint.$data.isMounted = true
    }
  })
}
