<script setup lang="ts">
const { $trpc } = useNuxtApp()
const { data: session } = useAuth()

const self = await $trpc.account.findOneAccount.query({ where: { id: session.value?.user?.id } })
const ownerships = await $trpc.bookOwnership.findManyBookOwnership.query({ where: { accountId: self.id } })
const ownedBooks = ownerships.map((ownership: any) => ownership.book)
const { data: savedBooks } = await $trpc.book.findManyBook.query({ where: { savedBy: { some: { id: self.id } } } })

const isReviewDrawerOpen = ref(false)
const reviewBook = ref<typeof savedBooks[number]>()
const reviewData = ref({ content: '', recommend: false })

async function handleReview() {
  if (!reviewBook.value) { return }
  const accountId = self.id
  const bookId = reviewBook.value.id
  await $trpc.review.createReview.mutate({ accountId, bookId, ...reviewData.value })
  isReviewDrawerOpen.value = false
}

async function openReviewDrawer(book: typeof savedBooks[number]) {
  reviewBook.value = book
  isReviewDrawerOpen.value = true
}
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
        <DashboardNotifications :account-id="self.id" />
        <n-card title="Saved Books">
          <n-list hoverable clickable class="flex flex-wrap gap-2 justify-between">
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
                <div class="w-2/3 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 class="text-lg font-semibold">
                      {{ book.title }}
                    </h3>
                    <p class="text-sm text-gray-500">
                      {{ book.author }}, {{ book.publishedAt.getFullYear() }}
                    </p>
                  </div>
                  <div class="flex flex-row-reverse gap-2">
                    <n-button size="medium" type="primary" @click="openReviewDrawer(book)">
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

    <n-drawer v-model:show="isReviewDrawerOpen" :width="400" placement="right">
      <n-drawer-content v-if="reviewBook" :title="reviewBook.title" body-content-class="flex flex-col items-center">
        <div class="w-64 h-96 border border-gray-300 rounded-sm overflow-hidden">
          <n-image
            v-if="reviewBook.image"
            lazy
            class="w-full h-full object-contain mx-auto"
            :src="reviewBook.image"
          />
        </div>
        <div class="w-2/3 flex flex-col flex-grow py-8">
          <h3 class="text-lg font-semibold">
            {{ reviewBook.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ reviewBook.author }}, {{ reviewBook.publishedAt.getFullYear() }}
          </p>
          <n-divider />
          <div class="flex flex-col gap-2 py-2">
            <n-input v-model="reviewData.content" type="textarea" placeholder="Write your review here..." />
            <n-switch
              v-model="reviewData.recommend"
              :round="false"
              :rail-style="({ checked }) => (checked
                ? {}
                : { background: '#d03050', boxShadow: '0 0 0 2px #d0305040' }
              )"
            >
              <template #checked>
                Recommended
              </template>
              <template #unchecked>
                Not recommended
              </template>
            </n-switch>
          </div>
          <div class="flex flex-col flex-grow gap-2 w-full">
            <n-button strong size="medium" type="primary" @click="handleReview()">
              Submit review
            </n-button>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </Page>
</template>
