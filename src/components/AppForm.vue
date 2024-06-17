<script>
import { state } from '../../state.js'

export default {
    name: 'AppForm',
    data () {
        return {
            state,
        }
    }
}
</script>

<template>
      <section class="container back-jumbo my-3">
    <h1 class="my-2 text-white">Photos:</h1>

    <div class="back-jumbo-reversed p-2 mb-4 ">

      <form @submit.prevent="state.search()" action="">
        <div class="input-group mb-3 ">
          <input type="search" class="form-control" placeholder="Search a pic..." v-model="state.search_text">
          <button class="btn btn-outline-secondary" type="submit">
            <i class="fas fa-search fa-lg fa-fw"></i>
          </button>
        </div>
      </form>


     
    </div>
  </section>

</template>

<style scoped>
</style>
