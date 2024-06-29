export default (total: number, pageSize: number) => {
  // First batch will already be taken, so we start with pageSize
  const taken = ref(pageSize)
  const hasMore = computed(() => taken.value < total)
  const countIncrement = (num: number) => {
    if (hasMore.value) {
      return taken.value += num
    }
  }
  const countReset = () => {
    taken.value = 0
  }

  return { taken, hasMore, countIncrement, countReset }
}
