<template>
  <div class="flex flex-col items-center gap-4 mb-8">
    <!-- Selected book label -->
    <div 
      v-if="selectedBook"
      class="text-lg font-bold animate-fade-in relative z-20"
    >
      {{ selectedBook }}
    </div>
    
    <div class="relative w-96 h-96">
      <!-- Wheel -->
      <div v-if="books?.length" 
        class="absolute w-full h-full transition-transform duration-[3000ms]"
        :style="{ transform: `rotate(${rotation}deg)` }"
      >
        <!-- Background circle -->
        <div class="absolute w-full h-full rounded-full overflow-hidden z-0">
          <div 
            v-for="(book, index) in books" 
            :key="`pie-${book.id}`"
            class="absolute w-full h-full origin-center"
            :style="{ 
              transform: `rotate(${(360 / books.length) * index}deg)`,
            }"
          >
            <!-- Pie section -->
            <div 
              class="absolute w-1/2 h-full origin-right"
              :style="{
                backgroundColor: `hsl(${(360 / books.length) * index}, 70%, 50%)`,
                opacity: '0.2',
                transform: 'rotate(0deg)',
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                transformOrigin: '100% 50%'
              }"
            ></div>
          </div>
        </div>

        <!-- Text labels -->
        <div 
          v-for="(book, index) in books" 
          :key="`text-${book.id}`"
          class="absolute w-full h-full origin-center"
          :style="{ 
            transform: `rotate(${(360 / books.length) * index}deg)`,
            zIndex: 1
          }"
        >
          <div 
            class="absolute w-1/2 right-0 top-1/2 -translate-y-1/2 px-2 text-left"
            :style="{ transform: `rotate(${180 + (360 / books.length) / 2}deg)` }"
          >
            <span class="text-xs font-medium truncate block text-base-content black">
              {{ book.title }}
            </span>
          </div>
        </div>
      </div>
      <div v-else class="absolute w-full h-full rounded-full border-4 border-base-300 flex items-center justify-center">
        <span class="text-base-content/60">No books to spin</span>
      </div>
      
      <!-- Center circle -->
      <div class="absolute inset-0 m-auto w-4 h-4 rounded-full bg-base-300"></div>
      
      <!-- Pointer -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-2xl">
        ▼
      </div>
    </div>
    
    <button 
      @click="spin" 
      class="btn btn-primary relative z-20"
      :disabled="isSpinning || !books?.length"
    >
      {{ isSpinning ? 'Spinning...' : 'Spin the Wheel!' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  books: Array<{ id: string; title: string }>
}>()

const rotation = ref(0)
const isSpinning = ref(false)
const selectedBook = ref<string | null>(null)

function spin() {
  if (isSpinning.value || !props.books.length) return
  
  isSpinning.value = true
  const extraSpins = 5 // Number of full rotations
  const randomAngle = Math.random() * 360 // Random final position
  const totalRotation = (360 * extraSpins) + randomAngle
  
  // Reset rotation if it gets too large
  if (rotation.value > 3600) {
    rotation.value = rotation.value % 360
  }
  
  rotation.value += totalRotation
  
  setTimeout(() => {
    const finalRotation = rotation.value % 360
    const sectionSize = 360 / props.books.length
    const selectedIndex = props.books.length - Math.floor(finalRotation / sectionSize) - 1
    selectedBook.value = props.books[selectedIndex]?.title || null
    isSpinning.value = false
  }, 3000)
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style> 