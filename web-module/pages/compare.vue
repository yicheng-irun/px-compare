<template>
  <div class="compare-page" :style="{ opacity }">
    <div class="image-wrapper">
      <img
        v-if="imageSrc"
        ref="image"
        @load="imageLoad"
        :src="imageSrc"
        alt=""
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { ImageItem } from '../components/main/main-page-types';
import { getIpcRenderer } from '../utils/get-ipc-renderer';

const ipcRenderer = getIpcRenderer();
export default Vue.extend({
  data(): {
    opacity: number;
    image: ImageItem | null;
  } {
    return {
      opacity: 0.5,
      image: null
    };
  },
  computed: {
    imageSrc(): string {
      if (this.image && this.image.srcPath) {
        return this.image.srcPath;
      }
      return '';
    }
  },
  mounted() {
    ipcRenderer.on('setCompareOpacity', (v, value) => {
      this.opacity = Number.parseFloat(value);
    });

    ipcRenderer.on('setImage', (v, value) => {
      this.image = value;
    });
  },
  methods: {
    imageLoad() {
      const img = this.$refs.image as HTMLImageElement;
      ipcRenderer.send('imageNaturalSize', img.naturalWidth, img.naturalHeight);
    }
  }
});
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
