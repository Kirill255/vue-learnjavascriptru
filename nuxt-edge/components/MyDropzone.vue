<template>
  <div>
    <div class="form-group">

      <label for="">URL картинки</label>

      <div class="form-row mb-3">
        <div class="col-sm-2">
          <div>
            <img :src="srcImg"
                 alt=""
                 style="height: 140px; width: 140px;"
                 class="img-thumbnail">
          </div>
        </div>

        <div class="col-sm-10">
          <div>
            <div ref="myImageZone"
                 class="dropzone">
            </div>
          </div>
        </div>
      </div>

      <!--  -->
      <div class="form-row">
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
import axios from "axios";
// import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

if (process.browser) {
  var Dropzone = require("dropzone");
  Dropzone.autoDiscover = false;
}

// https://www.dropzonejs.com/#configuration
// Dropzone.autoDiscover = false;

export default {
  name: "MyDropzone",
  model: {
    prop: "srcImg"
  },
  props: {
    srcImg: {
      type: String,
      default() {
        return "http://via.placeholder.com/140x140";
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
      this.$refs.fileInput.click();
    },
    uploadImage() {
      // Мы будем загружать картинки на сторонний сервис https://imgur.com/, загружаем туда картинку и потом берём на неё ссылку
      // console.log("fileInput :", this.$refs.fileInput.files);
      let data = new FormData();
      data.append("image", this.$refs.fileInput.files[0]);

      // https://api.imgur.com/
      // https://api.imgur.com/endpoints/image
      // https://apidocs.imgur.com/#authorization-and-oauth

      // get https://api.imgur.com/3/image/{id}
      // post https://api.imgur.com/3/image

      let imgurURL = "https://api.imgur.com/3/image";

      let config = {
        headers: {
          Authorization: "Client-ID 703424f37a8e1a8"
        }
      };

      // this.$http.post(imgurURL, data, config).then(
      //   response => {
      //     // get body data
      //     // console.log("responseImage: ", response); //response.body;
      //     this.$emit("input", response.body.data.link);
      //     this.$refs.fileInput.value = "";
      //   },
      //   error => {
      //     // error callback
      //     console.log("error: ", error);
      //   }
      // );

      axios
        .post(imgurURL, data, config)
        .then(response => response.data)
        .then(response => {
          this.$emit("input", response.data.link);
          this.$refs.fileInput.value = "";
        });
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
      // это событие вроде не обязательное, оно автоматически прослушивается, файл сам добавляется в formData и отправляется
      // тоесть его можно не прописывать явно, оно нужно если надо модифицировать данные например добаить CSRF-токен
      // https://www.dropzonejs.com/#event-sending
      // sending: (file, xhr, formData) => {
      //   formData.append("image", file);
      // },
      success: (file, response) => {
        // console.log("response :", response);
        this.$emit("input", response.data.link);
        this.$refs.fileInput.value = "";
      },
      error: (file, errorMessage, xhr) => {
        console.log("error-errorMessage :", errorMessage);
        console.log("error-xhr :", xhr);
      },
      complete: () => {
        this.dz.removeAllFiles();
      }
    });

    // // можно ещё навесить события вот таким образом, а не в хуках инициализации
    // this.dz.on("sending", (file, xhr, formData) => {
    //   formData.append("image", file);
    // });

    // this.dz.on("success", (file, res) => {
    //   this.$emit("input", res.data.link);
    // });

    // this.dz.on("error", (file, errorMessage, xhr) => {
    //   console.log("error-errorMessage :", errorMessage);
    //   console.log("error-xhr :", xhr);
    // });

    // this.dz.on("complete", () => {
    //   this.dz.removeAllFiles();
    // });
  },
  beforeDestroy() {
    this.dz.disable();
  }
};
</script>

<style scoped>
</style>


/*
note1: некоторые подробности с комментариями можно посмотреть в AvatarUploader.vue

note2: мы работаем через v-model, это значит что родитель подписался на событие "input", а ребёнок принимает пропс "value",
во vue есть возможность переопределить эти названия при помощи поля model https://ru.vuejs.org/v2/guide/components-custom-events.html#%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-v-model-%D1%83-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0
*/
