<template>
  <div class="flex items-center justify-center p-4">
    <div class="card w-96 bg-base-100 shadow-xl overflow-hidden">
      <div class="relative">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 h-24 bg-gradient-to-b from-base-300/40 to-transparent"></div>
        
        <div class="card-body relative">
          <h2 class="card-title mb-4">Suggest a Book</h2>
          
          <form @submit.prevent="handleSubmit" method="post">
            <div class="form-control w-full mb-4">
              <input type="text" 
                     v-model="state.title"
                     placeholder="Book Title" 
                     :class="{'input-error': errors.title}"
                     class="input input-bordered w-full" />
              <label v-if="errors.title" class="label">
                <span class="label-text-alt text-error">Title is required</span>
              </label>
            </div>

            <div class="form-control w-full mb-4">
              <input type="text" 
                     v-model="state.author"
                     placeholder="Author Name" 
                     :class="{'input-error': errors.author}"
                     class="input input-bordered w-full" />
              <label v-if="errors.author" class="label">
                <span class="label-text-alt text-error">Author is required</span>
              </label>
            </div>

            <div class="form-control w-full mb-4">
              <div class="flex flex-col gap-2">
                <div v-if="errors.genre" class="text-error label-text mb-2">
                  Select at least one genre
                </div>
                <label class="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" v-model="state.isRomance" class="checkbox" />
                  <span class="label-text">Romance</span>
                </label>
                <label class="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" v-model="state.isSciFi" class="checkbox" />
                  <span class="label-text">Sci-fi/Dystopia</span>
                </label>
                <label class="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" v-model="state.isMystery" class="checkbox" />
                  <span class="label-text">Mystery/Thriller</span>
                </label>
                <label class="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" v-model="state.isContemporary" class="checkbox" />
                  <span class="label-text">Contemporary</span>
                </label>
                <label class="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" v-model="state.isFantasy" class="checkbox" />
                  <span class="label-text">Fantasy</span>
                </label>
              </div>
            </div>

            <div class="card-actions justify-end">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { data: genres } = await useFetch('/api/genres')

  const state = reactive({
    title: undefined,
    author: undefined,
    isRomance: undefined,
    isSciFi: undefined,
    isMystery: undefined,
    isContemporary: undefined,
    isFantasy: undefined
  })

  const errors = reactive({
    title: false,
    author: false,
    genre: false
  })

  function validate(): boolean {
    errors.title = !state.title
    errors.author = !state.author
    errors.genre = !(state.isRomance || state.isSciFi || state.isMystery || 
                    state.isContemporary || state.isFantasy)
    
    return !errors.title && !errors.author && !errors.genre
  }

  async function handleSubmit(e: Event) {
    e.preventDefault()
    if (validate()) {
      // Do something with data
      console.log(state)
    }
  }
</script>

<style>

</style>