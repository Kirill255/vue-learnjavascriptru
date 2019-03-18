import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import NProgress from "nprogress"; // не забыть подключить стили в main.js

import { store } from '../store';

// import Home from '../components/Home'
// import Users from '../components/Users'
// import AddUser from '../components/AddUser'
// import EditUser from '../components/EditUser'
// import Order from '../components/Order'
// import E404 from '../components/E404'

// чтобы работали динамичиеские импорты нужно установить плагин и прописать найстройку в .babelrc
// https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import/

// const Home = () => import('../components/Home')
// const Users = () => import('../components/Users')
// const AddUser = () => import('../components/AddUser')
// const EditUser = () => import('../components/EditUser')
// const Order = () => import('../components/Order')
// const E404 = () => import('../components/E404')

// также сделал alias в webpack.config.js для путей, помоему они тоже начали работать только после установки плагина выше

const Home = () => import('@/components/Home')
const Users = () => import('@/components/Users')
const AddUser = () => import('@/components/AddUser')
const EditUser = () => import('@/components/EditUser')
const Order = () => import('@/components/Order')
const E404 = () => import('@/components/E404')

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    // можно сразу сдесь подключить динамический импорт без объявления константы
    // component: () => import('../components/Users'),
    beforeEnter(to, from, next) {
      // store.dispatch("users/getUsers");
      // установил пакет vuex-cache, теперь диспатчим через кэш
      store.cache.dispatch('users/getUsers');
      next();
    }
  },
  {
    path: '/user/:id',
    name: 'edituser',
    component: EditUser,
    props: true, // динамичекские параметры роутера автоматом приходят ввиде пропсов в компонент, тоесть сейчас id можно получить через props
    // переделал, теперь я отдельного пользователя не храню в сторе, напрямую из компонента делаю запрос к api
    // ну и в самом компоненте обрабатываю изменене параметров роутера, в частности id, в хуке beforeRouteUpdate()
    // beforeEnter(to, from, next) {
    //   // console.log(to);
    //   store.dispatch("user/getUser", to.params.id);
    //   next();
    // }
  },
  {
    path: '/adduser',
    name: 'adduser',
    component: AddUser
  },
  {
    path: '/order',
    name: 'order',
    component: Order
  },
  {
    path: '*',
    component: E404
  }
];

export const router = new VueRouter({
  routes,
  mode: 'history'
});


// добавляем наш NProgress
// https://scotch.io/tutorials/add-loading-indicators-to-your-vuejs-application

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})
