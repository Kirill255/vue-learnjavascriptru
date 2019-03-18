<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="navbar-nav nav-pills">
        <nuxt-link v-for="(item, index) in menuList"
                   :key="index + item.text"
                   :to="item.url"
                   tag="a"
                   class="nav-item nav-link"
                   active-class="active"
                   exact>
          {{ item.text }}
        </nuxt-link>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array
    }
  }
};
</script>

<style scoped>
</style>

/*
В nuxt-link есть отличие от router-link, текст не нужно оборачивать в <a>{{ item.text }}</a>, нужно просто {{ item.text }}, инчае будет дублирование тэгов, a в a, что логично, у нас ведь nuxt-link с атрибутом tag="a"
*/
