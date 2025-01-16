<template>
  <header>
    <div>
      <h1 class="m-auto">
        Welcome to BOOK CLUB
      </h1>
    </div>
    <UHorizontalNavigation :links="links" class="m-auto border-b border-gray-200 dark:border-gray-800" />  
  </header>
  <div class="h-full">
    <NuxtPage class="h-full grid align-middle"/>
  </div>
</template>

<script setup lang="ts">
  const links = [{
    label: 'Current Books',
    to: '/'
  }, {
    label: 'Suggest New Books',
    to: '/suggest'
  }]
</script>

<style scoped>

</style>
