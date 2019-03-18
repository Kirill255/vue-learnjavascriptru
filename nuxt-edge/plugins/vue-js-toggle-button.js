import Vue from 'vue'

// тут проблема со стилями, есть идея скопировать стили и вставить в свой компонент руками, но не проверял
// import ToggleButton from 'vue-js-toggle-button/dist/ssr.index'

// так работает
// import ToggleButton from 'vue-js-toggle-button'
// Vue.use(ToggleButton)


// попробовал скопировать стили, работает только если убрать scoped атрибут
import Button from 'vue-js-toggle-button/dist/ssr.index'
Vue.use(Button)
