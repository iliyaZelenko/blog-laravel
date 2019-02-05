import { join } from 'path'
const { LOCALES, DEFAULT_LOCALE, BASE_URL, FALLBACK_LOCALE, I18N_DIR } = global.appEnv
const i18nMessages = require(join(I18N_DIR, 'messages')).default

export default [
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
]
