import i18nMessages from './src/i18n/messages'
import * as env from './env'

const {
  /* Paths */
  SRC_DIR,
  // STYLES_DIR,
  /* URL */
  BASE_URL,
  // BASE_API_URL,
  // FULL_API_URL,
  FULL_API_GRAPHQL_URL,
  /* Locales */
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  LOCALES,
  /* Server */
  NUXT_HOST,
  NUXT_PORT,
  /* Other */
  BROWSERS_SUPPORT,
  NODE_SUPPORT
} = env

module.exports = {
  mode: 'universal',

  /**
   * Current environment
   */
  env,

  /**
   * Server settings
   */
  server: {
    host: NUXT_HOST, // default: localhost
    port: NUXT_PORT // default: 3000
  },

  /**
   * Set source directory
   */
  srcDir: SRC_DIR,

  /**
   * Какой CSS подключить
   */
  css: [
    { src: '~styles/main.styl', lang: 'stylus' }
    // '~assets/css/main.css'
  ],

  /**
   * Плагины (интеграция библиотек в Nuxt.js)
   */
  plugins: [
    { src: '~/plugins/notifications', ssr: false },
    '~/plugins/nuxt-class-component',
    '~/plugins/vuetify.js',
    '~/plugins/vue-plugin-axios/vue-plugin-axios.js',
    // '~/plugins/vuex-persistedstate.js',
    '~/plugins/auth.js',
    '~/plugins/actionWithLoading',
    '~/plugins/validator',
    '~/plugins/vue-apollo'
  ],

  /**
   * Модули (типо плагинов, но обычно других разработчиков)
   */
  modules: [
    '~/modules/typescript.js',
    '@nuxtjs/apollo',
    '@nuxtjs/style-resources',
    'cookie-universal-nuxt',
    ['nuxt-i18n', {
      seo: false,
      parsePages: false, // отключает acorn
      locales: LOCALES,
      defaultLocale: DEFAULT_LOCALE,
      baseUrl: BASE_URL,
      strategy: 'prefix_except_default',
      vueI18n: {
        fallbackLocale: FALLBACK_LOCALE,
        messages: i18nMessages
      }
    }]
  ],

  // Give apollo module options
  apollo: {
    // optional
    errorHandler (error) {
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
    // required
    clientConfigs: {
      default: {
        // required
        httpEndpoint: FULL_API_GRAPHQL_URL,
        // You can use `wss` for secure connection (recommended in production)
        // Use `null` to disable subscriptions
        wsEndpoint: null // 'ws://localhost:4000', // optional
      }
    }
  },

  /**
   * Глобальный доступ к стилям из других файлов
   */
  styleResources: {
    stylus: '~/styles/global/*.styl'
  },

  /**
   *  Headers of the page
   */
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons'
      }
    ]
  },

  /**
   * Customize the progress bar color
   */
  loading: { color: '#3B8070' },

  /**
   * Build configuration
   * https://nuxtjs.org/api/configuration-build
   */
  build: {
    extractCSS: true,

    // настройки postcss (игнорируются если есть postcss.config.js)
    // postcss: {},

    babel: {
      plugins: [
        // в babel 7 используется этот пакет, a не "transform-runtime"
        // '@babel/plugin-transform-runtime'
      ],
      presets ({ isServer }) {
        return [
          ['@nuxtjs/babel-preset-app', {
            useBuiltIns: 'usage', //  | 'entry' | false
            modules: false,
            targets:
              isServer
                // таким образом можно использовать современные возможности node, а серверная сборка будет в указанйо версии
                ? { node: NODE_SUPPORT }
                // https://github.com/browserslist/browserslist#best-practices
                // https://github.com/babel/babel/issues/7789
                // { browsers: ['defaults'] }
                : { browsers: BROWSERS_SUPPORT }
          }],
          ['@babel/preset-typescript']
        ]
      }
    },

    // extend webpack
    extend (config, { isDev, isClient }) {
      // config.resolve.alias['@'] = join(__dirname, SRC_DIR)
      // config.resolve.extensions.push('.ts')

      if (isDev && isClient) {
        // Run ESLint on save
        config.module.rules.push({
          enforce: 'pre', // before save
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
        // stylint (linter for stylus)
        // {
        //   enforce: 'pre',
        //   test: /\.styl(us)?$/,
        //   loader: 'stylint',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
