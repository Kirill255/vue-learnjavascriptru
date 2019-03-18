<template>
  <div>
    <div class="form-group">
      <label for="">Активный</label>
      <div class="form-group form-check">
        <toggle-button id="isActive"
                       class="form-check-input"
                       :value="activeVal"
                       :sync="true"
                       :labels="true"
                       @change="onChange"></toggle-button>
      </div>
    </div>
  </div>
</template>

<script>
// import ToggleButton from "vue-js-toggle-button";
import ToggleButton from "vue-js-toggle-button/src/Button";

export default {
  name: "ToogleActive",
  components: { ToggleButton },
  model: {
    prop: "activeVal"
  },
  props: {
    activeVal: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onChange(e) {
      // console.log("e :", e);
      this.$emit("input", e.value);
    }
  }
};
</script>

<style scoped>
.vue-js-switch#isActive {
  font-size: 16px;
}
</style>
