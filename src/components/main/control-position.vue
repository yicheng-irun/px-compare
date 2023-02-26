<template>
  <div class="control-position" :class="data.focus ? 'focus' : ''">
    <div class="drag-panel" @mousedown="mousedown">
      <div class="info">
        位置：[{{ imagePropInfo.compareWindow.x }},{{
          imagePropInfo.compareWindow.y
        }}]
      </div>
      <div class="tips">拖动此处可同时拖动对比图</div>
    </div>
    <div class="tips">
      <span v-if="data.focus">您现在可以用键盘上下左右键移动位置</span>
      <span v-else>选中此窗口才能使用键盘控制位置</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, onMounted, computed} from 'vue';
import { ImagePropInfo, useMainStore } from '../../store/main';
import { getIpcRenderer } from '../../utils/get-ipc-renderer';

const ipcRenderer = getIpcRenderer();

const store = useMainStore();

const data = reactive({
  focus: true
})

onMounted(() => {
  window.addEventListener('focus', () => {
      data.focus = true;
    });
    window.addEventListener('blur', () => {
      data.focus = false;
    });
    document.addEventListener('keydown', $event => {
      const code = $event.code.toLowerCase();
      if (code === 'arrowdown') {
        ipcRenderer.send('changePosition', 0, 1);
      } else if (code === 'arrowup') {
        ipcRenderer.send('changePosition', 0, -1);
      } else if (code === 'arrowleft') {
        ipcRenderer.send('changePosition', -1, 0);
      } else if (code === 'arrowright') {
        ipcRenderer.send('changePosition', 1, 0);
      }
    });
})

const imagePropInfo = computed(() => {
  return store.$state.imagePropInfo;
})

let mouseMoveCallback: null | ((event: MouseEvent) => void) = null

function mousedown($event: MouseEvent) {
  let lastX = $event.screenX;
  let lastY = $event.screenY;
  mouseMoveCallback = (event: MouseEvent) => {
    const subX = event.screenX - lastX;
    const subY = event.screenY - lastY;
    lastX = event.screenX;
    lastY = event.screenY;
    ipcRenderer.send('changePosition', subX, subY);
  };

  document.addEventListener('mousemove', mouseMoveCallback);
  document.addEventListener(
    'mouseup',
    () => {
      if (mouseMoveCallback) {
        document.removeEventListener('mousemove',mouseMoveCallback);
      }
    },
    {
      once: true
    }
  );
}
</script>

<style lang="scss">
.control-position {
  user-select: none;
  > .drag-panel {
    margin: 0 10px;
    padding: 10px;
    border-radius: 5px;
    height: 40px;
    background: #f2f2f2;
    text-align: center;
    &:hover {
      background: #eaeaea;
    }
    > .info {
      font-size: 12px;
      color: #0005;
      margin: 0 0 5px;
    }
    > .tips {
      font-size: 13px;
      color: #0009;
    }
  }
  > .tips {
    font-size: 12px;
    text-align: center;
    margin: 0 10px;
    padding: 5px 0;
    color: #0003;
  }
  &.focus {
    > .drag-panel {
      border-color: #e5e5e5;
    }
    > .tips {
      color: #000a;
    }
  }
}
</style>
