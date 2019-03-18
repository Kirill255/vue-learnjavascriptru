<template>
  <div>
    <div class="form-group"
         :class="{ 'has-error': $v.userInfo.about.$error }">
      <label for="">Биография</label>

      <medium-editor class="form-control my-textarea"
                     :text='aboutText'
                     :options='options'
                     custom-tag='div'
                     v-on:edit='applyTextEdit'></medium-editor>

      <!--  -->
      <div v-if="$v.userInfo.about.$error">

        <div class="p-2 text-danger"
             v-if="!$v.userInfo.about.maxLength">
          <small>About must have at most {{$v.userInfo.about.$params.maxLength.max}} characters.</small>
        </div>

      </div>
      <!--  -->
    </div>

  </div>
</template>

<script>
// из vue2-medium-editor
import MediumEditor from "vue2-medium-editor";

// из medium-editor, к сожалению vue2-medium-editor идёт без стилей, поэтому нужно также установить medium-editor
import "medium-editor/dist/css/medium-editor.min.css";
// import "medium-editor/dist/css/themes/default.min.css";
import "medium-editor/dist/css/themes/roman.min.css";
// import "medium-editor/dist/css/themes/beagle.min.css";

export default {
  name: "AreaEditor",
  components: { MediumEditor },
  // https://ru.vuejs.org/v2/guide/components-edge-cases.html#%D0%92%D0%BD%D0%B5%D0%B4%D1%80%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B5%D0%B9
  inject: ["$v"],
  model: {
    prop: "aboutText"
  },
  props: {
    aboutText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      editor: null,
      options: {
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "h1",
            "h2",
            "h3",
            "anchor",
            "quote",
            "pre",
            "orderedlist",
            "unorderedlist",
            "indent",
            "outdent",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "removeFormat"
          ],
          diffLeft: 80,
          diffTop: -20
        },
        buttonLabels: "fontawesome",
        disableDoubleReturn: true,
        disableExtraSpaces: true,
        targetBlank: true,
        placeholder: {
          text: "Напишите о себе",
          hideOnClick: false
        },
        paste: {
          forcePlainText: false,
          cleanPastedHTML: true
        }
      }
    };
  },
  methods: {
    applyTextEdit(operation) {
      // console.log("operation :", operation);
      this.$emit("input", operation.api.origElements.innerHTML);
      // or
      // this.$emit("input", operation.event.target.innerHTML);
    }
  }
};
</script>

<style scoped>
.my-textarea {
  min-height: 150px;
  overflow-y: auto;
}
</style>

/*
vue2-medium-editor не работает c vuelidate если указать custom-tag='textarea'
сделал custom-tag='div' со своими стилями .my-textarea
*/
