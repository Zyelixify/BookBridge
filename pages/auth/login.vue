<script lang="ts" setup>
definePageMeta({
  layout: 'unauthenticated',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
useHead({ title: `Login` })

const { signIn } = useAuth()
const message = useMessage()

const formData = ref<{ email: string, password: string }>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)
const formRef = ref<null>(null)

async function submitHandler(e: MouseEvent) {
  e.preventDefault()

  isLoading.value = true
  const res = await signIn('credentials', { ...formData.value, redirect: false })

  if (res?.error) {
    message.error(res.error)
    isLoading.value = false
  }
  else {
    message.success('Logged in successfully')
    return navigateTo(res?.url, { external: true })
  }
}
</script>

<template>
  <n-card
    title="Login"
    header-class="bg-gray-200 !justify-center"
    class="max-w-lg mx-auto"
  >
    <n-form
      ref="formRef"
      :model="formData"
    >
      <div class="flex flex-col gap-2 mt-6">
        <n-input
          v-model="formData.email"
          label="Email"
          placeholder="Email"
          :disabled="isLoading"
        />
        <n-input
          v-model="formData.password"
          label="Password"
          placeholder="Password"
          :disabled="isLoading"
          type="password"
        />
      </div>
      <n-button
        type="primary"
        :loading="isLoading"
        :disabled="isLoading"
        class="w-full mt-4"
        @click="submitHandler"
      >
        Login
      </n-button>
    </n-form>
  </n-card>
</template>
