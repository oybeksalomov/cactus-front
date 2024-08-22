<template>
    <div id="search" class="mainContainer bg-white position-relative">
        <div class="py-3">
            <div class="container-fluid">
                <div class="d-flex align-items-center pb-3">
                    <router-link to="/">
                        <button type="button" class="backBtn p-0 pe-2">
                            <img src="../components/assets/Back.png" alt="back">
                        </button>
                    </router-link>
                    <h5 class="m-0 mx-auto pe-5">{{ $t('search') }}</h5>
                </div>
                <form class="searchContainer bg-light p-2 d-flex rounded-5">
                    <button type="button" class="iconBtnActive searchBtn pe-2">
                        <i class="bi bi-search cactusIcon"></i>
                    </button>
                    <input
                        type="text"
                        :placeholder="$t('search')"
                        class="searchInput w-100"
                        v-model="person"
                        @input="search"
                    >
                </form>
            </div>
        </div>

        <div class="pb-2" v-if="getPersonGivenName.length">
            <div
                v-for="person of getPersonGivenName"
                :key="person.id"
                class="d-flex align-items-center bg-white p-2 rounded-3"
            >
                <div class="avatarContainer mb-auto">
                    <router-link :to="'/profile/' + person.id">
                        <img :src="getBaseUrl + person.picture.contentUrl" class="avatarImg" alt="profile picture">
                    </router-link>
                </div>

                <div class="d-flex flex-column justify-content-center px-2">
                    <p class="m-0 fw-semibold">{{ person.givenName }} {{ person.familyName }}</p>
                    <i class="bi bi-geo-alt px-1">{{ person.city }}</i>
                </div>
            </div>
        </div>
       <RandomPostsRow v-else/>
    </div>
</template>

<script>

import RandomPostsRow from "@/components/RandomPostsRow.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "SearchPage",
    components: {RandomPostsRow},
    data() {
        return {
            person: ''
        }
    },
    computed: {
        ...mapGetters(['getPersonGivenName']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchPersonGivenName']),
        search() {
            this.fetchPersonGivenName(this.person)
            console.log(this.person)
        }
    },
    mounted() {
        this.fetchPersonGivenName()
    }
}
</script>

<style scoped>

</style>
