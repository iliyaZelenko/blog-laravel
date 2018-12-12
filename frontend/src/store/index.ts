import Vuex from 'vuex'

import * as root from './root'
// import * as people from './modules/people'
import * as BackendRoutesModule from './modules/BackendRoutes'
import * as AuthModule from './modules/auth'

// More info about store: https://vuex.vuejs.org/en/core-concepts.html
// See https://nuxtjs.org/guide/vuex-store#classic-mode
// structure of the store:
// types: Types that represent the keys of the mutations to commit
// state: The information of our app, we can get or update it.
// getters: Get complex information from state
// action: Sync or async operations that commit mutations
// mutations: Modify the state

interface ModulesStates {
  // до этого тут было BackendRoutes
  [BackendRoutesModule.NAME]: BackendRoutesModule.State,
  [AuthModule.NAME]: AuthModule.State,
}

export type RootState = root.State & ModulesStates

const createStore = () => {
  return new Vuex.Store({
    state: root.state(),
    // @ts-ignore (это вроде баг типов, его должны пофиксить)
    getters: root.getters,
    mutations: root.mutations,
    // @ts-ignore
    actions: root.actions,
    // @ts-ignore
    modules: {
      [BackendRoutesModule.NAME]: BackendRoutesModule,
      [AuthModule.NAME]: AuthModule
    }
  })
}

export default createStore
