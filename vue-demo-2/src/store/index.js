import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const moduleA = {
  state: () => ({
    Count: 0,
  }),
  mutations: {
    addA(state, payload) {
      state.Count += payload.num;
    },
    subtractA(state, payload) {
      state.Count -= payload.num;
    },
  },
  getters: {
    ACountPage: (state) => {
      return state.Count + "页";
    },
  },
};

const moduleB = {
  state: () => ({
    Count: 0,
  }),
  mutations: {
    addB(state, payload) {
      state.Count += payload.num;
    },
    subtractB(state, payload) {
      state.Count -= payload.num;
    },
  },
  actions: {},
  getters: {},
};

const moduleC = {
  state: () => ({
    Count: 0,
  }),
  mutations: {
    addC(state, payload) {
      state.Count += payload.num;
    },
    subtractC(state, payload) {
      state.Count -= payload.num;
    },
  },
  actions: {
    actionA(context) {
      context.commit("addC", { num: 1 });
    },
    actionB({ commit }) {
      commit("addC", { num: 1 });
    },
    actionC({ commit }, payload) {
      setTimeout(() => {
        commit("addC", payload);
      }, 2000);
    },
    actionD({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit("addC", { num: 2 });
          resolve();
        }, 2000);
      });
    },
    actionE({ dispatch, commit }) {
      return dispatch("actionD").then(() => {
        commit("subtractC", { num: 1 });
      });
    },
  },
  getters: {},
};

export default new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB,
    c: moduleC,
  },
});
