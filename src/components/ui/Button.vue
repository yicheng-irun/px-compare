<template>
  <button
    class="button"
    v-on="{
      click: e => $emit('click', e),
      touchstart: e => $emit('touchstart', e),
      touchend: e => $emit('touchend', e)
    }"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import Vue, { PropType } from 'vue';

type ButtonType = '' | 'default' | 'primary' | 'disable';

const props = defineProps({
  type: {
      type: String as PropType<ButtonType>,
      default: ''
    }
})

</script>
<style lang="scss">
button.button {
  display: inline-block;
  background: #0001;
  padding: 0.5em 0.7em;
  border: none;
  line-height: 1.2;
  color: #111;
  border-radius: 0.2em;
  cursor: pointer;
  outline: none;
  &:hover {
    background: #0002;
  }
  &:focus {
    outline: 1px dashed #40b5d8;
  }
}
</style>
