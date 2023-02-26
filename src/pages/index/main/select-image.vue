<template>
  <div class="select-image-wrapper">
    <div class="btns">
      <Button class="select-image" @click="selectImage">选择图片</Button>
      <Button  @click="readImageFromClickBoard">读取粘贴板图片</Button>
    </div>
    <div class="drop-wrap" @drop="fileDrop" @dragover.prevent="">
      或拖动文件到此处
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getIpcRenderer } from '../../../utils/get-ipc-renderer';
import Button from '../../../components/ui/Button.vue';
import { ImageItem } from './main-page-types';

const ipcRenderer = getIpcRenderer();

const $emit = defineEmits(["onFileSelect"])

function selectImage() {
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

function readImageFromClickBoard() {
  ipcRenderer.send('readImageFromClickBoard');
}


function fileDrop(e: DragEvent) {
  e.preventDefault();
  const data = e.dataTransfer;
  console.log(e)
  if (data) {
    for (let i = 0; i < data.files.length; i += 1){
      const file = data.files[i];
      if (file.type.startsWith('image/')) {
        const imageItem: ImageItem = {
          name: file.name,
          // @ts-ignore
          path: file.path,
          srcPath: URL.createObjectURL(file),
          size: file.size,
          type: file.type
        };
        console.log(imageItem);
        ipcRenderer.send('selectImage', imageItem);
      }
    }
  }
}

</script>

<style lang="scss">
.select-image-wrapper {
  padding: 0.7em;
  background: #fff;
  text-align: center;
  >.btns {
    >button {
      margin: 0 0.5em;
    }
  }
  >.drop-wrap {
    padding: 1.5em 0;
    background: #0001;
    border-radius: 6px;
    margin: 1em 0;
    font-size: 12px;
    color: #000a;
    border: 1px dashed #0002;
    box-shadow: 0 0 8px inset #0001;
    user-select: none;
  }
}
</style>
