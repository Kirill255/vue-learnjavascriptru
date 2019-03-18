<template>
  <div>
    <div class="form-group row">
      <div class="col-sm-2">
        <select class="form-control"
                id="selectQuantity"
                :value="selectedValue"
                @change="onSelectChange">
          <option v-for="(option, i) in selectOptions"
                  :key="i"
                  :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <label for="selectQuantity"
             class="col-sm-10 col-form-label">Выбрано элементов на страницу: {{ selectedValue }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectPerPage",
  model: {
    prop: "selectedValue"
  },
  props: {
    selectedValue: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      selectOptions: [
        { text: "2", value: 2 },
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "100", value: 100 }
      ]
    };
  },
  methods: {
    onSelectChange(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style scoped>
</style>
