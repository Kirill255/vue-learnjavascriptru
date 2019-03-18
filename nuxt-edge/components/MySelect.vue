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
          {{level.text}}
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
        optionsItemBuilder: function(itemData, element, index) {
          return itemData.value === "guest"
            ? '<span class="icon guest"></span>' + itemData.text
            : itemData.value === "user"
              ? '<span class="icon user"></span>' + itemData.text
              : itemData.value === "admin"
                ? '<span class="icon admin"></span>' + itemData.text
                : itemData.text;
        },
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

<style>
.icon::before {
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.guest::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 400;
  content: "\f007";
}

.user::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f007";
}

.admin::before {
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f508";
}
</style>


/*
При ssr вся разметка должна быть как и обычная html-разметка валидной, и к сожалению внутри тега <option> не может быть других вложеностей кроме текста, поэтому мы туда не можем вставить ни span не i с иконкой, но наш плагин даёт нам возможность настроить optionsItemBuilder, вот в него мы и встроили свои иконки с помощью span и стилей

<i :class="[level.value === 'guest' ? 'far fa-user' : level.value === 'user' ? 'fas fa-user' : level.value === 'admin' ? 'fas fa-user-tie' : '']"></i>

 */
