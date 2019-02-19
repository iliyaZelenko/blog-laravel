import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { rules, validator } from '~/tools/validator'
import dictionary from '~/i18n/validator'

// vee-validate already have $validator
const $formValidator = {
  rules: rules,
  async validate (data) {
    return this.validator.validateAll(data)
  },
  validator
}

export default ({ app }, inject) => {
  const currentLocale = app.i18n.locale
  const veeValidateLocale = require('vee-validate/dist/locale/' + currentLocale)

  validator.localize(currentLocale, veeValidateLocale)
  Vue.use(VeeValidate, {
    locale: currentLocale,
    dictionary
  })

  inject('formValidator', $formValidator)
}
