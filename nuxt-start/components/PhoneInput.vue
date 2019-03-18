<template>
  <div>
    <div class="form-group"
         :class="{ 'has-error': $v.userInfo.phone.$error }">
      <label for="phone">Телефон *</label>

      <masked-input id="phone"
                    type="text"
                    name="phone"
                    class="form-control"
                    :value="phone"
                    @input="onInputValue"
                    :mask="['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]"
                    :guide="true"
                    placeholder="+7 (999) 123-4567"
                    placeholderChar="_">
      </masked-input>

      <div v-if="$v.userInfo.phone.$error">

        <div class="p-2 text-danger"
             v-if="!$v.userInfo.phone.required">
          <small>Field is required.</small>
        </div>
        <div class="p-2 text-danger"
             v-if="!$v.userInfo.phone.validPhone">
          <small>Phone must be a valid phone number.</small>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import MaskedInput from "vue-text-mask";

export default {
  name: "PhoneInput",
  components: { MaskedInput },
  inject: ["$v"],
  model: {
    prop: "phone"
  },
  props: {
    phone: {
      type: String,
      default: ""
    }
  },
  methods: {
    onInputValue(value) {
      // console.log("value :", value);
      this.$emit("input", value);
    }
  }
};
</script>

<style scoped>
</style>
