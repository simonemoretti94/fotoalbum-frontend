<script>
import { state } from '../../state.js'

export default {
  name: 'AppOffcanvas',
  data() {
    return {
      state,
    }
  }
}
</script>

<template>
  <button class="btn btn-link position-fixed end-0 z-1" type="button" data-bs-toggle="offcanvas"
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
                placeholder="yourmail@example.com" v-model="state.email" />
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
</template>