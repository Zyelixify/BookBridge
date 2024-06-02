<script setup lang="ts">
defineProps<{ isCollapsed: boolean }>()
</script>

<template>
  <h2
    class="block text-8xl text-green-400"
    :style="{
      height: '100%',
      transition: '0.3s',
      width: 300,
      transform: isCollapsed ? 'scale(0.3)' : 'scale(1)',
      fontFamily: 'Roboto',
    }"
  >
    LMS
  </h2>
</template>
