import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);
let http = axios.create({
  baseURL:
    "https://mockapi.eolinker.com/FbVf4MH0a082b35420706ebbe5770bcacd13a40e3c1a6bd"
});
export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    loadUser ({ commit }) {
      return new Promise((resolve, reject) => {
        http.get('/user').then((res) => {
          commit('setUser', res.data.user)
          resolve(res);
        }, error => {
          // http failed, let the calling function know that action did not work out
          reject(error);
        })
      })
    }
  }
});
