<template>
  <div class="control-size">
    <div class="info">
      <div>
        当前图片大小:
        <b>{{ imagePropInfo.compareWindow.width }}px,{{
          imagePropInfo.compareWindow.height
        }}px</b>
      </div>
      <div>
        原图大小：<b>{{ imagePropInfo.imageNaturalSize.width }}px,{{
          imagePropInfo.imageNaturalSize.height
        }}px</b>
      </div>
    </div>
    <div class="size-edit-wrapper">
      <div class="row">
        <div class="left">
          设置大小为：
        </div>
        <div class="center">
          <div class="input-item">
            <label for="width">宽</label>
            <input
              id="width"
              type="number"
              min="1"
              max="10000"
              class="size-input"
              @keydown.enter="submitSize"
              @input="widthInput"
              v-model="width"
            >
            <span>px</span>
          </div>
          <div class="input-item">
            <label for="height">高</label>
            <input
              id="height"
              type="text"
              min="1"
              max="10000"
              class="size-input"
              @keydown.enter="submitSize"
              @input="heightInput"
              v-model="height"
            >
            <span>px</span>
          </div>
        </div>
        <div class="right">
          <Button @click="submitSize">
            确定
          </Button>
        </div>
      </div>

      <!-- <div>
        <span>输入框</span>
        <span v-if="lockScale"
          >已锁定为原图比例，点此<Button class="lock" @click="lockScale = false"
            >解除</Button
          >比例锁定</span
        >
        <span v-else
          >未锁定原图比例，点此<Button class="lock" @click="lockScale = true"
            >锁定</Button
          >为原比例</span
        >。
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, watch, reactive} from 'vue';
import {useMainStore} from '../../store/main';
import {getIpcRenderer} from '../../utils/get-ipc-renderer';
import Button from '../ui/Button.vue';

const store = useMainStore();
const ipcRenderer = getIpcRenderer();

const data = reactive({
	width: 1,
	height: 1,
	lockScale: true,
});

const imagePropInfo = computed(() => store.$state.imagePropInfo);

watch([() => imagePropInfo.value], ([v]) => {
	data.width = v.compareWindow.width;
	data.height = v.compareWindow.height;
});

function widthInput() {
	if (data.lockScale) {
		data.height = Math.ceil(
			(data.width * imagePropInfo.value.imageNaturalSize.height)
        / imagePropInfo.value.imageNaturalSize.width,
		);
	}
}

function heightInput() {
	if (data.lockScale) {
		data.width = Math.ceil(
			(data.height * imagePropInfo.value.imageNaturalSize.width)
        / imagePropInfo.value.imageNaturalSize.height,
		);
	}
}

function submitSize() {
	ipcRenderer.send('changeImageSize', data.width, data.height);
}
</script>

<style lang="scss">
.control-size {
  font-size: 14px;
  margin: 0 10px;
  > .info {
    font-size: 12px;
    color: #0006;
    word-break: break-all;
    margin: 5px 0 3px;
    text-align: center;
    line-height: 1.5;
  }
  > .size-edit-wrapper {
    text-align: center;
    font-size: 12px;
    > .row {
      margin: 5px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      > .left {
        color: #aaa;
      }
      > .center {
        > .input-item {
          margin: 3px 0;
          > label {
            font-size: 12px;
            margin: 0 5px 0 0;
            font-weight: bold;
          }
          > input.size-input {
            width: 60px;
            border-radius: 4px;
            border: 1px solid #0005;
          }
          > span {
            font-size: 12px;
            margin: 0 0 0 3px;
          }
        }
      }
    }

    .button {
      text-align: center;
      white-space: nowrap;
      margin: 0 5px;
      padding: 0.2em 0.6em;
      font-size: 12px;
    }
  }
}
</style>
