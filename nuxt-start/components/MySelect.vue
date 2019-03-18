<template>
  <div>
    <div class="form-group">
      <label for="">Уровень доступа</label>

      <select name=""
              id="mySelect"
              :value="activeValue">
        <option v-for="(level, i) in accessLevel"
                :key="i"
                :value="level.value"
                :disabled="!level.value">
          <i :class="[level.value === 'guest' ? 'far fa-user' : level.value === 'user' ? 'fas fa-user' : level.value === 'admin' ? 'fas fa-user-tie' : '']"></i> {{level.text}}
        </option>
      </select>

    </div>
  </div>
</template>

<script>
import $ from "jquery";
// import "selectric";
if (process.browser) {
  require("selectric");
}

import "selectric/public/themes/modern/selectric.css";
// import "selectric/public/themes/modern-v2/selectric.css";

export default {
  name: "MySelect",
  model: {
    prop: "activeValue"
  },
  props: {
    activeValue: {
      type: String
    }
  },
  data() {
    return {
      accessLevel: [
        { value: "", text: "Выберите один из вариантов" },
        { value: "guest", text: "Guest" },
        { value: "user", text: "User" },
        { value: "admin", text: "Admin" }
      ]
    };
  },
  watch: {
    activeValue: function(newVal, oldVal) {
      // console.log("ActiveValue newVal :", newVal);
      $(function() {
        $("#mySelect").selectric("refresh");
      });
    }
  },
  mounted() {
    let vm = this;

    $(function() {
      $("#mySelect").selectric({
        // // засунул это в watch самого Vue
        // onInit: () => {
        //   $("#mySelect").selectric("refresh");
        // },
        onChange: element => {
          $(element).change();
          // this.$emit("input", element.value);
          vm.$emit("input", element.value);
        }
      });
    });
  },
  beforeDestroy() {
    $(function() {
      $("#mySelect").selectric("destroy");
    });
  }
};
</script>

<style scoped>
</style>
