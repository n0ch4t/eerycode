import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    oauth2: {},
  },
  getters: {
    getName: (state) => {
      return state.oauth2;
    },
  },
  mutations: {
    setAuth: (state, oauth2) => {
      return (state.oauth2 = oauth2);
    },
  },
  actions: {},
  modules: {},
});
