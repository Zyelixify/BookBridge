<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data: session } = useAuth()

const self = await $trpc.account.findOneAccount.query({ where: { id: session.value?.user?.id } })
</script>

<template>
  <n-card class="max-w-2xl">
    <pre>{{ self }}</pre>
  </n-card>
</template>
