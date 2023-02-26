<template>
  <div class="main-page">
    <main-panel />
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import MainPanel from './main/main-panel.vue';
import {getIpcRenderer} from '../../utils/get-ipc-renderer';
import { useMainStore } from './store';
import { ImageItem } from './main/main-page-types';

const ipcRenderer = getIpcRenderer();
const mainStore = useMainStore();

const mainState = computed(() => mainStore.$state);

onMounted(() => {
	ipcRenderer.on('syncPropInfo', (e, v) => {
		mainState.value.imagePropInfo = v;
	});
});

watch([() => mainStore.$state.config.opacity], ([v]) => {
	ipcRenderer.send('changeOpacity', String(v));
});



</script>

<style lang="scss">
body {
  margin: 0;
}
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
