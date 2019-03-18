<template>
  <div>
    <div class="form-group row">
      <label for="registered"
             class="col-sm-12 col-form-label">Дата регистрации</label>
      <div class="col-sm-12">
        <input class="form-control"
               type="date"
               id="registered"
               ref="dateInput"
               :value="dateRegistered">
      </div>
    </div>
  </div>
</template>

<script>
// import flatpickr from "flatpickr";
if (process.browser) {
  var flatpickr = require("flatpickr");
  var { Russian } = require("flatpickr/dist/l10n/ru.js");
}
// import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_green.css";
// import { Russian } from "flatpickr/dist/l10n/ru.js";

export default {
  name: "MyCalendar",
  model: {
    prop: "dateRegistered"
  },
  props: {
    dateRegistered: {
      type: String,
      default() {
        // https://acdcjunior.github.io/how-bind-date-object-to-input-date-vue.js-v-model.html
        return new Date().toISOString().split("T")[0]; // это new Date() => "2018-07-22T16:26:38.744Z", а нам нужно только "2018-07-22"
      }
    }
  },
  data() {
    return {
      // это будет просто ссылка на проинициализированный плагин
      fp: null
    };
  },
  computed: {},
  methods: {},
  watch: {
    dateRegistered: function(newVal, oldVal) {
      console.log("Calender newVal :", newVal);
      this.fp.setDate(newVal);
    }
  },
  mounted() {
    // обычно этого хватает
    // flatpickr(this.$refs.dateInput, {
    //   locale: Russian,
    //   altInput: true,
    //   altFormat: "Y-m-d",
    //   dateFormat: "Y-m-d",
    //   onChange: (selectedDates, dateStr) => {
    //     this.$emit("input", dateStr);
    //   }
    // });
    // но некоторые плагины криво отрабатывают и не изменяют переданное значение при его изменении
    // поэтому это нужно сделать вручную, поставить вотчер на пропсы, и при изменении пропсов обновить пикер
    this.fp = flatpickr(this.$refs.dateInput, {
      locale: Russian,
      // altInput: true,
      // altFormat: "Y-m-d",
      dateFormat: "Y-m-d",
      onChange: (selectedDates, dateStr) => {
        this.$emit("input", dateStr);
      }
    });
  },
  beforeDestroy() {
    this.fp.destroy();
  }
};
</script>

<style scoped>
</style>
