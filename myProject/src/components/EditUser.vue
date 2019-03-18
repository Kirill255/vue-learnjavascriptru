<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Пользователь: {{ user.firstName }} {{ user.lastName }}</span>
        <span>User ID: {{ user.id }}</span>
      </div>
      <div class="card-body">
        <!-- Это нам приходиит через props, но мы сейчас обрабатываем запрос в роутере в роуте /user/:id поэтому нам это больше не нужно -->
        <!-- <div>UserID {{id}}</div> -->

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
                  class="btn btn-success"
                  @click="saveUser">Сохранить изменения</button>

          <button type="button"
                  class="btn btn-danger"
                  @click="removeUser">Удалить пользователя</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { AtomSpinner } from "epic-spinners";

// import UserForm from "./UserForm";
// динамический импорт можно подключить сразу не объявляя
// const UserForm = () => import("./UserForm");

import { mapGetters } from "vuex";

export default {
  name: "EditUser",
  components: {
    // UserForm
    UserForm: () => import("./UserForm"),
    AtomSpinner
  },
  props: {
    id: String
  },
  data() {
    return {
      user: {},
      // user: null,
      url: "http://localhost:3000/users/"
    };
  },
  computed: {
    userUrl() {
      return `${this.url}${this.id}`; // "http://localhost:3000/users/" + id
    },
    // проверить пустой ли объект
    isEmptyUser() {
      return Object.keys(this.user).length === 0;
    }
  },
  // можно использовать этот хук, но мы сделаем через mounted
  // beforeRouteEnter(to, from, next) {
  //   // в этом хуке просто нет доступа к this
  //   let url = `http://localhost:3000/users/${to.params.id}`;
  //   fetch(url)
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(user => {
  //       // console.log("user :", user);
  //       next(vm => (vm.user = user));
  //     });
  // },
  // этот хук нам нужен если мы например сделаем кнопку перейти к юзеру с другим id, прямо из загруженного компонента
  // наш компонент запрашивает юзера при mounted компонента, а если потом поменяется id, нам нужно это отследить
  beforeRouteUpdate(to, from, next) {
    // обрабатываем изменение параметров маршрута...
    // не забываем вызвать next()
    this.getUser();
    next();
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$http.get(this.userUrl).then(
        response => {
          // get body data
          // console.log("responsebody :", response.body);
          // this.user = response.body;

          // // сделал небольшой таймаут, чтобы сначала покрутился спинер
          // setTimeout(() => {
          //   this.user = response.body;
          // }, 1000);

          // переделал реализацию
          this.user = response.body;
        },
        error => {
          // error callback
          console.log("error :", error);
        }
      );
    },
    saveUser() {
      // сделали ref на нашу форму, и обращаемся к её свойсву $v
      this.$refs.child.$v.$touch();
      if (this.$refs.child.$v.$invalid) {
        console.log("Invalid field");
        return;
      } else {
        this.$http.patch(this.userUrl, this.user).then(
          response => {
            // get body data
            console.log("edit");
            // console.log('response :', response);
            this.$router.push({ path: "/users" });
          },
          error => {
            // error callback
            console.log("error :", error);
          }
        );
      }
    },
    removeUser() {
      let confirmed = confirm("Удалить пользователя?");
      if (!confirmed) {
        return;
      } else {
        console.log("delete");
        this.$http.delete(this.userUrl).then(
          response => {
            // get body data
            console.log("response :", response);
            this.$router.push({ path: "/users" });
          },
          error => {
            // error callback
            console.log("error :", error);
          }
        );
      }
    }
  }
};
</script>

<style scoped>
</style>




/*
count: {
      get() {
        return this.$store.getters.count;
      },
      set(value) {
        return this.$store.commit("setCount", value);
      }
    },
*/
