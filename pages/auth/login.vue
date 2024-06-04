<script lang="ts" setup>
definePageMeta({
  layout: 'unauthenticated',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/',
  },
})
useHead({ title: `Login` })

const { signIn, } = useAuth()
const message = useMessage()

const formData = ref<{ email: string, password: string, type?: 'login' | 'signup' }>({
  email: '',
  password: '',
})

const isLoading = ref<boolean>(false)
const formRef = ref<null>(null)

async function submitHandler(type: 'login' | 'signup') {
  isLoading.value = true
  const res = await signIn('credentials', { ...formData.value, type, redirect: false })

  if (res?.error) {
    message.error(res.error)
    isLoading.value = false
  }
  else {
    message.success('Success')
    return navigateTo('/')
  }
}
</script>

<template>
  <div class="flex flex-grow flex-col items-center justify-center max-w-md gap-6">
    <Logo />
    <n-card title="Login" header-class="text-center mt-2">
      <n-form
        ref="formRef"
        :model="formData"
      >
        <div class="flex flex-col gap-2 mt-6">
          <n-input
            v-model:value="formData.email"
            label="Email"
            placeholder="Email"
            :disabled="isLoading"
          />
          <n-input
            v-model:value="formData.password"
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
          @click="submitHandler('login')"
        >
          Login
        </n-button>
        <n-button
          secondary
          :loading="isLoading"
          :disabled="isLoading"
          class="w-full mt-2"
          @click="submitHandler('signup')"
        >
          Signup
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>
