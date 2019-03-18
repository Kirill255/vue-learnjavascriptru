<template>
  <div>
    <div class="form-group"
         :class="{ 'has-error': $v.userInfo.balance.$error }">
      <label for="balance">Баланс *</label>

      <masked-input id="balance"
                    type="text"
                    name="balance"
                    class="form-control"
                    :value="balance"
                    @input="onInputValue"
                    :mask="numberMask"
                    :guide="false"
                    placeholder="$1,999.99"
                    placeholderChar="#">
      </masked-input>

      <div v-if="$v.userInfo.balance.$error">

        <div class="p-2 text-danger"
             v-if="!$v.userInfo.balance.required">
          <small>Field is required.</small>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import MaskedInput from "vue-text-mask";
import createNumberMask from "text-mask-addons/dist/createNumberMask";

export default {
  name: "BalanceInput",
  components: { MaskedInput },
  inject: ["$v"],
  model: {
    prop: "balance"
  },
  props: {
    balance: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      numberMask: createNumberMask({
        allowDecimal: true,
        integerLimit: 9
      })
    };
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
