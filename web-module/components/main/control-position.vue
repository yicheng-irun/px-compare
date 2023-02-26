<template>
  <div class="control-position" :class="focus ? 'focus' : ''">
    <div class="drag-panel" @mousedown="mousedown">
      <div class="info">
        位置：[{{ imagePropInfo.compareWindow.x }},{{
          imagePropInfo.compareWindow.y
        }}]
      </div>
      <div class="tips">拖动此处可同时拖动对比图</div>
    </div>
    <div class="tips">
      <span v-if="focus">您现在可以用键盘上下左右键移动位置</span>
      <span v-else>选中此窗口才能使用键盘控制位置</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { ImagePropInfo } from '../../store/main';
import { getIpcRenderer } from '../../utils/get-ipc-renderer';

const ipcRenderer = getIpcRenderer();
export default Vue.extend({
  data() {
    return {
      focus: true
    };
  },
  mounted() {
    window.addEventListener('focus', () => {
      this.focus = true;
    });
    window.addEventListener('blur', () => {
      this.focus = false;
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
  },
  computed: {
    imagePropInfo(): ImagePropInfo {
      return this.$store.state.main.imagePropInfo;
    }
  },
  methods: {
    mousedown($event: MouseEvent) {
      let lastX = $event.screenX;
      let lastY = $event.screenY;
      this.$data.mouseMoveCallback = (event: MouseEvent) => {
        const subX = event.screenX - lastX;
        const subY = event.screenY - lastY;
        lastX = event.screenX;
        lastY = event.screenY;
        ipcRenderer.send('changePosition', subX, subY);
      };

      document.addEventListener('mousemove', this.$data.mouseMoveCallback);
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener(
            'mousemove',
            this.$data.mouseMoveCallback
          );
        },
        {
          once: true
        }
      );
    }
  }
});
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
