<template>
  <div class="container">

    <div v-if="error.statusCode === 404">
      <e404></e404>
    </div>
    <div v-else>
      <div class="otherError">
        <h1>An {{error.statusCode}} error occured</h1>
        <p>{{ error.message }}</p>
        <nuxt-link to="/">Home page</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
// import E404 from "../components/E404.vue";
import E404 from "~/components/E404.vue";

export default {
  components: { E404 },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head: {
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Dosis:400,300,500,800"
      }
    ]
  },
  data() {
    return {
      mounted: false
    };
  },
  created() {
    // console.log(this.error);
    console.error("error: ", this.error);
  },
  watch: {
    error(newErr) {
      if (newErr) {
        // console.log(newErr);
        console.error("newErr: ", newErr);
      }
    }
  },
  mounted() {
    this.mounted = true;
  }
};
</script>

<style scoped>
.otherError {
  font-family: sans-serif;

  padding-top: 10%;

  text-align: center;
}

h1 {
  font-size: 30px;
}
</style>
