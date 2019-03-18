<template>
  <div>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="navbar-nav nav-pills">
        <router-link v-for="(item, index) in menuList"
                     :key="index"
                     :to="item.url"
                     tag="a"
                     class="nav-item nav-link"
                     active-class="active"
                     exact>
          <a>{{ item.text }}</a>
        </router-link>
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
