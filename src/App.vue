<script>
import axios from 'axios';
import AppForm from './components/AppForm.vue';
// import AppOffcanvas from './components/AppOffcanvas.vue';
import AppPhotos from './components/AppPhotos.vue';
import { state } from '../state.js';

export default {
  name: 'App',
  components: {
    AppForm,
    // AppOffcanvas,
    AppPhotos,
  },
  data() {
    return {
      state,
    }
  },
  methods: {

  },
  mounted() {
    //getting photos index
    const url = state.base_api_url + state.photos_endpoint;
    console.log(url);
    state.callApi(url);

    //getting categories
    const url2 = state.base_api_url + state.categories_endpoint;
    console.log(url2);
    state.callApi(url2);


  }
}
</script>

<template>
  <AppForm></AppForm>
  <!-- <AppOffcanvas></AppOffcanvas> -->
  <AppPhotos></AppPhotos>
</template>