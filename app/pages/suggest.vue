<template>
  <div class="w-1/2 m-auto flex justify-center">
    SUGGEST NEW BOOKS
  </div>
  <div class="flex justify-center">
    <div class="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
   <!--      <UForm :validate="validate" :state="state" @submit="onSubmit">
          <UFormGroup size="md" label="Title" name="title">
            <UInput v-model="state.title" />
          </UFormGroup>
          <UFormGroup size="md" label="Author" name="author">
            <UInput v-model="state.author" />
          </UFormGroup>
          <UFormGroup size="md" label="Genre" name="genre">
            <UCheckbox v-model="state.isRomance" name="Romance" label="Romance" />
            <UCheckbox v-model="state.isSciFi" name="SciFi" label="Sci-fi/Dystopia" />
            <UCheckbox v-model="state.isMystery" name="Mystery" label="Mystery/Thriller" />
            <UCheckbox v-model="state.isContemporary" name="Contemporary" label="Contemporary" />
            <UCheckbox v-model="state.isFantasy" name="Fantasy" label="Fantasy" />
          </UFormGroup>       
        </UForm> -->
        <input type="text" placeholder="Title" class="input input-bordered w-full max-w-xs" />
        <input type="text" placeholder="Author" class="input input-bordered w-full max-w-xs" />
      </figure>
      <div class="card-body">
        <h2 class="card-title"></h2>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { data: genres } = await useFetch('/api/genres')

  import type { FormError, FormSubmitEvent } from '#ui/types'

  const state = reactive({
    title: undefined,
    author: undefined,
    isRomance: undefined,
    isSciFi: undefined,
    isMystery: undefined,
    isContemporary: undefined,
    isFantasy: undefined
  })

  const validate = (state: any): FormError[] => {
    const errors = []
    if (!state.title) errors.push({ path: 'title', message: 'Required' })
    if (!state.author) errors.push({ path: 'author', message: 'Required' })
    if (!state.isRomance && !state.isSciFi && !state.isMystery && !state.isContemporary && !state.isFantasy) errors.push({ path: 'genre', message: 'Required' })
    return errors
  }

  async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with data
    console.log(event.data)
  }
</script>

<style>

</style>