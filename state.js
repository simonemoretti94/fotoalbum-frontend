import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    ciao: 'hello world!',

    // variables
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

    // methods
    callApi(url) {
        axios
            .get(url)
            .then(response => {
                console.log(response);
                state.photos = response.data.results;
            })
            .catch(error => {
                console.error(error);
            });
    },
});