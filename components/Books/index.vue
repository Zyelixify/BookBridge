<script setup lang="ts">
const { $trpc } = useNuxtApp()
const books = await $trpc.book.findManyBook.query({})
</script>

<template>
  <Page title="Books" icon="material-symbols:book-2-outline-rounded">
    <n-card>
      <pre> {{ books }}</pre>
    </n-card>
  </Page>
</template>
