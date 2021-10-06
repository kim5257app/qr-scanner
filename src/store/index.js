import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    decodeValue: '',
  },
  getters: {
    decodeValue(state) {
      return state.decodeValue;
    },
  },
  mutations: {
    decodeValue(state, value) {
      console.log('decode:', value);
      state.decodeValue = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
