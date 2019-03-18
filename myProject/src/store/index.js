import Vue from 'vue';
import Vuex from 'vuex';

import vuexCache from 'vuex-cache'

Vue.use(Vuex);

import menu from './modules/menu';
import users from './modules/users';
// import user from './modules/user';


export const store = new Vuex.Store({
  plugins: [vuexCache],
  modules: {
    menu,
    users,
    // user,
  },
  strict: process.env.NODE_ENV !== 'production'
});


