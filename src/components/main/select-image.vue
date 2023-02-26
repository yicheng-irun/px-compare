<template>
  <div class="select-image-wrapper">
    <Button class="select-image" @click="selectImage">选择图片</Button>
  </div>
</template>
<script lang="ts" setup>
import { getIpcRenderer } from '../../utils/get-ipc-renderer';
import Button from '../ui/Button.vue';
import { ImageItem } from './main-page-types';

const ipcRenderer = getIpcRenderer();

const $emit = defineEmits(["onFileSelect"])

function selectImage() {
  // https://stackoverflow.com/questions/62741325/show-local-image-file-tmp-someimage-jpg
  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.multiple = false;
  imageInput.accept = 'image/*';
  imageInput.onchange = async () => {
    const { files } = imageInput;
    if (files && files.length) {
      const file = files[0];
      const imageItem: ImageItem = {
        name: file.name,
        // @ts-ignore
        path: file.path,
        srcPath: URL.createObjectURL(file),
        size: file.size,
        type: file.type
      };
      console.log(imageItem);
      $emit('onFileSelect', imageItem);
      ipcRenderer.send('selectImage', imageItem);
    }
  };
  imageInput.click();
}
</script>

<style lang="scss">
.select-image-wrapper {
  padding: 0.7em;
  background: #fff;
  text-align: center;
}
</style>
