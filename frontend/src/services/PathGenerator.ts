// import VueRouter from 'vue-router'
import { vp } from '~/tools/helpers'

export default class PathGenerator {
  public generate (name, params = {}) {
    const info = vp.$nuxt.$router.resolve({ name, params })

    return info.href
  }
}
