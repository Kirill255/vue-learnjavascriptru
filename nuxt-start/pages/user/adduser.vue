<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Гость</span>
        <span>Новый пользователь</span>
      </div>
      <div class="card-body">

        <user-form v-model="user"
                   ref="child"></user-form>

        <button type="button"
                class="btn btn-primary"
                @click="createUser">Создать пользователя</button>

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

export default {
  name: "AddUser",
  components: { UserForm },
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
      // url: "http://localhost:3000/users/"
      url: `${process.env.dbURL}/users`
    };
  },
  computed: {},
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
  }
};
</script>

<style scoped>
</style>





