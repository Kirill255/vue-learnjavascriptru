<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Гость</span>
        <span>Новый пользователь</span>
      </div>
      <div class="card-body">

        <div v-if="isEmptyUser"
             class="d-flex justify-content-center align-items-center">

          <atom-spinner :animation-duration="1000"
                        :size="120"
                        :color="'#ff1d5e'">
          </atom-spinner>

        </div>

        <div v-else>

          <user-form v-model="user"
                     ref="child"></user-form>

          <button type="button"
                  class="btn btn-primary"
                  @click="createUser">Создать пользователя</button>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
// Это был компонент AddUser.vue
// import UserForm from "../../components/UserForm";
// const UserForm = () => import("./UserForm");
import UserForm from "~/components/UserForm";
import axios from "axios";

import { AtomSpinner } from "epic-spinners";

export default {
  name: "AddUser",
  components: { UserForm, AtomSpinner },
  // asyncData(context) {
  //   console.log("context :", context);
  //   return {
  //     user: {
  //       id: null,
  //       isActive: false,
  //       balance: "",
  //       picture: "http://via.placeholder.com/128x128",
  //       birthday: "",
  //       accessLevel: "guest",
  //       firstName: "",
  //       lastName: "",
  //       company: "",
  //       email: "",
  //       phone: "",
  //       address: "",
  //       about: "",
  //       registered: new Date().toISOString().split("T")[0]
  //     }
  //   };
  // },
  // asyncData({ params }) {
  //   return axios
  //     .get(
  //       `https://raw.githubusercontent.com/vuelibs/products/master/user.json`
  //     )
  //     .then(res => {
  //       console.log("res :", res);
  //       let data = res.data[0];
  //       console.log("data :", data);
  //       let obj = {
  //         ...data,
  //         registered: new Date().toISOString().split("T")[0]
  //       };
  //       return { user: obj };
  //     });
  // },
  data() {
    return {
      user: {
        // id: "",
        id: null,
        isActive: false,
        balance: "",
        picture: "http://via.placeholder.com/128x128",
        birthday: "",
        accessLevel: "guest",
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        about: "",
        registered: new Date().toISOString().split("T")[0]
      },
      // user: {},
      // url: "http://localhost:3000/users/"
      url: `${process.env.dbURL}/users`
    };
  },
  computed: {
    isEmptyUser() {
      return !Object.keys(this.user).length;
    }
  },
  methods: {
    createUser() {
      this.$refs.child.$v.$touch();
      if (this.$refs.child.$v.$invalid) {
        console.log("Invalid field");
        return;
      } else {
        axios
          .post(this.url, this.user)
          .then(response => response.data)
          .then(response => {
            console.log("addNew");
            console.log("response :", response);
            this.$router.push({ path: "/users" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    // fetchUser() {
    //   axios
    //     .get(
    //       `https://raw.githubusercontent.com/vuelibs/products/master/user.json`
    //     )
    //     .then(res => {
    //       console.log("res :", res);
    //       let data = res.data[0];
    //       console.log("data :", data);
    //       let obj = {
    //         ...data,
    //         registered: new Date().toISOString().split("T")[0]
    //       };
    //       this.user = obj;
    //     });
    // },
    // fetchUser() {
    //   setTimeout(() => {
    //     this.user = {
    //       id: null,
    //       isActive: false,
    //       balance: "",
    //       picture: "http://via.placeholder.com/128x128",
    //       birthday: "",
    //       accessLevel: "guest",
    //       firstName: "",
    //       lastName: "",
    //       company: "",
    //       email: "",
    //       phone: "",
    //       address: "",
    //       about: "",
    //       registered: new Date().toISOString().split("T")[0]
    //     };
    //   }, 500);
    // }
  },
  mounted() {
    // this.fetchUser();
  }
};
</script>

<style scoped>
</style>


/*
Есть проблема при перезагрузке страницы (находясь уже на этой странице) "TypeError Cannot read property 'userInfo' of undefined"
пробовал и просто asyncData, и промис возвращать из asyncData, и стор в vuex создавал и оттуда тянул данные, и fetch из стора юзал
и всёровно при перезагрузке страницы (находясь уже на этой странице) "'userInfo' of undefined", пишет что типа проблема в components/UserForm.vue, но всё хорошо работает на edit page

update: засунул данные на сервер(на github, можно куда угодно, только чтобы туда можно делать запрос) и через http запрос получаю свой объект user и тогда работает, понятия не имею почему так, возможно что пока запрос идёт к серверу, nuxt делает свои какие-то ssr вещи
update2: сделал без сервера(github), а просто засунул присвоение данных в setTimeout и тоже работает!!! что за бред? в чём подвох?
update3: решил проблемы оказывается плагин vulidate не нужно подключать как "only client plugin", просто подключаем как обычно без! всяких process.browser и ssr: false и тогда работает, кстати интересный костыль я придумал с setTimeout, не знаю почему с ним работало
*/
