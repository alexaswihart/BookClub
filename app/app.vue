<template>
  <header>
    <div class="flex justify-between items-center px-4 py-2">
      <div class="flex-1"></div> <!-- spacer -->
      <ul class="menu menu-horizontal bg-base-200 rounded-box">
        <li><NuxtLink to="/">Current Books</NuxtLink></li>
        <li><NuxtLink to="/suggest">Add a Book</NuxtLink></li>
      </ul>
      <div class="flex-1 flex justify-end">
        <select data-choose-theme class="select select-bordered select-sm">
          <option v-for="theme in availableThemes" 
                  :key="theme" 
                  :value="theme">
            {{ theme && theme.charAt(0).toUpperCase() + theme.slice(1) }}
          </option>
        </select>
      </div>
    </div>
  </header>
  <div class="h-full">
    <NuxtPage class="h-full grid align-middle"/>
  </div>
</template>

<script setup lang="ts">
import { useThemes } from '../composables/useThemes'

const { availableThemes } = useThemes()

// Add theme switcher functionality
onMounted(() => {
  const themeValues = localStorage.getItem('theme')
  const themeSelect = document.querySelector('[data-choose-theme]') as HTMLSelectElement
  
  if (themeValues) {
    document.documentElement.setAttribute('data-theme', themeValues)
    if (themeSelect) {
      themeSelect.value = themeValues
    }
  }

  if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
      const theme = (e.target as HTMLSelectElement).value
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    })
  }
})
</script>

<style scoped>
  
</style>
