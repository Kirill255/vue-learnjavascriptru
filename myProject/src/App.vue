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
            <transition name="slide"
                        mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import AppNavbar from "./components/Navbar";

export default {
  name: "app",
  components: { AppNavbar },
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    // menuList() {
    //   return this.$store.getters["menu/items"];
    // },
    // ...mapGetters({
    //   menuList: "menu/items"
    // }),
    ...mapGetters("menu", {
      menuList: "items"
    })
  }
};
</script>

<style>
h1, h2 {
    font-weight: normal;
}

/* .slide-enter {
} */

.slide-enter-active {
    animation: slideIn 0.5s;
}

/* .slide-enter-to {
} */

/* .slide-leave {
} */

.slide-leave-active {
    animation: slideOut 0.5s;
}

/* .slide-leave-to {
} */

@keyframes slideIn {
    from {
        transform: rotateY(90deg);
    }

    to {
        transform: rotateY(0deg);
    }
}

@keyframes slideOut {
    from {
        transform: rotateY(0deg);
    }

    to {
        transform: rotateY(90deg);
    }
}
</style>
