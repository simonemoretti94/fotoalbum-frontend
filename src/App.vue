<script>
import axios from 'axios';
import AppForm from './components/AppForm.vue';
import AppOffcanvas from './components/AppOffcanvas.vue';
import AppPhotos from './components/AppPhotos.vue';
import { state } from '../state.js';

export default {
  name: 'App',
  components: {
    AppForm,
    AppOffcanvas,
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
    const url = state.base_api_url + state.photos_endpoint;
    console.log(url);
    state.callApi(url);

  }
}
</script>

<template>
  <AppOffcanvas></AppOffcanvas>
  <AppForm></AppForm>
  <AppPhotos></AppPhotos>
</template>