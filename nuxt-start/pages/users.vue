<template>
  <div>

    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Cписок пользователей</span>
        <span>Всего {{ totalUsers }} пользователей</span>
      </div>
      <div class="card-body">
        <div class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>Пользователи в базе</span>
            <button type="button"
                    class="btn btn-primary"
                    @click="reloadUsers"
                    :disabled="loadingUsers">
              <i class="fas fa-sync-alt"
                 :class="[loadingUsers ? 'fa-spin' : '']"></i> Обновить таблицу</button>
          </div>
          <div class="card-body">

            <div v-if="loadingUsers"
                 class="d-flex justify-content-center align-items-center">
              <atom-spinner :animation-duration="1000"
                            :size="120"
                            :color="'#ff1d5e'">
              </atom-spinner>
            </div>

            <div v-else>
              <!--  -->
              <div class="form-group row">
                <div class="col-sm-2">
                  <select class="form-control"
                          id="selectQuantity"
                          v-model="selectedNumber">
                    <option v-for="(option, i) in selectOptions"
                            :key="i"
                            :value="option.value">
                      {{ option.text }}
                    </option>
                  </select>
                </div>
                <label for="selectQuantity"
                       class="col-sm-10 col-form-label">Выбрано элементов на страницу: {{ selectedNumber }}</label>
              </div>
              <!--  -->
              <table class="table table-striped table-responsive">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Имя</th>
                    <th scope="col">Фамилия</th>
                    <th scope="col">Активен</th>
                    <th scope="col">Баланс</th>
                    <th scope="col">Емайл</th>
                    <th scope="col">Телефон</th>
                    <th scope="col">Зарегестрирован</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, i) in displayableUsers"
                      :key="i">
                    <th scope="row">
                      <!-- <router-link :to="{path: '/user/' + user.id}"># {{ user.id }}</router-link> -->
                      <nuxt-link :to="{path: `/user/edituser/${user.id}`}"># {{ user.id }}</nuxt-link>
                    </th>
                    <td>{{user.firstName}}</td>
                    <td>{{user.lastName}}</td>
                    <td>{{user.isActive}}</td>
                    <td>{{user.balance}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.phone}}</td>
                    <td>{{user.registered}}</td>
                  </tr>
                </tbody>
              </table>

              <div class="mb-3">Выбрана страница: {{ currentPage }}</div>
              <app-pagination :total="totalUsers"
                              :per-page="selectedNumber"
                              :current="currentPage"
                              @page-changed="pageChanged"></app-pagination>

            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
// Это был компонент Users.vue
import { AtomSpinner } from "epic-spinners";
// import AppPagination from "../components/Pagination";
// const AppPagination = () => import("../components/Pagination");
import AppPagination from "~/components/Pagination";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Users",
  components: { AppPagination, AtomSpinner },
  data() {
    return {
      currentPage: 1,
      selectedNumber: 5, // perPage на одной странице
      selectOptions: [
        { text: "2", value: 2 },
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "100", value: 100 }
      ]
      // =========== Взято с друго проекта, оставил для наглядности, чтобы сопоставить со своими исходными данными
      // для пагинации нам нужно:
      // photos: [], // фотографии
      // totalPhotos: 0, // всего фото
      // perPage: 9, // на одной странице
      // currentPage: 1 // выбранная страница - страница сейчас
    };
  },
  computed: {
    // ...mapGetters("users", {
    //   loadingUsers: "loading",
    //   allUsers: "users", // массив юзеров
    //   totalUsers: "usersCount" // // всего юзеров
    // }),
    ...mapGetters({
      loadingUsers: "users/loading",
      allUsers: "users/users",
      totalUsers: "users/usersCount"
    }),
    // loadingUsers() {
    //   return this.$store.state.users.loading;
    //   // return this.$store.getters["users/loading"];
    // },
    // allUsers() {
    //   return this.$store.state.users.users;
    //   // return this.$store.getters["users/users"];
    // },
    // totalUsers() {
    //   return this.$store.getters["users/usersCount"];
    // },
    displayableUsers() {
      let page = this.currentPage;
      let perPage = this.selectedNumber;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return this.allUsers.slice(from, to);
    }
  },
  methods: {
    ...mapActions({
      // fetchUsers: "users/getUsers",
      reloadUsers: "users/restoreUsers",
      cacheFetchUsers: "users/cacheGetUsers"
    }),
    pageChanged(page) {
      // console.log("this.currentPage1 :", this.currentPage);
      // console.log("page :", page);
      this.currentPage = page;
      // console.log("this.currentPage2 :", this.currentPage);
    }
  },
  mounted() {
    // this.$store.dispatch("users/getUsers");
    // console.log("this.allUsers :", this.allUsers);
    // this.fetchUsers();
    this.cacheFetchUsers();
  }
};
</script>

<style scoped>
</style>

/*
вроде есть баг с таблицей которая находится внутри кард, вернее со стилями
https://github.com/twbs/bootstrap/issues/17395ы
пробовал ставить p-0 на .card-body, но что-то не работает или как-то всё всёровно криво
*/

