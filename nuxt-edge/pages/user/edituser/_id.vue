<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Пользователь: {{ user.firstName }} {{ user.lastName }}</span>
        <span>User ID: {{ user.id }}</span>
        <!-- Эта кнопка для ситуации с watch или beforeRouteUpdate, это чисто для примера -->
        <!-- <nuxt-link :to="'/user/edituser/' + (parseInt(id, 10) + 1)">+1</nuxt-link> -->
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
                  class="btn btn-success mr-2"
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
// Это был компонент EditUser.vue
import axios from "axios";

import { AtomSpinner } from "epic-spinners";

// import UserForm from "./UserForm";
// динамический импорт можно подключить сразу не объявляя
// const UserForm = () => import("./UserForm");
import UserForm from "~/components/UserForm";

export default {
  name: "EditUser",
  components: {
    UserForm,
    // UserForm: () => import("../../../components/UserForm"),
    AtomSpinner
  },
  // в nuxt наш id через пропс не приходит, так как роутер генерируется сам, и мы не можем там указать props: true
  // поэтому мы могли бы получить id через this.$route.params.id в mounted(), НО! только хуки beforeCreate и created
  // вызываются как на стороне клиента, так и стороне сервера. Все другие хуки вызываются только на клиенской стороне
  // в beforeCreate и created нам ещё недоступен this.$route, но nuxt предоставяет нам специальный метод asyncData
  // который принимает первым аргументом объект context с несколькими свойствами, в том числе и route, а также params
  // который является алисасом для route.params --> https://nuxtjs.org/api/context
  // props: {
  //   id: String
  // },
  asyncData(context) {
    return { id: context.params.id };
  },
  data() {
    return {
      // id: null, // id определяем в asyncData
      // user: null, // с null не работает почему-то
      user: {},
      // url: "http://localhost:3004/users/"
      url: `${process.env.dbURL}/users/`
    };
  },
  computed: {
    userUrl() {
      return `${this.url}${this.id}`; // "http://localhost:3000/users/" + id,
      // так тоже работает если брать значение id напрямую без определения переменной id в data или asyncData
      // return `${this.url}${this.$route.params.id}`;
    },
    // проверить пустой ли объект
    isEmptyUser() {
      // return Object.keys(this.user).length === 0;
      // тоже самое, но кароче
      // если Object.keys(this.user).length === 0, то 0 -> это false, !false -> это true, во всех других случаях это false
      // если например длина есть Object.keys(this.user).length === 15, то 15 -> это 15, !15 -> это false
      return !Object.keys(this.user).length;
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
  // этот хук нужен вместо watch, если например сделаем кнопку перейти к юзеру с другим id, прямо из загруженного компонента
  // https://router.vuejs.org/ru/guide/essentials/dynamic-matching.html#%D0%BE%D1%82%D1%81n%D0%B5%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B8%D0%B7%D0%BC%D0%B5%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9-%D0%BF%D0%B0%D1%80%D0%B0%D0%BC%D0%B5%D1%82%D1%80%D0%BE%D0%B2
  // beforeRouteUpdate(to, from, next) {
  //   // обрабатываем изменение параметров маршрута...
  //   // не забываем вызвать next()
  //   this.getUser();
  //   next();
  // },
  watch: {
    // Обновление данных при изменениях маршрута
    // или можно через хук beforeRouteUpdate
    $route: "getUser"
  },
  mounted() {
    // так работало бы без nuxt, но на сервере хук mounted не отработает, поэтому id получаем в asyncData
    // this.id = this.$route.params.id;
    this.getUser();
  },
  methods: {
    getUser() {
      axios
        .get(this.userUrl)
        .then(response => response.data)
        .then(response => {
          console.log("response :", response);
          this.user = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveUser() {
      // сделали ref на нашу форму, и обращаемся к её свойсву $v
      this.$refs.child.$v.$touch();
      if (this.$refs.child.$v.$invalid) {
        console.log("Invalid field");
        return;
      } else {
        axios
          .patch(this.userUrl, this.user)
          .then(response => response.data)
          .then(response => {
            console.log("edit");
            console.log("response :", response);
            this.$router.push({ path: "/users" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    removeUser() {
      let confirmed = confirm("Удалить пользователя?");
      if (!confirmed) {
        return;
      } else {
        axios
          .delete(this.userUrl)
          // .then(response => response.data)
          .then(response => {
            console.log("delete");
            console.log("response :", response);
            this.$router.push({ path: "/users" });
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
</style>




/*
если вдруг будут какие-то проблемы с url или id, например id будет null (`PATCH http://localhost:3004/users/null 404 (Not Found)`), нужно по перекомпилировать сборку, просто по перезагружать сам сервер, по перезагружать
браузер, и т.д. код точно работает, у меня уже были такие проблемы, не мог найти ошибку, ошибки НЕТ!!!
update: с watch работает лучше, чем с beforeRouteUpdate, не знаю с чем связано, в beforeRouteUpdate почему то не всегда id подтягивается, хотя без nuxt всё хорошо работало и с beforeRouteUpdate
update2: хотя нет с watch тоже иногда не работает не знаю как фиксить
update3: когда что-то меняю в коде и сохраняю, то начинает работать, но после перезагрузки снова не работает, бред,
есть идея на счёт того чтобы проверить все плагины на то что они доступны на стороне сервера или клиента и подключить должным образом
NOTE: разобрался, просто на стороне сервера не работает хук mounted, код хорошо работал без nuxt, но с nuxt нужно использовать asyncData
*/
