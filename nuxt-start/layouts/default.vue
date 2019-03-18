<template>
  <div>
    <header>
      <div class="container">
        <div class="row">
          <div class="col col-sm-12">
            <h1>{{ msg }}</h1>
            <app-navbar :menuList="menuList"></app-navbar>
          </div>
        </div>
        <hr>
      </div>

    </header>
    <section>
      <div class="container">
        <div class="row">
          <div class="col col-sm-12">
            <transition name="slide">
              <nuxt/>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// import AppNavbar from "../components/Navbar";
import AppNavbar from "~/components/Navbar";

export default {
  name: "app",
  components: { AppNavbar },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    // ...mapGetters("menu", {
    //   menuList: "items"
    // })
    ...mapGetters({
      menuList: "menu/items"
    })
    // menuList() {
    //   return this.$store.state.menu.items;
    // }
  }
};
</script>

<style>
</style>


