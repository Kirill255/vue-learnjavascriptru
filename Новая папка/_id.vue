<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Пользователь: {{ user.firstName }} {{ user.lastName }}</span>
        <span>User ID: {{ user.id }}</span>
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
import axios from "axios";

import { AtomSpinner } from "epic-spinners";
import UserForm from "~/components/UserForm";

export default {
  name: "EditUser",
  components: {
    UserForm,
    // UserForm: () => import("~/components/UserForm"),
    AtomSpinner
  },
  data: () => ({
    id: null,
    user: {},
    // url: "http://localhost:3004/users/"
    url: `${process.env.dbURL}/users/`
  }),
  computed: {
    userUrl() {
      return `${this.url}${this.id}`; // "http://localhost:3000/users/" + id
    }
  },
  mounted() {
    console.log("== Начальные значения ==");
    console.log("this.id: ", this.id);
    console.log("this.userUrl: ", this.userUrl);
    console.log("this.$route: ", this.$route);
    this.id = this.$route.params.id;
    console.log("== После `this.id = this.$route.params.id` ==");
    console.log("this.id2: ", this.id);
    console.log("this.userUrl2: ", this.userUrl);
    this.getUser();
  },
  methods: {
    saveUser() {
      this.$refs.child.$v.$touch();
      if (this.$refs.child.$v.$invalid) {
        console.log("Invalid field");
        return;
      } else {
        console.log("== Отправляю запрос ==");
        console.log("this.id3: ", this.id);
        console.log("this.userUrl3: ", this.userUrl);
        console.log("this.$route2: ", this.$route);
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
    removeUser() {
      let confirmed = confirm("Удалить пользователя?");
      if (!confirmed) {
        return;
      } else {
        axios
          .delete(this.userUrl)
          .then(response => response.data)
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
  },
  watch: {
    $route: "getUser"
  }
};
</script>

<style scoped>
</style>
