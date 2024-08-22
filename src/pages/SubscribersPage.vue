<template>
    <div id="notification" class="mainContainer notificationBg position-relative">
        <div class="py-3">
            <div class="container-fluid">
                <div class="d-flex align-items-center pb-3">
                    <router-link :to="'/profile/' + getParticipant.id">
                        <button type="button" class="backBtn p-0 pe-2">
                            <img src="../components/assets/Back.png" alt="back">
                        </button>
                    </router-link>
                    <h5 class="m-0 mx-auto pe-5">{{ $t('subscribers') }}</h5>
                </div>
                <div
                    v-for="subscriber of getSubscribers.models"
                    :key="subscriber.id"
                    class="pb-2">
                    <div class="d-flex align-items-center bg-white p-2 rounded-3">
                        <div
                            class="avatarContainer mb-auto">
                            <router-link :to="'/profile/' + subscriber.user.id">
                                <img :src="getBaseUrl + subscriber.user.person.picture.contentUrl" class="avatarImg"
                                     alt="profile picture">
                            </router-link>
                        </div>
                        <div
                            class="d-flex flex-column justify-content-center px-2">
                            <p class="m-0 fw-semibold">
                                {{ subscriber.user.person.givenName }}
                                {{ subscriber.user.person.familyName }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    name: "SubscribersPage",
    computed: {
        ...mapGetters(['getSubscribers', 'getParticipant']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchSubscribers'])
    },
    mounted() {
        this.fetchSubscribers(this.$route.params.id)
    }
}
</script>

<style scoped>

</style>