import { join } from 'path'

/* Paths */
export const ROOT_DIR = __dirname
// TODO возможно это как-то убрать чтобы не усложнять конфиг
export const SRC_DIR = join(ROOT_DIR, 'src')
export const STYLES_DIR = join(SRC_DIR, 'styles')

/* URL */
export const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
export const BASE_API_URL = 'http://localhost:8000' // 'http://blog-symfony.test' // 'http://localhost:8000'
export const FULL_API_URL = BASE_API_URL + '/api/' // + '/api/'
export const FULL_API_GRAPHQL_URL = BASE_API_URL + '/graphql/' // + '/api/'

/* Locales */
export const DEFAULT_LOCALE = 'ru'
export const FALLBACK_LOCALE = 'en'
export const LOCALES = [
  {
    code: 'en',
    iso: 'en-US',
    name: 'English',
    flag: 'us'
  },
  {
    code: 'ru',
    iso: 'ru-RU',
    name: 'Русский',
    flag: 'ru'
  }
]

/* Server */
export const NUXT_HOST = 'localhost'
export const NUXT_PORT = '1337'

/* Other */
export const BROWSERS_SUPPORT = ['last 1 version', 'not dead', '> 0.2%']
export const NODE_SUPPORT = '9.0.0'
