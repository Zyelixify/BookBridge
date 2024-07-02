<script setup lang="ts">
defineProps<{ shrinkLogo?: boolean }>()
</script>

<template>
  <h2
    class="block text-6xl align-baseline text-center text-green-400 select-none"
    :style="{
      height: '100%',
      transition: '0.3s',
      width: 300,
      transform: shrinkLogo ? 'scale(0.3)' : 'scale(1)',
      fontFamily: 'Roboto',
    }"
  >
    Book
    Bridge
  </h2>
</template>
