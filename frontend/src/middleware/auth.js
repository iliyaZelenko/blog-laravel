// import { store } from '@/store'
// import { vp } from '@/tools/helpers'
import { showErrorUniversal } from '~/tools/helpers'

export default function (context) {
  const { store, redirect } = context
  const loggedIn = store.getters['auth/loggedIn']

  if (!loggedIn) {
    showErrorUniversal('This page requires authentication!', context)

    redirect({ name: 'auth-signin' })
  }
}
