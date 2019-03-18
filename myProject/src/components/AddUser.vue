<template>
  <div>
    <div class="card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span>Гость</span>
        <span>Новый пользователь</span>
      </div>
      <div class="card-body">

        <!-- <user-form v-model="user"
                   @ready="readyToSubmit"></user-form> -->
        <!-- <user-form></user-form> -->

        <!-- <button type="button"
                class="btn btn-primary"
                @click="createUser"
                :disabled="!validModel">Создать пользователя</button> -->

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
import UserForm from "./UserForm";
// const UserForm = () => import("./UserForm");

export default {
  name: "AddUser",
  components: { UserForm },
  data() {
    return {
      // user: {},
      // так как мы прикрутили валидацию, то нам нужно явно определять начальные значения всех полей, просто так работает эта валидация
      user: {
        id: "",
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
      url: "http://localhost:3000/users/"
      // validModel: false
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
        this.$http.post(this.url, this.user).then(
          response => {
            // get body data
            console.log("addNew");
            // console.log("responsebody :", response.body);
            // this.user = response.body;
            this.$router.push({ path: "/users" });
          },
          error => {
            // error callback
            console.log("error :", error);
          }
        );
      }
    }
    // readyToSubmit(val) {
    //   // console.log("readyToSubmit value :", val);
    //   this.validModel = val;
    // }
  }
};
</script>

<style scoped>
</style>





