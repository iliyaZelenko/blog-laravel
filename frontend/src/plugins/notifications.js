// import Vue from 'vue'
// import VueNotifications from 'vue-notifications'
// import iziToast from 'izitoast' // https://github.com/dolce/iziToast
// import 'izitoast/dist/css/iziToast.min.css'

// on browser
function showBrowserMsg ({ title, message, type, timeout, cb }) {
  const iziToast = require('izitoast')
  require('izitoast/dist/css/iziToast.min.css')

  // if (type === VueNotifications.types.warn) type = 'warning'
  if (type === 'warn') type = 'warning'

  return iziToast[type]({ title, message, timeout })
}

const options = ['success', 'error', 'info', 'warn']
const $notify = {}

for (let type of options) {
  $notify[type] = (title, message = '', { timeout = 3000 } = {} /* <-- this arg is like options */) => {
    if (process.browser) {
      showBrowserMsg({ title, message, type, timeout })
    } else {
      // TODO Not only error
      global._$app.$cookies.set('showErrorInBrowser', title + '. ' + message)
    }
  }
}

// Vue.use(VueNotifications, options)
// Vue.prototype.$notify = $notify

export default ({ store, app }, inject) => {
  inject('notify', $notify)
}
