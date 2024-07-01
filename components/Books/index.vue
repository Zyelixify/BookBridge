<script setup lang="ts">
const { data: session } = useAuth()
const { $trpc } = useNuxtApp()
const pageSize = 9
const { data, count } = await $trpc.book.findManyBook.query({ take: pageSize })
const { taken, hasMore, countIncrement } = useInfiniteScroll(count, pageSize)
const books = ref(data)
const drawerOpen = ref(false)
const selectedBook = ref<typeof data[number]>()
const isLoading = ref(false)
const isOrdering = ref(false)

async function fetchMoreBooks() {
  if (hasMore.value) {
    isLoading.value = true
    const { data } = await $trpc.book.findManyBook.query({ take: pageSize, skip: taken.value })
    books.value = [...books.value, ...data]
    countIncrement(data!.length)
    isLoading.value = false
  }
}

function handleOpenDrawer(book: typeof data[number]) {
  selectedBook.value = book
  drawerOpen.value = true
}

async function handleOrder(bookId: string) {
  isOrdering.value = true
  const accountId = session.value?.user?.id
  if (!accountId) { return }
  await $trpc.bookOwnership.createBook.mutate({ accountId, bookId })
  isOrdering.value = false
}

async function handleSave(bookId: string) {
  const accountId = session.value?.user?.id
  if (!accountId) { return }
  await $trpc.book.updateBook.mutate({ where: { id: bookId }, data: { savedBy: { connect: { id: accountId } } } })
}
</script>

<template>
  <Page title="Books" icon="material-symbols:book-2-outline-rounded">
    <n-infinite-scroll class="h-full" :distance="10" @load="fetchMoreBooks">
      <n-list hoverable clickable class="flex flex-wrap">
        <n-list-item v-for="book in books" :key="book.isbn" class="flex-auto w-full sm:w-1/2 lg:w-1/3">
          <div :title="book.title" class="flex flex-row gap-4 p-4 h-full">
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
                ${{ book.price.toFixed(2) }}
              </div>
              <div class="flex flex-row-reverse gap-2">
                <n-button size="medium" type="primary" @click="handleOpenDrawer(book)">
                  Show more...
                </n-button>
              </div>
            </div>
          </div>
        </n-list-item>
      </n-list>
      <n-card v-if="isLoading" class="w-full flex justify-center items-center p-4">
        <n-spin />
      </n-card>
      <n-alert v-else-if="!hasMore" class="w-full flex justify-center p-4" title="No more books to show" />
    </n-infinite-scroll>
    <n-drawer v-model:show="drawerOpen" :width="500" placement="right">
      <n-drawer-content v-if="selectedBook" :title="selectedBook.title" body-content-class="flex flex-col items-center">
        <div class="w-64 h-96 border border-gray-300 rounded-sm overflow-hidden">
          <n-image
            v-if="selectedBook.image"
            lazy
            class="w-full h-full object-contain mx-auto"
            :src="selectedBook.image"
          />
        </div>
        <div class="w-2/3 flex flex-col flex-grow py-8">
          <h3 class="text-lg font-semibold">
            {{ selectedBook.title }}
          </h3>
          <p class="text-sm text-gray-500">
            {{ selectedBook.author }}, {{ selectedBook.publishedAt.getFullYear() }}
          </p>
          ${{ selectedBook.price.toFixed(2) }}
          <n-divider />
          <div class="flex flex-col flex-grow gap-2 w-full">
            <n-button strong size="medium" type="primary" :is-loading="isOrdering" @click="handleOrder(selectedBook.id)">
              Order
            </n-button>
            <n-button size="medium" @click="handleSave(selectedBook.id)">
              Save
            </n-button>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </Page>
</template>
