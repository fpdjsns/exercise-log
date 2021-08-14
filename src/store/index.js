import Vue from 'vue'
import Vuex from 'vuex'
import * as googleSheet from './modules/googleSheet'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
  },
  modules: {
    googleSheet: googleSheet
  },
  getters: {
  }
})
