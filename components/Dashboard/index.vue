<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data: session } = useAuth()

const self = await $trpc.account.findOneAccount.query({ where: { id: session.value?.user?.id } })
const ownerships = await $trpc.bookOwnership.findManyBook.query({ where: { accountId: session.value?.user?.id } })
const ownedBooks = ownerships.map((ownership: any) => ownership.book)
const { data: savedBooks } = await $trpc.book.findManyBook.query({ where: { savedBy: { some: { id: session.value?.user?.id } } } })
</script>

<template>
  <Page title="Dashboard" icon="material-symbols:dashboard-outline">
    <div class="flex flex-col lg:flex-row min-h-full gap-4">
      <div class="lg:w-1/2 flex flex-col gap-4">
        <n-card title="Welcome!">
          <p>
            Hello {{ self.name }}! This is your dashboard.<br>
            You can view your account details, recent notifications, updates, and orders here.
          </p>
          <n-card title="Account details:" content-class="sm:flex justify-between" class="mt-4 p-2 bg-green-300 rounded-lg shadow select-none">
            <p class="text-sm">
              Name: {{ self.name }}<br>
              Role: {{ self.role.toLocaleUpperCase() }}
            </p>
            <p class="text-sm">
              Email: <span class="blur-sm hover:blur-none transition-all duration-300">{{ self.email }}</span><br>
              Joined: {{ new Date(self.createdAt).toLocaleDateString() }}
            </p>
          </n-card>
        </n-card>
        <n-card>
          <n-empty description="No notifications" />
        </n-card>
        <n-card title="Saved Books">
          <n-list hoverable clickable class="flex flex-wrap gap-4">
            <n-list-item v-for="book in savedBooks" :key="book.isbn" class="w-48 h-64 border border-gray-300 rounded-sm overflow-hidden">
              <n-image
                v-if="book.image"
                lazy
                class="w-full h-full object-contain mx-auto"
                :src="book.image"
              />
            </n-list-item>
          </n-list>
        </n-card>
      </div>
      <div class="lg:w-1/2 ">
        <n-card class="min-h-full" title="Owned Books">
          <n-list hoverable clickable class="flex flex-col">
            <n-list-item v-for="book in ownedBooks" :key="book.isbn" class="flex-auto w-full">
              <div :title="book.title" class="flex flex-row gap-4 p-4 pt-0 h-full">
                <div class="w-32 h-48 border border-gray-300 rounded-sm overflow-hidden">
                  <n-image
                    v-if="book.image"
                    lazy
                    class="w-full h-full object-contain mx-auto"
                    :src="book.image"
                  />
                </div>
                <div class="w-2/3 flex flex-col justify-between">
                  <div>
                    <h3 class="text-lg font-semibold">
                      {{ book.title }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ book.author }}, {{ book.publishedAt.getFullYear() }}
                    </p>
                  </div>
                  <div class="flex flex-row-reverse gap-2">
                    <n-button size="medium" type="primary">
                      Show more...
                    </n-button>
                    <n-button size="medium">
                      Review
                    </n-button>
                  </div>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </div>
  </Page>
</template>
