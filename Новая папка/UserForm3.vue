<template>
  <div>

    <!-- ЗАМЕТКА: во всех полях нужно заменить -->
    <!-- v-model="userInfo.firstName" -->
    <!-- на вот это -->
    <!-- v-model.trim="$v.userInfo.firstName.$model" -->
    <!-- это связанно с тем что мы прикрутили валидацию и она так работает -->

    <!-- update: кстате можно ещё сделать другим способом  -->
    <!-- оставить привычный v-model="userInfo.firstName" -->
    <!-- но дополнительно добавить @input="$v.userInfo.firstName.$touch()" -->
    <!--  -->

    <form @submit.prevent>

      <div class="form-group"
           :class="{ 'has-error': $v.userInfo.firstName.$error }">
        <label for="firstName">Имя *</label>
        <input type="text"
               class="form-control"
               id="firstName"
               placeholder="Введите имя"
               v-model.trim="$v.userInfo.firstName.$model">

        <div v-if="$v.userInfo.firstName.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.firstName.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.firstName.minLength">
            <small>FirstName must have at least {{$v.userInfo.firstName.$params.minLength.min}} letters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.firstName.maxLength">
            <small>FirstName must have at most {{$v.userInfo.firstName.$params.maxLength.max}} letters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.firstName.validChars">
            <small>Accepts only Latin or Cyrillic alphabet characters.</small>
          </div>

        </div>

      </div>

      <!-- ================================================================= -->

      <div class="form-group"
           :class="{ 'has-error': $v.userInfo.lastName.$error }">
        <label for="lastName">Фамилия *</label>
        <input type="text"
               class="form-control"
               id="lastName"
               placeholder="Введите фамилию"
               v-model.trim="$v.userInfo.lastName.$model">

        <div v-if="$v.userInfo.lastName.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.lastName.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.lastName.minLength">
            <small>LastName must have at least {{$v.userInfo.lastName.$params.minLength.min}} letters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.lastName.maxLength">
            <small>LastName must have at most {{$v.userInfo.lastName.$params.maxLength.max}} letters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.lastName.validChars">
            <small>Accepts only Latin or Cyrillic alphabet characters.</small>
          </div>

        </div>

      </div>

      <!-- ================================================================= -->

      <div class="form-group"
           :class="{ 'has-error': $v.userInfo.email.$error }">
        <label for="email">Емайл *</label>
        <input type="email"
               class="form-control"
               id="email"
               placeholder="Введите емайл"
               v-model.trim="$v.userInfo.email.$model">

        <div v-if="$v.userInfo.email.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.email.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.email.email">
            <small>Email must be a valid e-mail address.</small>
          </div>

        </div>

      </div>

      <!-- ================================================================= -->

      <my-dropzone v-model="userInfo.picture"></my-dropzone>

      <!-- ============================================================== -->

      <birthday-picker v-model.trim="$v.userInfo.birthday.$model"></birthday-picker>

      <!-- ================================================================= -->

      <toogle-active v-model="userInfo.isActive"></toogle-active>

      <!-- ================================================================= -->

      <my-select v-model="userInfo.accessLevel"></my-select>

      <!-- ================================================================= -->

      <balance-input v-model.trim="$v.userInfo.balance.$model"></balance-input>

      <!-- ================================================================= -->

      <phone-input v-model.trim="$v.userInfo.phone.$model"></phone-input>

      <!-- ================================================================= -->

      <div class="form-group"
           :class="{ 'has-error': $v.userInfo.address.$error }">
        <label for="address">Адрес *</label>
        <input type="text"
               class="form-control"
               id="address"
               placeholder="Введите адрес"
               v-model.trim="$v.userInfo.address.$model">

        <div v-if="$v.userInfo.address.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.address.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.address.minLength">
            <small>Address must have at least {{$v.userInfo.address.$params.minLength.min}} characters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.address.maxLength">
            <small>Address must have at most {{$v.userInfo.address.$params.maxLength.max}} characters.</small>
          </div>

        </div>

      </div>

      <!-- ================================================================= -->

      <div class="form-group"
           :class="{ 'has-error': $v.userInfo.company.$error }">
        <label for="company">Компания *</label>
        <input type="text"
               class="form-control"
               id="company"
               placeholder="Введите компанию"
               v-model.trim="$v.userInfo.company.$model">

        <div v-if="$v.userInfo.company.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.company.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.company.minLength">
            <small>Company must have at least {{$v.userInfo.company.$params.minLength.min}} characters.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.company.maxLength">
            <small>Company must have at most {{$v.userInfo.company.$params.maxLength.max}} characters.</small>
          </div>

        </div>

      </div>

      <!-- ================================================================= -->

      <area-editor v-model.trim="$v.userInfo.about.$model"></area-editor>
      <!--  -->

      <!-- Разметку для отображения ошибок валидации переместим внутрь компонента,
          чтобы небыло разных отступов (margin/padding), а также чтобы внутри компонента
          был доступен наш валидатор $v, мы его передадим с помощью внутреннего механизма
          самого Vue.js, механизма инъекций provide/inject, в родителе provide, в ребёнке inject,
          также вместо этого можно было бы передать $v просто как props например :v="$v" -->

      <!-- <div v-if="$v.userInfo.about.$error">

        <div class="p-2 text-danger"
             v-if="!$v.userInfo.about.required">
          <small>Field is required.</small>
        </div>
        <div class="p-2 text-danger"
             v-if="!$v.userInfo.about.minLength">
          <small>About must have at least {{$v.userInfo.about.$params.minLength.min}} characters.</small>
        </div>
        <div class="p-2 text-danger"
             v-if="!$v.userInfo.about.maxLength">
          <small>About must have at most {{$v.userInfo.about.$params.maxLength.max}} characters.</small>
        </div>

      </div> -->
      <!--  -->

      <!-- ================================================================= -->

      <my-calendar v-model="userInfo.registered"></my-calendar>

      <!-- ================================================================= -->

      <div>
        <pre>
{{ userInfo }}
        </pre>
      </div>

    </form>

  </div>
