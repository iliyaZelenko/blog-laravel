import { join } from 'path'
const { PLUGINS_DIR } = global.appEnv

export default processPlugins([
  // {
  //   src: 'notifications',
  //   ssr: false
  // },
  'notifications',
  'date',
  'serviceContainer',
  'inject',
  'nuxt-class-component',
  'vuetify.js',
  'vue-plugin-axios/vue-plugin-axios.js',
  // 'vuex-persistedstate.js',
  'auth.js',
  'actionWithLoading',
  'validator',
  'vue-apollo'
])

function processPlugins (plugins) {
  return plugins.map((i) => {
    if (i.src) {
      i.src = join(PLUGINS_DIR, i.src)

      return i
    }

    return join(PLUGINS_DIR, i)
  })
}
