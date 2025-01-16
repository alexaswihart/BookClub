<template>
  <div>
    <UTable class="w-3/4 m-auto" :empty-state="{ icon: 'i-heroicons-circle-stack-20-solid', label: 'No items.' }" :columns="columns" :rows="books" />
  </div>
</template>

<script setup lang="ts">
  const appConfig = useAppConfig()
  
  const { data: books } = await useFetch('/api/books')

  const columns = [{
    key: 'title',
    label: 'Title'
  }, {
    key: 'author',
    label: 'Author'
  }]
</script>

<style scoped>

</style>
