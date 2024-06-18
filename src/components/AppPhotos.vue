<script>
import { state } from '../../state.js';
import AppModal from './AppModal.vue';

export default {
    name: 'AppPhotos',
    //props: ['passedPhotos'],
    data() {
        return {
            state,

        }
    },
    components: {
        AppModal
    },
    mounted() {
        window.addEventListener('resize', (e) => {
            if (window.innerWidth < 572) {
                state.wListener = true;
            }
            else {
                state.wListener = false;
            }
        });
    },
}
</script>

<template>
    <section v-if="state.photos">
        <div class="container-fluid">
            <div class="row row-cols-sm-3 row-cols-lg-4 g-5">
                <!-- <div class="row row-cols-sm-3 row-cols-lg-4 g-5"
                :class="{ 'justify-content-center': state.photos.length % 2 != 0 }"> -->
                <div class="col" v-for="photo in state.photos.data">
                    <div class="card" style="height: 450px;">

                        <template v-if="!photo.cover_image.startsWith('https://')">
                            <img class="img-b-white" :src="state.base_api_url + '/storage/' + photo.cover_image"
                                :alt="photo.title" style="height: 80%;">
                        </template>
                        <template v-else>
                            <img class="img-b-white" :src="photo.cover_image" :alt="photo.title" style="height: 65%;">
                        </template>

                        <div class="card-body  back-card-f" style="height: 25%;">
                            <p class="text-white it-switch"><i>{{ photo.title }}</i><br></p>
                            <p>
                                <span class="span-if media-span" v-if="state.findCategory(photo.category_id)">{{
                                    state.findCategory(photo.category_id)
                                }}</span>
                                <span class="span-date media-span"
                                    :class="{ 'date-margin': state.findCategory(photo.category_id) }">{{
                                        state.getDate(photo.created_at) }}</span>
                            </p>
                        </div>

                        <div class="card-footer  back-card-f" style="height: 10%;">

                            <AppModal :photo="photo"></AppModal>
                        </div>
                    </div>
                </div>
            </div>

            <!--pagination-->
            <!--<nav class="my-3" aria-label="Page navigation">
                <ul class="pagination    ">
                    <li class="page-item" :class="{ 'd-none': !link.url, 'active': link.active }"
                        v-for="link in state.photos.links">
                        <button class="page-link" :href="link.url" type="button" @click="goTo(link.url)"><span
                                v-html="link.label"></span></button>
                    </li>
                </ul>
            </nav>-->
        </div>
    </section>
</template>

<style scoped>
.row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    padding: 1rem 0;

}

.col {
    flex: 0 0 auto;

    @media screen and (max-width: 576px) {
        width: calc((100% / 12)* 8);
    }

    @media screen and (max-width: 400px) {
        width: calc((100% / 12)* 10);
    }
}

.card {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 0;
}

/*.card:hover {
    filter: drop-shadow(0 0 5px black);
}*/

.img-b-white {
    border-bottom: .1px white solid;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.img-b-white:hover {
    filter: contrast(1.05);
}

.it-switch:hover {
    font-weight: 400;
    transform: skewX(5deg);
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.748);
}

.span-if {
    color: #2fbae4da;
    background-color: rgba(14, 83, 161, 0.747);
    border-radius: 5px;
    text-transform: capitalize;
    padding: .1rem .2rem;
    font-size: 15px;

}

.span-date {
    color: rgba(105, 105, 105);
    background-color: rgba(57, 57, 57);
    border-radius: 5px;
    padding: .1rem .2rem;
    font-size: 15px;
}

.span-if:hover,
.span-date:hover {
    filter: contrast(1.05);
    transform: scale(1.05);
}

.date-margin {
    margin-left: 1.5rem;

    @media screen and (max-width: 1000px) {
        margin-left: .2rem;
    }

    @media screen and (max-width: 576px) {
        margin-left: 1rem;
    }
}

.back-card-f {
    background: linear-gradient(#444444, #444444f3);
}

::-webkit-scrollbar {
    height: 8px;
}

::-webkit-scrollbar-track {
    background: #2c2c2ca4;
    border-bottom: .1px solid rgba(255, 255, 255, 0.575);
}


::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #52057b, #651a8e, #651a8e, #52057b);
    border: solid .1px black;
    border-radius: 2.5px;
    cursor: grabbing;
}

::-webkit-scrollbar-thumb:hover {
    background: #a421ebc5;
}

.media-span {
    @media screen and (max-width: 1255px) {
        font-size: 12px;
    }

    @media screen and (max-width: 1000px) {
        font-size: 9px;
    }

    @media screen and (max-width: 992px) {
        font-size: 11px;
    }

    @media screen and (max-width: 576px) {
        font-size: 12px;
    }

}
</style>