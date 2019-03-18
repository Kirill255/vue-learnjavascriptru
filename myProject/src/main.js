import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css"
// так как fontawesome использует шрифты, для них нужно установить url-loader
// npm i url-loader -D, если он не установлен, и прописать настройки в webpack.config.js
// https://github.com/webpack-contrib/css-loader/issues/38
import "@fortawesome/fontawesome-free/css/all.min.css"
import "nprogress/nprogress.css"

import "../css/styles.css";


import Vue from 'vue'
import App from './App.vue'

import { store } from './store';
import { router } from './router';


import VueResource from 'vue-resource';
Vue.use(VueResource);
// Vue.http.options.root = 'http://js.dmitrylavrik.ru/api/'


// подключение как плагин, но есть возможность у этого плагина подключить его как компонент
// сообственно я подключил как компонент в ToogleActive.vue
// import ToggleButton from 'vue-js-toggle-button'
// Vue.use(ToggleButton)


import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
