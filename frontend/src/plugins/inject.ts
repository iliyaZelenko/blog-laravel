export default ({ app }) => {
  if (process.server) {
    global._$app = app
    // console.log(global._$app)
  } else {
    window._$app = app
    // @ts-ignore
    // window.global = {
    //   _$app: app
    // }
    // console.log(window._$app)
  }
}
