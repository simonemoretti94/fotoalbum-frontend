<script>
import { state } from '../../state.js';
import AppOffcanvas from './AppOffcanvas.vue';

export default {
  name: 'AppForm',
  data() {
    return {
      state,

      showForm: true,
    }
  },
  components: {
    AppOffcanvas,
  },
  methods: {
    openClose() {
      this.showForm = !this.showForm;
    }
  }
}
</script>

<template>
  <section class="container back-jumbo my-3 position-relative">
    <div>
      <div v-if="!showForm">
        <p v-on:click="openClose()" class="text-white col-9"><i class="fa-solid fa-sort-down"></i><small
            class="ms-1">search</small>
        </p>
        <AppOffcanvas></AppOffcanvas>
      </div>

    </div>
    <h1 v-if="showForm" class="my-2 text-white">Photos:</h1>
    <i v-if="showForm" class="fa-regular fa-circle-xmark position-absolute pos-icon" v-on:click="openClose()"></i>

    <div v-if="showForm" class="back-jumbo-reversed p-2 mb-4 ">

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
.pos-icon {
  top: 4%;
  right: 0.5%;
  font-size: 20px;
  color: white;

  @media screen and (max-width: 720px) {
    right: 2%;
  }
}
</style>
