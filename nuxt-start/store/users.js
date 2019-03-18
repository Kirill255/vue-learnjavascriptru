import axios from "axios";


// импортим глобальный стор, чтобы можно было обратиться к cache, и переименуем, чтобы небыло путаницы
// import { store as myStore } from "./index.js";


export const state = () => ({
  users: [],
  loading: false
})

export const getters = {
  users(state) {
    return state.users;
  },
  usersCount(state) {
    return state.users.length;
  },
  loading(state) {
    return state.loading;
  }
}

export const mutations = {
  getUsers(state, payload) {
    state.users = payload;
  },
  onloading(state) {
    state.loading = !state.loading;
  }
}

export const actions = {
  getUsers(store, payload) {
    store.commit("onloading");
    // let url = "http://localhost:3004/users";
    // в конфиге указывали переменную для урла базы данных
    let url = `${process.env.dbURL}/users`;
    axios.get(url)
      .then(response => response.data)
      .then((response) => {
        console.log('response :', response);
        store.commit("getUsers", response)
        store.commit("onloading");
      })
      .catch(error => {
        console.log(error);
      });
    // console.log('this.$router :', this.$router);
    // console.log('this.app :', this.app);
  },
  restoreUsers(store, payload) {
    // без nuxt я импортил в файл экземпляр самого стора и обращался к vuex-cache
    // myStore.cache.delete("users/getUsers");
    // myStore.cache.dispatch("users/getUsers");

    // в nuxt в экшенах доступны спец.переменные this.$router и this.app, поэтому я обращаюст к кэш через них
    this.app.store.cache.delete("users/getUsers");
    this.app.store.cache.dispatch("users/getUsers");
  },
  // без nuxt я делал диспатч кэша в роутере, в роутере был импортнут инстанс стора, и в нужном роуте я вызывал диспатч
  // в nuxt роутер генерится сам, я не могу ничего там прописывать, поэтому я вызываю экшены как обычно напрямую из компонентов
  // и так как там нет инстанса стора, или спец.метода для кэша типа mapGetters, только для кэша, я сделал прослойку-хэлпер
  // сделал хэлпер для того чтобы сделать вызов экшена getUsers через vuex-cache, просто в самом экшене я не могу вызывать самого себя
  // этот костыль я придумал только для использования вместе с vuex-cache, кстате может даже и неправильно, я не знаю как нужно
  // я вызываю в компоненте этот хэлпер, который вызывает vuex-cache
  cacheGetUsers() {
    this.app.store.cache.dispatch("users/getUsers");
  }
}

