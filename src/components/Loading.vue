<template>
    <div>
        <div class="loading">
            <div class="container">
                <Gauge style="transform: scale(4); margin-left: auto; margin-right: auto;"></Gauge>
                <p class="text-white text-center" z-index="9999" style=" margin-top:50px;">
                    Loading {{ parseInt(pageNumber / totalPages * 100) }}%
                </p>
            </div>

        </div>


    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import {Gauge} from 'vue-loading-spinner'
    export default {
        computed: {
            ...mapGetters({
                totalPages: 'getTotalPages',
                pageNumber: 'getPageNumber'
            }),
        },
        name: "Loading",
        components: {
            Gauge
        },
    }
</script>

<style scoped>
    .loading {
        position: fixed;
        z-index: 99;
        height: auto;
        width: 100%;
        overflow: show;
        margin: auto;
        margin-top: 10%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    /* Transparent Overlay */
    .loading:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .8);
    }

    .container {
        position:relative;
    }
</style>