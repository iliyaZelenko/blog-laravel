module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'standard',
    // TODO возможно не нужен
    'plugin:promise/recommended',
    // TODO вызывает ошибку в root элемента templete (конфликтует с vue)
    // 'typescript'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // TODO не уверен что хоть что-то делает
    'typescript'
  ],
  rules: {
    // 'space-infix-ops': 'off', // WORKAROUND
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
    // parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeature: {
      jsx: false
    },
    // 9 это 2018
    ecmaVersion: 9
  }
}
