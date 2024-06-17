import { reactive } from 'vue';
import axios from 'axios';

export const state = reactive({
    ciao: 'hello world!',

    // variables
    base_api_url: 'http://127.0.0.1:8000',
    photos_endpoint: '/api/photos',
    categories_endpoint: '/api/categories',
    photos: '',
    categories: '',
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
                if (url.startsWith(this.base_api_url + this.photos_endpoint)) {
                    state.photos = response.data.results;
                }
                else {
                    state.categories = response.data.results.data;
                }
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

    submitMessage() {
        state.loading = true;

        // creating the payload
        const payload = {
            email: state.email,
            name: state.name,
            message: state.message,
        }

        console.log(payload);

        // send a post request
        axios.post('http://127.0.0.1:8000/api/contacts', payload)
            .then(response => {
                console.log(response);
                state.loading = false;

                if (response.data.success) {
                    state.success = 'Thanks for your message';
                    state.error = false;
                    state.email = '';
                    state.name = '';
                    state.message = '';
                }
                else {
                    console.log(response);
                    state.errors = response.data.errors;
                    state.success = false;
                }

            })
            .catch(error => {

            });

    },

    getDate(date) {
        let objDate = new Date(date).toString().split(' ').slice(0, 4).join(' ');
        /*let tempDate = objDate.toString().split(' ');
        let newDate = tempDate.slice(0, 4).join(' ')
        console.log(newDate, ' \n ', tempDate);*/
        console.log(objDate);
        return objDate;
    },
    findCategory(id) {
        let category = this.categories.find(element => id == element.id);
        if (category) {
            console.log(category.name);
            return category.name;
        } else {
            return null;
        }
    }
});