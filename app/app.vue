<template>
  <div class="drawer">
    <input id="nav-drawer" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content">
      <header class="relative z-50">
        <!-- Small screen header -->
        <div class="lg:hidden flex justify-between items-center px-4 py-2">
          <div class="flex-1">
            <label for="nav-drawer" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div class="flex-1 flex justify-end">
            <select class="theme-select select select-bordered select-sm">
              <option v-for="theme in availableThemes" 
                      :key="theme" 
                      :value="theme">
                {{ theme && theme.charAt(0).toUpperCase() + theme.slice(1) }}
              </option>
            </select>
          </div>
        </div>

        <!-- Large screen header -->
        <div class="hidden lg:flex justify-between items-center px-4 py-2">
          <div class="flex-1"></div>
          <ul class="menu menu-horizontal bg-base-200 rounded-box">
            <li>
              <NuxtLink to="/" :class="{ 'active': route.path === '/' }">
                Current Books
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/suggest" :class="{ 'active': route.path === '/suggest' }">
                Add a Book
              </NuxtLink>
            </li>
          </ul>
          <div class="flex-1 flex justify-end">
            <select class="theme-select select select-bordered select-sm">
              <option v-for="theme in availableThemes" 
                      :key="theme" 
                      :value="theme">
                {{ theme && theme.charAt(0).toUpperCase() + theme.slice(1) }}
              </option>
            </select>
          </div>
        </div>
      </header>

      <div class="h-full relative z-0">
        <NuxtPage class="h-full grid align-middle"/>
      </div>
    </div>

    <!-- Drawer side menu for small screens -->
    <div class="drawer-side z-[100]">
      <label for="nav-drawer" class="drawer-overlay"></label>
      <ul class="menu p-4 w-80 min-h-full bg-secondary">
        <li>
          <NuxtLink to="/" :class="{ 'active': route.path === '/' }">
            Current Books
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/suggest" :class="{ 'active': route.path === '/suggest' }">
            Add a Book
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemes } from '../composables/useThemes'
import { useRoute } from '#app'

const route = useRoute()
const { availableThemes } = useThemes()

// Add theme switcher functionality
onMounted(() => {
  const themeValues = localStorage.getItem('theme')
  const themeSelects = document.querySelectorAll('.theme-select') as NodeListOf<HTMLSelectElement>
  
  themeSelects.forEach(select => {
    if (themeValues) {
      document.documentElement.setAttribute('data-theme', themeValues)
      select.value = themeValues
    }

    select.addEventListener('change', (e) => {
      const theme = (e.target as HTMLSelectElement).value
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
      // Update all selectors
      themeSelects.forEach(s => s.value = theme)
    })
  })
})
</script>

<style scoped>
  
</style>
