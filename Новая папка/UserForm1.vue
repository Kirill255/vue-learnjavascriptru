<template>
  <div>

    <!-- <pre>
      oneUser
      {{value}}
    </pre>
    <input type="text"
           name=""
           id=""
           v-model="value.firstName"> -->

    <form @submit.prevent="onFormSubmit">

      <div class="form-group">
        <label for="firstName">Имя</label>
        <input type="text"
               class="form-control"
               id="firstName"
               placeholder="Введите имя"
               v-model="resultoObject.firstName">
      </div>

      <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input type="text"
               class="form-control"
               id="lastName"
               placeholder="Введите фамилию"
               v-model="resultoObject.lastName">
      </div>

      <div class="form-group">
        <label for="email">Емайл</label>
        <input type="email"
               class="form-control"
               id="email"
               placeholder="Введите емайл"
               v-model="resultoObject.email">
      </div>

      <div class="form-group">
        <label for="">URL картинки</label>
        <div v-if="!image"
             class="mb-3">
          <img src="http://via.placeholder.com/128x128"
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
        <!--  -->
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
            <input type="text"
                   id=""
                   class="form-control"
                   placeholder="http://via.placeholder.com/128x128"
                   disabled>
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="age">Возраст</label>
        <input type="number"
               class="form-control"
               id="age"
               placeholder="0"
               v-model="resultoObject.age">
      </div>

      <div class="form-group">
        <label for="">Активный</label>
        <div class="form-group form-check">
          <input type="checkbox"
                 class="form-check-input"
                 id="isActive"
                 v-model="resultoObject.isActive">
          <label class="form-check-label"
                 for="isActive">Да</label>
        </div>
      </div>

      <div class="form-group">
        <label for="accessLevel">Уровень доступа</label>
        <select class="form-control"
                id="accessLevel"
                v-model="resultoObject.accessLevel">
          <option disabled
                  value="">Выберите один из вариантов</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div class="form-group">
        <label for="balance">Баланс</label>
        <input type="text"
               class="form-control"
               id="balance"
               placeholder="Введите баланс"
               v-model="resultoObject.balance">
      </div>

      <div class="form-group">
        <label for="phone">Телефон</label>
        <input type="text"
               class="form-control"
               id="phone"
               placeholder="Введите имя"
               v-model="resultoObject.phone">
      </div>

      <div class="form-group">
        <label for="address">Адрес</label>
        <input type="text"
               class="form-control"
               id="address"
               placeholder="Введите адрес"
               v-model="resultoObject.address">
      </div>

      <div class="form-group">
        <label for="company">Компания</label>
        <input type="text"
               class="form-control"
               id="company"
               placeholder="Введите компанию"
               v-model="resultoObject.company">
      </div>

      <div class="form-group">
        <label for="about">Биография</label>
        <textarea class="form-control"
                  id="about"
                  rows="3"
                  placeholder="Напишите о себе"
                  v-model.trim="resultoObject.about">
        </textarea>
      </div>

      <div class="form-group row">
        <label for="registered"
               class="col-sm-12 col-form-label">Дата регистрации</label>
        <div class="col-sm-12">
          <input class="form-control"
                 type="date"
                 value="2011-08-19"
                 id="registered"
                 v-model="resultoObject.registered">
        </div>
      </div>

      <div>
        <pre>
{{ resultoObject }}
        </pre>
      </div>

      <button type="submit"
              class="btn btn-primary">Создатьпользователя</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "UserForm",
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      resultoObject: {},
      image: ""
    };
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
      this.$set(this.resultoObject, "imageUpload", file.name);
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
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function(e) {
      this.$delete(this.resultoObject, "imageUpload");
      this.image = "";
    },
    // -------------------
    onFormSubmit() {
      console.log("submit: ", JSON.stringify(this.resultoObject, null, 4));
      // очищаем resultoObject после отправки, просто присваиваем новый пустой объект
      this.$set(this, "resultoObject", {});
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
