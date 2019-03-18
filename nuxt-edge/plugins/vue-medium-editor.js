import Vue from 'vue'
// import Vue2MediumEditor from "vue2-medium-editor"

// const MediumEditor = {
//   install(Vue, options) {
//     Vue.component('medium-editor', Vue2MediumEditor)
//   }
// };
// Vue.use(MediumEditor);

// вот такой костыльный способ подключения плагина, у которого нет возможности подключения через ssr
// https://medium.com/@codebeast_/why-your-third-party-plugin-dont-work-in-nuxt-and-how-to-fix-it-d1a8caadf422
// или вот так ещё можно попробовать
// https://github.com/NightCatSama/vue-slider-component/issues/114#issuecomment-353827607
// https://github.com/jofftiquez/vue-stripe-checkout/issues/14
// https://github.com/akulubala/vue-product-zoomer/issues/4


import Vue2MediumEditor from "vue2-medium-editor"
Vue.component('medium-editor', Vue2MediumEditor)
