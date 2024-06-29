<script setup lang="ts">
const { $trpc } = useNuxtApp()
const pageSize = 10
const { data, count } = await $trpc.book.findManyBook.query({ take: pageSize })
const { taken, hasMore, countIncrement } = useInfiniteScroll(count, pageSize)
const books = ref(data)

async function fetchMoreBooks() {
  if (hasMore.value) {
    const { data } = await $trpc.book.findManyBook.query({ take: pageSize, skip: taken.value })
    books.value = [...books.value, ...data]
    countIncrement(data!.length)
  }
}
</script>

<template>
  <Page title="Books" icon="material-symbols:book-2-outline-rounded">
    <n-infinite-scroll class="h-[80vh]" :distance="10" @load="fetchMoreBooks">
      <n-list hoverable clickable class="flex flex-wrap gap-2">
        <n-list-item v-for="book in books" :key="book.isbn" class="flex-auto w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
          <div :title="book.title" class="flex flex-row gap-4 p-4 h-full">
            <div class="w-32 h-48 border border-gray-300 rounded-sm overflow-hidden">
              <n-image
                v-if="book.image"
                lazy
                class="w-full h-full object-contain mx-auto"
                :src="book.image"
              />
            </div>
            <div class="w-2/3">
              <h3 class="text-lg font-semibold">
                {{ book.title }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ book.author }}, {{ book.publishedAt.getFullYear() }}
              </p>
              ${{ book.price.toFixed(2) }}
            </div>
          </div>
        </n-list-item>
      </n-list>
    </n-infinite-scroll>
  </Page>
</template>
