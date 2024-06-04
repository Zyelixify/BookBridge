<script setup lang="ts">
defineProps<{ shrinkLogo?: boolean }>()
</script>

<template>
  <h2
    class="block text-8xl text-green-400 select-none"
    :style="{
      height: '100%',
      transition: '0.3s',
      width: 300,
      transform: shrinkLogo ? 'scale(0.3)' : 'scale(1)',
      fontFamily: 'Roboto',
    }"
  >
    LMS
  </h2>
</template>
