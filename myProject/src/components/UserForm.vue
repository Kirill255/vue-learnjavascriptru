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

      <!-- My new DropZone Uploader -->
      <my-dropzone v-model="userInfo.picture"></my-dropzone>
      <!--  -->

      <!-- My old version -->
      <!-- <avatar-uploader v-model="userInfo.picture"></avatar-uploader> -->
      <!--  -->

      <!-- ============================================================== -->

      <!-- <div class="form-group">
        <label for="age">Возраст</label>
        <input type="number"
               class="form-control"
               id="age"
               placeholder="0"
               v-model="userInfo.age">
      </div> -->

      <!--  -->
      <!-- <birthday-picker v-model="userInfo.birthday"></birthday-picker> -->
      <birthday-picker v-model.trim="$v.userInfo.birthday.$model"></birthday-picker>
      <!--  -->

      <!-- ================================================================= -->

      <!-- <div class="form-group">
        <label for="">Активный</label>
        <div class="form-group form-check">
          <input type="checkbox"
                 class="form-check-input"
                 id="isActive"
                 v-model="userInfo.isActive">
          <label class="form-check-label"
                 for="isActive">Да</label>
        </div>
      </div> -->

      <!--  -->
      <toogle-active v-model="userInfo.isActive"></toogle-active>
      <!--  -->

      <!-- ================================================================= -->

      <!-- <div class="form-group">
        <label for="accessLevel">Уровень доступа</label>
        <select class="form-control"
                id="accessLevel"
                v-model="userInfo.accessLevel">
          <option disabled
                  value="">Выберите один из вариантов</option>
          <option>guest</option>
          <option>user</option>
          <option>admin</option>
        </select>
      </div> -->

      <!--  -->
      <my-select v-model="userInfo.accessLevel"></my-select>
      <!--  -->

      <!-- ================================================================= -->

      <!-- <div class="form-group"
           :class="{ 'has-error': $v.userInfo.balance.$error }">
        <label for="balance">Баланс *</label>
        <input type="text"
               class="form-control"
               id="balance"
               placeholder="Введите баланс"
               v-model.trim="$v.userInfo.balance.$model">

        <div v-if="$v.userInfo.balance.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.balance.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.balance.numeric">
            <small>Accepts only numerics.</small>
          </div>

        </div>

      </div> -->

      <!--  -->
      <balance-input v-model.trim="$v.userInfo.balance.$model"></balance-input>
      <!--  -->

      <!-- ================================================================= -->

      <!-- <div class="form-group"
           :class="{ 'has-error': $v.userInfo.phone.$error }">
        <label for="phone">Телефон *</label>
        <input type="text"
               class="form-control"
               id="phone"
               placeholder="Введите телефон"
               v-model.trim="$v.userInfo.phone.$model">

        <div v-if="$v.userInfo.phone.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.phone.required">
            <small>Field is required.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.phone.validPhone">
            <small>Phone must be a valid phone number.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.phone.minLength">
            <small>Phone must have at least {{$v.userInfo.phone.$params.minLength.min}} digits.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.phone.maxLength">
            <small>Phone must have at most {{$v.userInfo.phone.$params.maxLength.max}} digits.</small>
          </div>
          <div class="p-2 text-danger"
               v-if="!$v.userInfo.phone.numeric">
            <small>Accepts only numerics.</small>
          </div>

        </div>

      </div> -->

      <!--  -->
      <phone-input v-model.trim="$v.userInfo.phone.$model"></phone-input>
      <!--  -->

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

      <!-- <div class="form-group">
        <label for="about">Биография</label>
        <textarea class="form-control"
                  id="about"
                  rows="3"
                  placeholder="Напишите о себе"
                  v-model.trim="userInfo.about">
        </textarea>
      </div> -->

      <!--  -->
      <!-- <area-editor v-model="userInfo.about"></area-editor> -->
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

      <!-- <div class="form-group row">
        <label for="registered"
               class="col-sm-12 col-form-label">Дата регистрации</label>
        <div class="col-sm-12">
          <input class="form-control"
                 type="date"
                 id="registered"
                 v-model="userInfo.registered">
        </div>
      </div> -->

      <!--  -->
      <my-calendar v-model="userInfo.registered"></my-calendar>
      <!--  -->

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
import { validChars } from "../services/myValidators/validChars.js";
import { validPhone } from "../services/myValidators/validPhone.js";

// можно подключать синхронно или асинхронно, но у меня были проблемы с асинхронным подключением
// в проессе разработки иногда компоненты не успевали подгружаться и стили не применялись

