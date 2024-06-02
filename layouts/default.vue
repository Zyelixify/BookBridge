<script setup lang="ts">
const route = useRoute()
// const { status } = useAuth()
const isAuthenticated = true // computed(() => status.value === 'authenticated')
const isNavbarCollapsed = ref(false)

const sidebarOptions = useSidebarOptions()
const { appName, currentRoute } = useRouteTitle(computed(() => route.path))

useHead({ title: appName })
</script>

<template>
  <div class="flex">
    <n-layout position="absolute" has-sider>
      <n-layout-sider
        v-if="isAuthenticated"
        class="hidden md:block"
        collapse-mode="width"
        :collapsed-width="75"
        :collapsed="isNavbarCollapsed"
        show-trigger="arrow-circle"
        bordered
        @collapse="isNavbarCollapsed = true"
        @expand="isNavbarCollapsed = false"
      >
        <n-menu
          :value="currentRoute"
          :collapsed="isNavbarCollapsed"
          :collapsed-width="75"
          :options="sidebarOptions"
        />
      </n-layout-sider>
      <n-layout-content>
        <div class="relative min-h-screen grow bg-white overflow-auto">
          <slot />
        </div>
      </n-layout-content>
    </n-layout>
  </div>
</template>
