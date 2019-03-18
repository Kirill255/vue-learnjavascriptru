<template>
  <div>

    <div>
      <h2>{{ home }}</h2>
    </div>

    <div>
      <nuxt-link :to="{name: 'users'}">Список пользователей</nuxt-link>
      <nuxt-link :to="{name: 'user-adduser'}">Добавить пользователя</nuxt-link>
    </div>

  </div>
</template>

<script>
// Это был компонент Home.vue
// заменили router-link на nuxt-link
export default {
  name: "Home",
  data() {
    return {
      home: "Home page"
    };
  }
};
</script>

<style scoped>
</style>


