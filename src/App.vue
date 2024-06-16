<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      base_api_url: 'http://127.0.0.1:8000',
      photos_endpoint: '/api/photos',
      photos: '',
      search_text: '',
      email: '',
      name: '',
      message: '',
      success: false,
      errors: false,
      loading: false,
    }
  },
  methods: {
    callApi(url) {
      axios
        .get(url)
        .then(response => {
          console.log(response);
          this.photos = response.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    },
    search() {
      const url = this.base_api_url + this.photos_endpoint + `/filtered?search=${this.search_text}`;
      console.log('search URL: ', url);
      this.callApi(url);
    },
    goTo(url) {
      console.log('goTo URL: ', url);
      this.callApi(url);
    },

    // contact form
    submitMessage() {
      this.loading = true;

      // creating the payload
      const payload = {
        email: this.email,
        name: this.name,
        message: this.message,
      }

      console.log(payload);

      // send a post request
      axios.post('http://127.0.0.1:8000/api/contacts', payload)
        .then(response => {
          console.log(response);
          this.loading = false;

          if (response.data.success) {
            this.success = 'Thanks for your message';
            this.error = false;
            this.email = '';
            this.name = '';
            this.message = '';
          }
          else {
            console.log(response);
            this.errors = response.data.errors;
            this.success = false;
          }

        })
        .catch(error => {

        });

      //handle the response

    },
  },
  mounted() {
    const url = this.base_api_url + this.photos_endpoint;
    console.log(url);
    this.callApi(url);

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
        Get in touch
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        <div class="alert alert-success" role="alert" v-if="success">
          <strong>Success</strong> {{ success }}
        </div>

        <div class="alert alert-danger" role="alert" v-if="errors">
          <strong>There are some errors:</strong>
          <ul>
            <li v-for="error in errors">{{ error[0] }}</li>
          </ul>
        </div>


        <p>Contact me, I'll get back as soon as possible</p>

        <form @submit.prevent="submitMessage()">

          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <div class="mb-3">
              <input type="text" class="form-control" name="email" id="email" aria-describedby="emailHelper"
                placeholder="abc@mail.com" v-model="email" />
              <small id="helpId" class="form-text text-muted">Type a valid e-mail</small>
            </div>

          </div>

          <div class="mb-3">
            <label for="name" class="form-label">Name</label>
            <div class="mb-3">
              <input type="text" class="form-control" name="name" id="name" aria-describedby="nameHelper"
                placeholder="John Doe" v-model="name" />
              <small id="helpId" class="form-text text-muted">Type your name and surname</small>
            </div>

          </div>

          <div class="mb-3">
            <label for="" class="form-label">Message</label>
            <textarea class="form-control" name="message" id="message" rows="6" v-model="message"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" :class="{ 'disabled': this.loading }">
            {{ loading ? 'Sending...📧' : 'Submit' }}
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

        <form @submit.prevent="search()" action="">
          <div class="input-group mb-3">
            <input type="search" class="form-control" placeholder="search..." v-model="search_text">
            <button class="btn btn-outline-secondary" type="submit">
              <i class="fas fa-search fa-lg fa-fw"></i>
            </button>
          </div>
        </form>


      </div>
    </div>
  </section>




</template>

<style scoped>
div.card-body {
  overflow-y: scroll;
}
</style>
