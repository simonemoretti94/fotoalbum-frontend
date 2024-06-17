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
      <section class="container">
    <h1 class="my-2">Photos:</h1>

    <div class="p-5 mb-4 bg-light rounded-3">
      <div class="container-fluid py-5">
        <h1 class="display-5 fw-bold">Blog</h1>
        <p class="col-md-8 fs-4">
          Read our amazing blog
        </p>

        <form @submit.prevent="state.search()" action="">
          <div class="input-group mb-3">
            <input type="search" class="form-control" placeholder="search..." v-model="state.search_text">
            <button class="btn btn-outline-secondary" type="submit">
              <i class="fas fa-search fa-lg fa-fw"></i>
            </button>
          </div>
        </form>


      </div>
    </div>
  </section>

</template>