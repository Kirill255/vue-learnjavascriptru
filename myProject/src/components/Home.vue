<template>
  <div>
    <div>
      <h2>{{ home }}</h2>
    </div>
    <router-link :to="{name: 'users'}">Список пользователей</router-link>
    <router-link :to="{name: 'adduser'}">Добавить пользователя</router-link>
  </div>
</template>

<script>
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
