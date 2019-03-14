const { SRC_DIR, PAGES_EXTENDED_DIR } = global.appEnv

export default (routes, resolve) => {
  routes.push(...[
    {
      name: 'categories',
      path: '/categories',
      component: resolve(PAGES_EXTENDED_DIR, 'categories/index.vue'),
      props: true,
      // так должно сработать ))
      children: [
        {
          path: 'id-:id(\\d+)/:path*/page-:page',
          component: resolve(PAGES_EXTENDED_DIR, 'categories/index.vue')
        }
      ]
    },
    {
      name: 'post',
      path: '/post/id-:id(\\d+)/:slug*',
      component: resolve(PAGES_EXTENDED_DIR, 'post/index.vue'),
      props: true
    },
    {
      name: 'custom',
      path: '*',
      component: resolve(SRC_DIR, 'pages/404.vue')
    }
  ])
}
