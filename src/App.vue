<script>
import axios from 'axios';
import AppPhotos from './components/AppPhotos.vue';
import { state } from '../state.js';

export default {
  name: 'App',
  components: {
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

  <button class="btn btn-link position-fixed end-0" type="button" data-bs-toggle="offcanvas"
    data-bs-target="#contactsForm" aria-controls="contactsForm">
    Contacts
  </button>

  <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="contactsForm"
    aria-labelledby="staticBackdropLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="staticBackdropLabel">
        Contact us
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="alert alert-success" role="alert" v-if="state.success">
          <strong>Success</strong> {{ state.success }}
        </div>

        <div class="alert alert-danger" role="alert" v-if="state.errors">
          <strong>There are some errors:</strong>
          <ul>
            <li v-for="error in state.errors">{{ error[0] }}</li>
          </ul>
        </div>


        <p>Contact me, I'll get back as soon as possible</p>

        <form @submit.prevent="state.submitMessage()">

          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <div class="mb-3">
              <input type="text" class="form-control" name="email" id="email" aria-describedby="emailHelper"
                placeholder="abc@mail.com" v-model="state.email" />
              <small id="helpId" class="form-text text-muted">Type a valid e-mail</small>
            </div>

          </div>

          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <div class="mb-3">
              <input type="text" class="form-control" name="name" id="name" aria-describedby="nameHelper"
                placeholder="John Doe" v-model="state.name" />
              <small id="helpId" class="form-text text-muted">Type your name and surname</small>
            </div>

          </div>

          <div class="mb-3">
            <label for="" class="form-label">Message</label>
            <textarea class="form-control" name="message" id="message" rows="6" v-model="state.message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :class="{ 'disabled btn-secondary': state.loading }">
            {{ state.loading ? 'Sending...📧' : 'Submit' }}
          </button>

        </form>

      </div>

    </div>
  </div>


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


  <section v-if="state.photos">
    <!-- <AppPhotos :passedPhotos="photos"></AppPhotos> --> <!--functions and data need to be shared into state.js-->
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
        <div class="col" v-for="photo in state.photos.data">
          <div class="card" style="height: 450px;">

            <template v-if="!photo.cover_image.startsWith('https://')">
              <img :src="state.base_api_url + '/storage/' + photo.cover_image" :alt="photo.title" style="height: 80%;">
            </template>
            <template v-else>
              <img :src="photo.cover_image" :alt="photo.title" style="height: 65%;">
            </template>

            <div class="card-body" style="height: 25%;">
              <p><b>{{ photo.title }}</b><br>
                {{ photo.description }}
              </p>
            </div>

            <div class="card-footer" style="height: 10%;">

              <!-- Modal trigger button -->
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                :data-bs-target="`#photo-${photo.id}`">
                View
              </button>

              <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static"
                data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" :id="`modal-title-${photo.id}`">
                        {{ photo.title }}
                      </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="overflow-y: scroll;">

                      <img v-if="!photo.cover_image.startsWith('https://')" class="img-fluid"
                        :src="state.base_api_url + '/storage/' + photo.cover_image" :alt="photo.title"
                        style="height: 80%;">
                      <img v-else :src="photo.cover_image" class="img-fluid" :alt="photo.title" style="height: 80%;">
                      <p>
                        {{ photo.description }}
                      </p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                      </button>
                      <!-- <button type="button" class="btn btn-primary">Save</button> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="my-3" aria-label="Page navigation">
        <ul class="pagination    ">
          <li class="page-item" :class="{ 'd-none': !link.url, 'active': link.active }"
            v-for="link in state.photos.links">
            <button class="page-link" :href="link.url" type="button" @click="state.goTo(link.url)"><span
                v-html="link.label"></span></button>
          </li>
        </ul>
      </nav>
    </div>



  </section>

</template>

<style scoped>
div.card-body {
  overflow-y: scroll;
}
</style>
