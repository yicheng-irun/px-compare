<template>
  <div class="main-page">
    <main-panel />
    <div>asfadsf</div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, watch} from 'vue';
import MainPanel from '../components/main/main-panel.vue';
import {useMainStore} from '../store/main';
import {getIpcRenderer} from '../utils/get-ipc-renderer';

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
