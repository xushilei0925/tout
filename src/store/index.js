import Vue from 'vue'
import Vuex from 'vuex'

import { setToken, getToken } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN = '118944'

export default new Vuex.Store({
  state: {
    token: getToken(TOKEN),
    // 用户信息
    userInfo: {}
  },
  mutations: {
    setToken(state, data) {
      state.token = data
      setToken(TOKEN, state.token)
    }
  },
  actions: {},
  modules: {}
})