</template>

<script>
// import library globally in main.js to enable vuelidate plugin and then =>
import {
  required,
  minLength,
  maxLength,
  between,
  alpha,
  url,
  email,
  numeric
} from "vuelidate/lib/validators";

// импортим свои собственные валидаторы
// import { validChars } from "../services/myValidators/validChars.js";
import { validChars } from "~/services/myValidators/validChars.js";
// import { validPhone } from "../services/myValidators/validPhone.js";
import { validPhone } from "~/services/myValidators/validPhone.js";

// можно подключать синхронно или асинхронно, но у меня были проблемы с асинхронным подключением
// в проессе разработки иногда компоненты не успевали подгружаться и стили не применялись

// const MyDropzone = () => import("./MyDropzone");
// const MyCalendar = () => import("./MyCalendar");
// const BirthdayPicker = () => import("./BirthdayPicker");
// const ToogleActive = () => import("./ToogleActive");
// const MySelect = () => import("./MySelect");
// const AreaEditor = () => import("./AreaEditor");

import MyDropzone from "./MyDropzone";
import MyCalendar from "./MyCalendar";
import BirthdayPicker from "./BirthdayPicker";
import ToogleActive from "./ToogleActive";
import MySelect from "./MySelect";
import AreaEditor from "./AreaEditor";

import BalanceInput from "./BalanceInput";
import PhoneInput from "./PhoneInput";

export default {
  name: "UserForm",
  // https://ru.vuejs.org/v2/guide/components-edge-cases.html#%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9
  provide() {
    return {
      $v: this.$v
    };
  },
  components: {
    MyDropzone,
    MyCalendar,
    BirthdayPicker,
    ToogleActive,
    MySelect,
    AreaEditor,
    BalanceInput,
    PhoneInput
  },
  model: {
    prop: "userInfo"
  },
  props: {
    userInfo: {
      type: Object,
      default() {
        return {
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
        };
      }
    }
  },
  data() {
    return {};
  },
  validations() {
    return {
      userInfo: {
        // id: {},
        // isActive: {
        //   required
        // },
        balance: {
          required
          // numeric,
        },
        // picture: {
        //   required,
        //   url
        // },
        birthday: {
          required
        },
        // accessLevel: {
        //   required
        // },
        firstName: {
          required,
          // alpha, // из коробки не поддерживает русский язык
          validChars, // поэтому сделали свой валидатор
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        lastName: {
          required,
          // alpha, // из коробки не поддерживает русский язык
          validChars, // поэтому сделали свой валидатор
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        company: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(40)
        },
        email: {
          required,
          email
        },
        phone: {
          required,
          validPhone
          // numeric,
          // minLength: minLength(12)
          // maxLength: maxLength(20)
        },
        address: {
          required,
          minLength: minLength(2),
          maxLength: maxLength(80)
        },
        about: {
          // в medium-editor есть особенность, когда поле визуально пустое, оно всёровно не пустое
          // medium-editor добавляет пустую разметку "<p><br></p>", которая визуально не отображается
          // из-за этого ошибка required не подсвечивается, так как поле по факту не пустое =),
          // если зажать backspace, то можно увидеть что всё работает как надо, просто поле не пустое
          // minLength(5) тоже не отображалась, т.к разметка "<p><br></p>" уже состоит из 10 символов
          // поставил minLength(20), по идее можно вообще убрать проверки на require и minLength
          // оставить только maxLength, чтобы не спамили гигабайтами текста

          // кстате vue2-medium-editor не работает c vuelidate если указать custom-tag='textarea'
          // сделал custom-tag='div' со своими стилями .my-textarea

          // required,
          // minLength: minLength(20),
          maxLength: maxLength(5000)
        }
        // registered: {
        //   required
        // }
      }
    };
  }
};
</script>

<style scoped>
</style>

