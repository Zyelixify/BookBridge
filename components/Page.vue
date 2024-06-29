<script setup lang="ts">
defineProps<{ icon: string, title: string }>()
</script>

<template>
  <div class="p-8 flex flex-col gap-4">
    <PageHeader :icon="icon" :title="title" />
    <slot />
  </div>
</template>
