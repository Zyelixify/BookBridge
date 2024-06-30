<script setup lang="ts">
const { $trpc } = useNuxtApp()
const pageSize = 9
const { data, count } = await $trpc.book.findManyBook.query({ take: pageSize })
const { taken, hasMore, countIncrement } = useInfiniteScroll(count, pageSize)
const books = ref(data)
const drawerOpen = ref(false)
const selectedBook = ref<typeof data[number]>()

async function fetchMoreBooks() {
  if (hasMore.value) {
    const { data } = await $trpc.book.findManyBook.query({ take: pageSize, skip: taken.value })
    books.value = [...books.value, ...data]
    countIncrement(data!.length)
  }
}

function handleOpenDrawer(book: typeof data[number]) {
  selectedBook.value = book
  drawerOpen.value = true
}
</script>

<template>
  <Page title="Books" icon="material-symbols:book-2-outline-rounded">
    <n-infinite-scroll class="h-[80vh]" :distance="10" @load="fetchMoreBooks">
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
            <n-button size="medium" type="primary">
              Order
            </n-button>
            <n-button size="medium">
              Add to list
            </n-button>
          </div>
        </div>
      </n-drawer-content>
    </n-drawer>
  </Page>
</template>
