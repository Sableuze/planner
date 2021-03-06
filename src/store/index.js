import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import taskList from '@/store/modules/taskList'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    taskList,
  },
})
