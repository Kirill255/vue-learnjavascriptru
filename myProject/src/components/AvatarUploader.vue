<template>
  <div ref="myImageZone">
    <div class="form-group">
      <label for="">URL картинки</label>
      <div class="mb-3">
        <img :src="srcImg"
             alt=""
             style="height: 128px; width: 128px;"
             class="img-thumbnail">
      </div>

      <!--  -->
      <div class="form-group row">
        <div class="col-sm-2">
          <input class="d-none"
                 type="file"
                 accept="image/*"
                 name=""
                 id=""
                 ref="fileInput"
                 @change="uploadImage">
          <button type="button"
                  class="btn btn-outline-primary"
                  @click="selectImage">Выбрать новую</button>
        </div>
        <div class="col-sm-10">
          <input type="text"
                 class="form-control"
                 id=""
                 placeholder=""
                 :value="srcImg"
                 readonly>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

export default {
  name: "AvatarUploader",
  model: {
    prop: "srcImg"
  },
  props: {
    srcImg: {
      type: String,
      default() {
        return "http://via.placeholder.com/128x128";
      }
    }
  },
  data() {
    return {
      dz: null
    };
  },
  methods: {
    selectImage() {
      // имитируем нажатие по нашему скрытому инпуту type="file"
      this.$refs.fileInput.click();
    },
    uploadImage() {
      // Мы будем загружать картинки на сторонний сервис https://imgur.com/, загружаем туда картинку и потом берём на неё ссылку
      // console.log("fileInput :", this.$refs.fileInput.files);
      let data = new FormData();
      // не знаю почему, но важно чтобы поле называлось именно "image"
      // я пробовал свои названия(по идее это же мы задаём название поля), например "myImage", но тогда не работает
      data.append("image", this.$refs.fileInput.files[0]);

      // https://api.imgur.com/
      // https://api.imgur.com/endpoints/image
      // https://apidocs.imgur.com/#c85c9dfc-7487-4de2-9ecd-66f727cf3139
      // https://apidocs.imgur.com/#authorization-and-oauth
      // https://api.imgur.com/oauth2/addclient
      // Client ID: 703424f37a8e1a8
      // Client secret: f5709a4c4540334773de458b97589593512ef42e
      // Authorization: Client-ID YOUR_CLIENT_ID

      // get https://api.imgur.com/3/image/{id}
      // post https://api.imgur.com/3/image
      let imgurURL = "https://api.imgur.com/3/image";

      let config = {
        headers: {
          Authorization: "Client-ID 703424f37a8e1a8"
        }
      };

      this.$http.post(imgurURL, data, config).then(
        response => {
          // get body data
          console.log("responseImage: ", response); //response.body;
          // this.srcImg = response.body.data.link; // берём ссылку на картинку
          // this.$refs.fileInput.value = ""; // очищаем инпут
          // нельзя мутировать пропсы из ребёнка, поэтому кидаем наверх событие input (т.к. у нас v-model)
          this.$emit("input", response.body.data.link);
          this.$refs.fileInput.value = "";
        },
        error => {
          // error callback
          console.log("error: ", error);
        }
      );
    }
  },
  mounted() {
    this.dz = new Dropzone(this.$refs.myImageZone, {
      url: "https://api.imgur.com/3/image",
      method: "post",
      paramName: "image",
      acceptedFiles: "image/*",
      headers: {
        "Cache-Control": null,
        "X-Requested-With": null,
        Authorization: "Client-ID 703424f37a8e1a8"
      },
      createImageThumbnails: false,
      previewTemplate: '<div style="display:none"></div>',
      success: (file, response) => {
        // console.log("response :", response);
        this.$emit("input", response.data.link);
        this.$refs.fileInput.value = "";
      },
      error: (file, errorMessage, xhr) => {
        console.log("error-errorMessage :", errorMessage);
        console.log("error-xhr :", xhr);
      }
    });
  },
  beforeDestroy() {
    this.dz.disable();
  }
};
</script>

<style scoped>
</style>


/*
note1: вместо этого компонента теперь используется компонент MyDropzone.vue

note2: мы работаем через v-model, это значит что родитель подписался на событие "input", а ребёнок принимает пропс "value",
во vue есть возможность переопределить эти названия при помощи поля model https://ru.vuejs.org/v2/guide/components-custom-events.html#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-v-model-%D1%83-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0
*/
