<template>
  <div
    class="compare-page"
    :style="{ opacity: `${data.opacity}` }"
  >
    <div class="image-wrapper">
      <img
        v-if="imageSrc"
        ref="imageRef"
        @load="imageLoad"
        :src="imageSrc"
        alt=""
      >
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, reactive, ref} from 'vue';
import {getIpcRenderer} from '../../utils/get-ipc-renderer';
import { ImageItem } from '../index/main/main-page-types';

const ipcRenderer = getIpcRenderer();

const data = reactive < {
	opacity: number,
	image: ImageItem | null,
} > ({
	opacity: 0.5,
	image: null,
});

const imageSrc = computed < string > (() => {
	if (data.image && data.image.srcPath) {
		return data.image.srcPath;
	}

	return '';
});

onMounted(() => {
	ipcRenderer.on('setCompareOpacity', (v, value) => {
		data.opacity = Number.parseFloat(value);
	});
	ipcRenderer.on('setImage', (v, value) => {
		data.image = value;
	});
});

const imageRef = ref();

function imageLoad() {
	const img = imageRef.value;
	if (img) {
		ipcRenderer.send('imageNaturalSize', img.naturalWidth, img.naturalHeight);
	}
}

</script>

<style lang="scss">
html {
  overflow: hidden;
}
body {
  margin: 0;
}
.compare-page {
  display: block;
  > .image-wrapper {
    > img {
      vertical-align: top;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
