<template>
  <Html data-theme="night">
    <header>
      <div>
        <h1 class="m-auto">
          Welcome to BOOK CLUB
        </h1>
      </div>
      <div class="flex justify-center">
        <ul class="menu menu-horizontal bg-base-200 rounded-box">
          <li><NuxtLink to="/">Current Books</NuxtLink></li>
          <li><NuxtLink to="/suggest">Add a Book</NuxtLink></li>
        </ul>
      </div>
    </header>
    <div class="h-full">
      <NuxtPage class="h-full grid align-middle"/>
    </div>
  </Html>
</template>

<script setup lang="ts">
  
</script>

<style scoped>
  
</style>
