<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data: session } = useAuth()

const self = await $trpc.account.findOneAccount.query({ where: { id: session.value?.user?.id } })
</script>

<template>
  <Page title="Dashboard" icon="material-symbols:home-outline-rounded">
    <n-card>
      <pre>{{ self }}</pre>
    </n-card>
  </Page>
</template>
