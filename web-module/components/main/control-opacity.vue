<template>
  <div class="control-opacity">
    <div class="row1">
      透明度： <b>{{ config.opacity }}</b>
    </div>
    <div class="touch-range-bar">
      <input
        type="range"
        v-model="config.opacity"
        max="1"
        min="0"
        step="0.05"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ConfigType, MainState } from '../../store/main';
export default Vue.extend({
  computed: {
    state(): MainState {
      return this.$store.state.main;
    },
    config(): ConfigType {
      return this.$store.state.main.config;
    }
  }
});
</script>

<style lang="scss">
.control-opacity {
  margin: 6px 10px;
  text-align: center;
  user-select: none;
  font-size: 13px;
  > .row1 {
    color: #0008;
    > b {
      color: #000;
      display: inline-block;
      min-width: 2em;
    }
  }
  > .touch-range-bar {
    > input {
      width: 180px;
    }
  }
}
</style>
