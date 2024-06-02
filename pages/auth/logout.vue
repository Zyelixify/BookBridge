<script setup lang="ts">
definePageMeta({ layout: 'unauthenticated', })

const { signOut } = useAuth()
signOut()
</script>

<template>
  <div class="flex flex-col justify-center items-center mb-6">
    <n-spin />
    <n-divider />
    <p>See you soon!</p>
  </div>
</template>
