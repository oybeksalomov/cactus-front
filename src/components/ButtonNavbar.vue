<template>
    <div id="bottomNavbar" class="py-1 bg-white position-fixed bottom-0">
        <div class="container-fluid">
            <div class="bottomNavbar d-flex justify-content-between">

                <div>
                    <router-link to="/" role="button" class="bottomNavIcon">
                        <i class="bi bi-house-door cactusIcon"></i>
                    </router-link>
                </div>

                <div>
                    <router-link to="/stories" role="button" class="bottomNavIcon">
                        <i class="bi bi-collection-play cactusIcon"></i>
                    </router-link>
                </div>

                <div>
                    <router-link to="/add-post" role="button" class="bottomNavIcon">
                        <img src="./assets/Publish.png" class="rounded-5" alt="publish">
                    </router-link>
                </div>

                <div>
                    <router-link to="/selected-posts" role="button" class="bottomNavIcon">
                        <i class="bi bi-bookmark cactusIcon"></i>
                    </router-link>
                </div>

                <div>
                    <router-link v-bind:to="'/profile/' + getUser.id" role="button" class="bottomNavIcon">
                        <i class="bi bi-person cactusIcon"></i>
                    </router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    name: 'ButtonNavbar',
    computed: {
        ...mapGetters(['getUser'])
    },
    methods: {
        ...mapActions(['fetchAboutMe'])
    },
    mounted() {
        this.fetchAboutMe()
    }
}
</script>

<style scoped>

</style>