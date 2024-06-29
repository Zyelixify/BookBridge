<script setup lang="ts">
defineProps<{ icon: string, title: string }>()
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-green-300 rounded-md">
    <div class="flex items-center space-x-3">
      <Icon :name="icon" size="36" />
      <h1 class="text-3xl font-semibold pb-1">
        {{ title }}
      </h1>
    </div>
    <slot name="headerExtra" />
  </div>
</template>
