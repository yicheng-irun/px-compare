<template>
  <div class="main-panel">
    <select-image />
    <control-opacity />
    <control-position />
    <control-size />
  </div>
</template>

<script lang="ts" setup>
import ControlOpacity from './control-opacity.vue';
import ControlPosition from './control-position.vue';
import ControlSize from './control-size.vue';
import selectImage from './select-image.vue';
</script>
