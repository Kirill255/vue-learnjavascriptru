/*
Удалил это дерьмо, решил не хранить отдельных юзеров в сторе

import Vue from 'vue';

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    // getUser(state, payload) {
    //   state.user = payload;
    // },
    // setUser(state, payload) {
    //   state.user = payload;
    // },
    // saveUser(state, payload) {
    //   // state.user = payload;
    // }
  },
  actions: {
    // этот экшен диспатчим в роутере по урлу "/users"
    // обратить внимание на / в конце урла "http://localhost:3000/users/"
    // getUser(store, payload) {
    //   let url = "http://localhost:3000/users/";
    //   let id = payload;
    //   let userUrl = `${url}${id}`; // "http://localhost:3000/users/" + id
    //   Vue.http.get(userUrl).then(response => {
    //     // get body data
    //     // console.log('responsebody :', response.body);
    //     store.commit("getUser", response.body)

    //   }, error => {
    //     // error callback
    //     console.log('error :', error);
    //   });
    // },
    setUser(store, payload) {
      let url = "http://localhost:3000/users/";
      let id = payload;
      let userUrl = `${url}${id}`; // "http://localhost:3000/users/" + id
      Vue.http.patch(userUrl, user).then(response => {
        // get body data
        // console.log('responsebody :', response.body);
        store.commit("setUser", response.body)

      }, error => {
        // error callback
        console.log('error :', error);
      });
    },
    saveUser(store, payload) {
      let url = "http://localhost:3000/users/";
      let id = payload;
      let userUrl = `${url}${id}`; // "http://localhost:3000/users/" + id
      Vue.http.get(userUrl).then(response => {
        // get body data
        // console.log('responsebody :', response.body);
        store.commit("setUser", response.body)

      }, error => {
        // error callback
        console.log('error :', error);
      });
    }
  }
};
 */
