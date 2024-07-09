<script setup lang="ts">
const props = defineProps<{ accountId: string }>()
const { $trpc } = useNuxtApp()
const isLoading = ref(false)
const events = ref()

async function fetchEvents() {
  isLoading.value = true
  events.value = await $trpc.event.findManyEvent.query({ where: { accountId: props.accountId }, take: 5 })
  isLoading.value = false
}
onMounted(() => fetchEvents())
</script>

<template>
  <n-card title="Recent Notifications">
    <template #header-extra>
      <n-button :loading="isLoading" @click="fetchEvents">
        <Icon v-if="!isLoading" name="material-symbols:refresh" size="24" />
      </n-button>
    </template>
    <n-list v-if="Array.isArray(events) && events.length > 0" hoverable clickable class="flex flex-col">
      <n-list-item v-for="event in events" :key="event.id" class="flex-auto w-full">
        <n-thing>
          <template #avatar>
            <Icon name="material-symbols:circle-notifications-outline" size="32" />
          </template>
          <template #header>
            {{ event.type }}
          </template>
          <template #header-extra>
            {{ new Date(event.createdAt).toLocaleString() }}
          </template>
          <template #description>
            {{ event.message }}
          </template>
        </n-thing>
      </n-list-item>
    </n-list>
    <n-empty v-else />
  </n-card>
</template>
