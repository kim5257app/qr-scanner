import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pause: false,
    decodeValue: '',
    adSize: {
      height: 0,
      width: 0,
    },
  },
  getters: {
    pause(state) {
      return state.pause;
    },
    decodeValue(state) {
      return state.decodeValue;
    },
    adSize(state) {
      return state.adSize;
    },
  },
  mutations: {
    pause(state, value) {
      state.pause = value;
    },
    decodeValue(state, value) {
      console.log('decode:', value);
      state.decodeValue = value;
    },
    adSize(state, value) {
      state.adSize = value;
    },
  },
  actions: {
  },
  modules: {
  },
});
