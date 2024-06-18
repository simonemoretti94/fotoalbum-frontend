<script>
import { state } from '../../state.js';

export default {
    name: 'AppModal',
    data() {
        return {
            state,
        }
    },
    props: {
        photo: Object,
    }
}

</script>

<template>
    <div class="d-flex justify-content-end">

        <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
            :data-bs-target="`#photo-${photo.id}`">
            Show photo
        </button>
    </div>

    <div class="modal fade" :id="`photo-${photo.id}`" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
        role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered "
            :class="state.wListener ? 'modal-sm' : 'modal-md'" role="document">
            <div class="modal-content back-jumbo-reversed">
                <div class="modal-header">
                    <h5 class="modal-title text-fancy" :id="`modal-title-${photo.id}`">
                        {{ photo.title }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <img v-if="!photo.cover_image.startsWith('https://')" class="img-fluid"
                        :src="state.base_api_url + '/storage/' + photo.cover_image" :alt="photo.title"
                        style="height: 80%;">
                    <img v-else :src="photo.cover_image" class="img-fluid" :alt="photo.title" style="height: 80%;">
                    <div class="overflow-y-auto">

                        <p class="modal-description">
                            {{ photo.description }}
                        </p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>