// const AvatarUploader = () => import("./AvatarUploader"); // переписал компонент uploader на MyDropzone
// const MyDropzone = () => import("./MyDropzone"); // и теперь использую его
// const MyCalendar = () => import("./MyCalendar");
// const BirthdayPicker = () => import("./BirthdayPicker");
// const ToogleActive = () => import("./ToogleActive");
// const MySelect = () => import("./MySelect");
// const AreaEditor = () => import("./AreaEditor");

// import AvatarUploader from "./AvatarUploader"; // переписал компонент uploader на MyDropzone
import MyDropzone from "./MyDropzone"; // и теперь использую его
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
    // AvatarUploader, // переписал компонент uploader на MyDropzone
    MyDropzone, // и теперь использую его
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
      type: Object
    }
  },
  data() {
    return {
      // это временный объект для отладки, теперь userInfo приходит к нам через props
      // userInfo: {
      //   id: "",
      //   isActive: "",
      //   balance: "",
      //   picture: "",
      //   birthday: "",
      //   accessLevel: "",
      //   firstName: "",
      //   lastName: "",
      //   company: "",
      //   email: "",
      //   phone: "",
      //   address: "",
      //   about: "",
      //   registered: ""
      // },
      // timer: null
    };
  },
  // нам нужна динамическая валидация, которая должна быть функцией, хотя может и нет, вроде и так работает
  // validations: {
  //   userInfo: {
  //     // id: {},
  //     // isActive: {
  //     //   required
  //     // },
  //     balance: {
  //       required,
  //       numeric
  //     },
  //     // picture: {
  //     //   required,
  //     //   url
  //     // },
  //     // birthday: {
  //     //   required
  //     // },
  //     // accessLevel: {
  //     //   required
  //     // },
  //     firstName: {
  //       required,
  //       alpha,
  //       minLength: minLength(2),
  //       maxLength: maxLength(40)
  //     },
  //     lastName: {
  //       required,
  //       alpha,
  //       minLength: minLength(2),
  //       maxLength: maxLength(40)
  //     },
  //     company: {
  //       required,
  //       minLength: minLength(2),
  //       maxLength: maxLength(40)
  //     },
  //     email: {
  //       required,
  //       email
  //     },
  //     phone: {
  //       required,
  //       numeric,
  //       minLength: minLength(6),
  //       maxLength: maxLength(20)
  //     },
  //     address: {
  //       required,
  //       minLength: minLength(2),
  //       maxLength: maxLength(80)
  //     }
  //     // about: {
  //     //   required,
  //     //   minLength: minLength(2),
  //     //   maxLength: maxLength(5000)
  //     // }
  //     // registered: {
  //     //   required
  //     // }
  //   }
  // },
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
  },
  watch: {
    // $v: {
    //   handler(val) {
    //     // console.log("val :", val);
    //     // console.log("val.$invalid :", val.$invalid);
    //     // console.log("this.$v.userInfo.firstName :", this.$v.userInfo.firstName);
    //     // console.log("this.$v.userInfo.about :", this.$v.userInfo.about);
    //   },
    //   deep: true
    // },
    // ready(val) {
    //   this.$emit("ready", val);
    // }
  },
  computed: {
    // // https://github.com/monterail/vuelidate/issues/333
    // ready() {
    //   return !this.$v.$invalid;
    // }
  },
  methods: {
    // touch() {
    //   this.$v.$touch();
    //   console.log("this.$v :", this.$v);
    // },
    // setName(val) {
    //   this.userInfo.about = val;
    //   this.$v.userInfo.about.$touch();
    // }
  }
  // // update: костыль больше не нужен, я переделал проверку, проверка теперь по клику на кнопку
  // mounted() {
  //   // сделал костыль для того чтобы через какое-то время (1м), провалидировались все поля
  //   // и на всех незаполненных, но обязательных полях вывалились подсказки с ошибками
  //   this.timer = setTimeout(() => {
  //     this.$v.$touch();
  //   }, 60000);
  // },
  // beforeDestroy() {
  //   clearTimeout(this.timer);
  // }
};
</script>

<style scoped>
</style>



/*
note: размер заглушки и картинок нужно подстраивать, чтобы были одинаковые, незнаю в чём проблема
на данный момент подстроил:
у картинок поставил размер на 10px больше тоесть 138px, а у заглушки размеры 128px
update: вроде починил
update2: вроде снова всё сломал =)
*/
