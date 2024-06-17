<script>
import { state } from '../../state.js';

export default {
    name: 'AppPhotos',
    //props: ['passedPhotos'],
    data() {
        return {
            state,
        }
    },
}
</script>

<template>
<section v-if="state.photos">
    <div class="container-fluid">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-5">
            <div class="col" v-for="photo in state.photos.data">
                <div class="card" style="height: 450px;">

                    <template v-if="!photo.cover_image.startsWith('https://')">
                        <img class="img-b-white" :src="state.base_api_url + '/storage/' + photo.cover_image" :alt="photo.title"
                            style="height: 80%;">
                    </template>
                    <template v-else>
                        <img class="img-b-white" :src="photo.cover_image" :alt="photo.title" style="height: 65%;">
                    </template>

                    <div class="card-body  back-card-f" style="height: 25%;">
                        <p class="text-white"><i>{{ photo.title }}</i><br></p>
                        <div v-for="category in state.categories" style="display: inline-block;">
                            <span class="span-if" v-if="category.id == photo.category_id">{{ category.name }}</span>
                        </div>
                        <span>{{ state.getDate(photo.created_at) }}</span>
                    </div>

                    <div class="card-footer  back-card-f" style="height: 10%;">

                        <!-- Modal trigger button -->
                        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                            :data-bs-target="`#photo-${photo.id}`">
                            View
                        </button>

                        <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static"
                            data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
                                role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" :id="`modal-title-${photo.id}`">
                                            {{ photo.title }}
                                        </h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body" style="overflow-y: scroll;">

                                        <img v-if="!photo.cover_image.startsWith('https://')" class="img-fluid"
                                            :src="state.base_api_url + '/storage/' + photo.cover_image" :alt="photo.title"
                                            style="height: 80%;">
                                        <img v-else :src="photo.cover_image" class="img-fluid" :alt="photo.title"
                                            style="height: 80%;">
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

        <!--pagination-->
        <nav class="my-3" aria-label="Page navigation">
            <ul class="pagination    ">
                <li class="page-item" :class="{ 'd-none': !link.url, 'active': link.active }"
                    v-for="link in state.photos.links">
                    <button class="page-link" :href="link.url" type="button" @click="goTo(link.url)"><span
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

.row {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 1rem 0;
}
.col {
    flex: 0 0 auto;
}

.card {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border: 0;
}

.img-b-white {
    border-bottom: .1px white solid;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.span-if {
    color: #2fbae4da;
    background-color:rgba(14, 83, 161, 0.747);
    border-radius: 5px;
    text-transform: capitalize;
    padding: .1rem .2rem;
}

.back-card-f {
    background: linear-gradient( #444444 , #444444f3);
}

</style>