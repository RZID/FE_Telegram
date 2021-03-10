import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import Socket from './modules/socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: Auth,
    socket: Socket
  }
})
