<template>
  <div class="p-4">   
    <BookWheel :books="books?.map(b => ({ id: b.bookGuid, title: b.title })) || []" />
  </div>
  <div class="p-4">   
    <div class="card bg-base-100 shadow-xl overflow-hidden">
      <div class="relative">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 h-24 bg-gradient-to-b from-base-300/40 to-transparent"></div>
        
        <div class="card-body relative">
          <h2 class="card-title m-auto">Current Books</h2>  
          <div class="overflow-x-auto">
            <table class="table">
              <thead>
                <tr>
                  <th class="w-10"></th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genres</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="!books?.length">
                  <td colspan="4" class="text-center py-4">
                    <div class="flex flex-col items-center gap-2 text-base-content/60">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <span>No books available</span>
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="book in paginatedBooks" :key="book.bookGuid">
                  <td>
                    <button 
                      @click="deleteBook(book.bookGuid)"
                      class="btn btn-ghost btn-xs text-error"
                    >
                      ✕
                    </button>
                  </td>
                  <td>{{ book.title }}</td>
                  <td>{{ book.author }}</td>
                  <td>{{ book.genres }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="flex justify-center mt-4">
            <div class="join">
              <button 
                class="join-item btn btn-primary btn-sm"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                Previous
              </button>
              <button 
                class="join-item btn btn-primary btn-sm"
                :disabled="currentPage >= totalPages"
                @click="currentPage++"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BookWheel from '../../components/BookWheel.vue'

const currentPage = ref(1)
const itemsPerPage = 10

const { data: books } = await useFetch<Array<{ 
  bookGuid: string; 
  title: string;
  author: string;
  genres: string;
}>>('/api/books')

const paginatedBooks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return books.value?.slice(start, end) || []
})

const totalPages = computed(() => {
  return Math.ceil((books.value?.length || 0) / itemsPerPage)
})

async function deleteBook(bookGuid: string) {
  if (!window.confirm('Are you sure you want to delete this book?')) return

  try {
    await $fetch(`/api/books/${bookGuid}`, {
      //method: 'DELETE'
    })
    console.log('Deleting book:', bookGuid)
    
    const { data } = await useFetch<Array<{ 
      bookGuid: string; 
      title: string;
      author: string;
      genres: string;
    }>>('/api/books')
    
    books.value = data.value

    if (currentPage.value > totalPages.value) {
      currentPage.value = 1
    }
  } catch (error) {
    console.error('Failed to delete book:', error)
  }
}
</script>

<style scoped>

</style>
