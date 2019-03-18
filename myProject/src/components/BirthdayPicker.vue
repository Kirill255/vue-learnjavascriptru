<template>
  <div>
    <div class="form-group row"
         :class="{ 'has-error': $v.userInfo.birthday.$error }">
      <label for="birthday"
             class="col-sm-12 col-form-label">День рождения *</label>
      <div class="col-sm-12">
        <!-- <input class="form-control"
               type="date"
               id="birthday"
               ref="birthdayInput"
               :value="birthdayDate"> -->
        <!-- Важно! Инпут для этого плагина должен быть type="text", а не "date" -->
        <!-- Иначе формат не применяется -->
        <input class="form-control"
               type="text"
               id="birthday"
               ref="birthdayInput"
               :value="birthdayDate"
               readonly>

        <!-- Валидация не имеет отношения к плагину bootstrap-datepicker -->

        <div v-if="$v.userInfo.birthday.$error">

          <div class="p-2 text-danger"
               v-if="!$v.userInfo.birthday.required">
            <small>Field is required.</small>
          </div>

        </div>
        <!--  -->

      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
// тут впринципе не нужна переменная --> import bootstrap-datepicker from "bootstrap-datepicker";
// так как спецефичная для jquery-плагинов форма обращения --> $('#myinput').datepicker({});
import "bootstrap-datepicker";
// что-то с локализацией плагин перестаёт работать вообще, а должен работать!
// import "bootstrap-datepicker/dist/locales/bootstrap-datepicker.ru.min.js";

// поэтому я вручную прописал настройки локализации и засунул их в хук created()
// https://bootstrap-datepicker.readthedocs.io/en/latest/i18n.html
// https://github.com/smalot/bootstrap-datetimepicker/blob/master/js/locales/bootstrap-datetimepicker.ru.js

// какой больше нарвится стиль? bootstrap3 или style without bootstrap ? оба прикольные
// import "bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css"; // bootstrap2 legacy style
import "bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css"; // bootstrap3
// import "bootstrap-datepicker/dist/css/bootstrap-datepicker3.standalone.min.css"; // style without bootstrap

export default {
  name: "BirthdayPicker",
  inject: ["$v"],
  model: {
    prop: "birthdayDate"
  },
  props: {
    birthdayDate: {
      type: String
    }
  },
  created() {
    $.fn.datepicker.dates["ru"] = {
      days: [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
        "Воскресенье"
      ],
      daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
      daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      monthsShort: [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Май",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек"
      ],
      today: "Сегодня",
      suffix: [],
      meridiem: []
    };
  },
  watch: {
    birthdayDate: function(newVal, oldVal) {
      console.log("Birthday newVal :", newVal);
      // вроде все варианты работают, не знаю пока в чём разница
      // $("#birthday").datepicker("update");
      $("#birthday").datepicker("update", newVal);
      // $("#birthday").datepicker("setDate", newVal);
    }
  },
  mounted() {
    // console.log("111 :", this.$refs.birthdayInput.value);
    // console.log("222 :", document.querySelector("#birthday").value);
    // console.log("333 :", $("#birthday").val());

    $("#birthday")
      .datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        weekStart: 1,
        // daysOfWeekHighlighted: "0,6", // подсвечивает дни недели 0 и 6 --> сб. и вс., ну вроде смотрится норм.
        todayHighlight: true,
        language: "ru",
        endDate: "0d"
      })
      .on("changeDate", e => {
        // `e` here contains the extra attributes
        this.$emit("input", e.target.value);
      });
  },
  beforeDestroy() {
    $("#birthday").datepicker("destroy");
  }
};
</script>

<style scoped>
</style>

/*
BirthdayPicker и MyCalendar это компоненты с выбором даты, по сути просто input[type="date"], но я для практики пробую подключать
плагины datepicker'ы, и для практики решил подключить разные, попробовать сдесь bootstrap-datepicker(jquery плагин), а там был flatpickr(чисто js плагин)
*/
