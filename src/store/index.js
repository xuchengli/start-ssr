import Vue from 'vue';
import Vuex from 'vuex';
import { fetchItem } from './api';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      items: {},
    },
    mutations: {
      setItem(state, { id, item }) {
        state.items = { ...state.items, [id]: item };
      },
    },
    actions: {
      async fetchItem({ commit }, id) {
        commit('setItem', await fetchItem(id));
      },
    },
  });
}
