<template>
  <div>
    <div class="form-group">
      <label for="">Активный</label>
      <div class="form-group form-check">

        <no-ssr>

          <toggle-button id="isActive"
                         class="form-check-input"
                         :value="activeVal"
                         :sync="true"
                         :labels="labels"
                         @change="onChange">
          </toggle-button>

        </no-ssr>

      </div>
    </div>
  </div>
</template>

<script>
// import ToggleButton from "vue-js-toggle-button";
// import ToggleButton from "vue-js-toggle-button/src/Button";

// подключил как ssr(nuxt) https://github.com/euvl/vue-js-toggle-button#ssr

export default {
  name: "ToogleActive",
  // components: { ToggleButton },
  model: {
    prop: "activeVal"
  },
  props: {
    activeVal: {
      type: Boolean
    }
  },
  data() {
    return {
      labels: {
        checked: "<i class='fas fa-check'></i>",
        unchecked: "<i class='fas fa-times'></i>"
      }
    };
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

<style lang="scss">
$margin: 3px;
.vue-js-switch {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  user-select: none;
  font-size: 10px;
  cursor: pointer;
  .v-switch-input {
    display: none;
  }
  .v-switch-label {
    position: absolute;
    top: 0;
    font-weight: 600;
    color: white;
    &.v-left {
      left: 10px;
    }
    &.v-right {
      right: 10px;
    }
  }
  .v-switch-core {
    display: block;
    position: relative;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: border-color 0.3s, background-color 0.3s;
    user-select: none;
    .v-switch-button {
      display: block;
      position: absolute;
      overflow: hidden;
      top: 0;
      left: 0;
      transform: translate3d($margin, $margin, 0);
      border-radius: 100%;
      background-color: #fff;
    }
  }
  &.disabled {
    pointer-events: none;
    opacity: 0.6;
  }
}
</style>
