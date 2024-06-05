<script setup lang="ts">
const { $trpc } = useNuxtApp()
const books = await $trpc.book.findManyBook.query({})
</script>

<template>
  <n-card class="max-w-2xl">
    <pre> {{ books }}</pre>
  </n-card>
</template>
