<template>
  <div class="main-page">
    <main-panel />
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import MainPanel from '../components/main/main-panel.vue';
import { ConfigType, MainState } from '../store/main';
import { getIpcRenderer } from '../utils/get-ipc-renderer';

const ipcRenderer = getIpcRenderer();

export default Vue.extend({
  components: {
    MainPanel
  },
  computed: {
    mainState(): MainState {
      return this.$store.state.main
    },
    config(): ConfigType {
      return this.mainState.config;
    }
  },
  watch: {
    'config.opacity' (v) {
      ipcRenderer.send('changeOpacity', v + '');
    }
  },
  mounted() {
    ipcRenderer.on('syncPropInfo', (e, v) => {
      this.mainState.imagePropInfo = v;
    });
  }
});
</script>

<style lang="scss">
.main-page {
  display: block;
  font-size: 14px;
  > .title {
    background: #285388;
    font-size: 12px;
    padding: 0.5em 1em;
    color: #fff;
  }
  > .main-container {
    margin: 16px;
  }
}
</style>
