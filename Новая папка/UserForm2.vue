<template>
  <div>

    <form @submit.prevent="onFormSubmit">

      <div class="form-group">
        <label for="firstName">Имя</label>
        <input type="text"
               class="form-control"
               id="firstName"
               placeholder="Введите имя"
               v-model="value.firstName">
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input type="text"
               class="form-control"
               id="lastName"
               placeholder="Введите фамилию"
               v-model="value.lastName">
      </div>

      <div class="form-group">
        <label for="email">Емайл</label>
        <input type="email"
               class="form-control"
               id="email"
               placeholder="Введите емайл"
               v-model="value.email">
      </div>

      <!--  -->
      <avatar-uploader :src-img="value.picture"></avatar-uploader>
      <!--  -->

      <!-- Image Uploader -->
      <div class="form-group">
        <label for="">URL картинки</label>
        <div v-if="!image"
             class="mb-3">
          <img :src="imageSrc"
               alt=""
               class="img-thumbnail">
        </div>
        <div v-else
             class="mb-3">
          <img :src="image"
               class="img-thumbnail"
               style="height: 138px; width: 138px;">
          <button type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeImage">X</button>
        </div>
        <!-- Это для стилизации кнопки "Загрузить", сама кнопка скрывается и стилизуется label -->
        <div class="form-group row">
          <div class="col-sm-2">
            <label for="imageUpload"
                   class="btn btn-outline-primary">Выбрать новую</label>
            <input type="file"
                   id="imageUpload"
                   class="form-control-file"
                   accept="image/*"
                   style="display: none"
                   @change="onFileChange">
          </div>
          <div class="col-sm-10">
            <input v-if="!image"
                   type="text"
                   id=""
                   class="form-control"
                   :placeholder="imageSrc"
                   disabled>
            <input v-else
                   type="text"
                   id=""
                   class="form-control"
                   :placeholder="image"
                   disabled>
          </div>
        </div>
      </div>
      <!-- End Image Uploader -->

      <div class="form-group">
        <label for="age">Возраст</label>
        <input type="number"
               class="form-control"
               id="age"
               placeholder="0"
               v-model="value.age">
      </div>

      <div class="form-group">
        <label for="">Активный</label>
        <div class="form-group form-check">
          <input type="checkbox"
                 class="form-check-input"
                 id="isActive"
                 v-model="value.isActive">
          <label class="form-check-label"
                 for="isActive">Да</label>
        </div>
      </div>

      <div class="form-group">
        <label for="accessLevel">Уровень доступа</label>
        <select class="form-control"
                id="accessLevel"
                v-model="value.accessLevel">
          <option disabled
                  value="">Выберите один из вариантов</option>
          <option>guest</option>
          <option>user</option>
          <option>admin</option>
        </select>
      </div>

      <div class="form-group">
        <label for="balance">Баланс</label>
        <input type="text"
               class="form-control"
               id="balance"
               placeholder="Введите баланс"
               v-model="value.balance">
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <input type="text"
               class="form-control"
               id="phone"
               placeholder="Введите имя"
               v-model="value.phone">
      </div>

      <div class="form-group">
        <label for="address">Адрес</label>
        <input type="text"
               class="form-control"
               id="address"
               placeholder="Введите адрес"
               v-model="value.address">
      </div>

      <div class="form-group">
        <label for="company">Компания</label>
        <input type="text"
               class="form-control"
               id="company"
               placeholder="Введите компанию"
               v-model="value.company">
      </div>

      <div class="form-group">
        <label for="about">Биография</label>
        <textarea class="form-control"
                  id="about"
                  rows="3"
                  placeholder="Напишите о себе"
                  v-model.trim="value.about">
        </textarea>
      </div>

      <div class="form-group row">
        <label for="registered"
               class="col-sm-12 col-form-label">Дата регистрации</label>
        <div class="col-sm-12">
          <input class="form-control"
                 type="date"
                 id="registered"
                 v-model="value.registered">
        </div>
      </div>

      <div>
        <pre>
{{ value }}
        </pre>
      </div>

      <button type="submit"
              class="btn btn-primary">Создатьпользователя</button>
    </form>

  </div>
</template>

<script>
const AvatarUploader = () => import("./AvatarUploader");

export default {
  name: "UserForm",
  components: { AvatarUploader },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      // resultoObject: {},
      image: ""
    };
  },
  computed: {
    // при загрузке объекта с инфой о пользователе, если у него есть картинка, то вставить её, иначе заглушку
    imageSrc() {
      let imageSrc = "";
      if (this.value.picture) {
        imageSrc = this.value.picture;
      } else {
        imageSrc = "http://via.placeholder.com/128x128";
      }
      return imageSrc;
    }
  },
  methods: {
    // методы для загрузки/удаления картинки
    onFileChange(event) {
      // https://codepen.io/Atinux/pen/qOvawK/?editors=0010

      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) {
        return;
      }
      let file = files[0];

      // this.resultoObject.imageUpload = event.target.files[0].name; // R - реактивность =)
      this.$set(this.value, "imageUpload", file.name);
      console.log("event :", event);
      console.log("target :", event.target.files[0]);
      console.log("name :", event.target.files[0].name);

      this.createImage(file);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      let vm = this;

      reader.onload = e => {
        // console.log(e.target);
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.$delete(this.value, "imageUpload");
      this.image = "";
    },
    // -------------------
    onFormSubmit() {
      console.log("submit: ", JSON.stringify(this.value, null, 4));
      // очищаем resultoObject после отправки, просто присваиваем новый пустой объект
      // this.$set(this, "value", {});
      // this.value = {};
    }
  }
};
</script>

<style scoped>
</style>



/*
note: размер заглушки и картинок нужно подстраивать, чтобы были одинаковые, незнаю в чём проблема
на данный момент подстроил:
у картинок поставил размер на 10px больше тоесть 138px, а у заглушки размеры 128px
*/
