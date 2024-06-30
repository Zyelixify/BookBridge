<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt'
</script>

<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <slot />
  </div>
  <SpeedInsights />
</template>
