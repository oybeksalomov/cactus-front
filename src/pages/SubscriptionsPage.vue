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
                    <h5 class="m-0 mx-auto pe-5">{{ $t('subscriptions') }}</h5>
                </div>
                <div
                    v-for="subscription of getSubscriptions.models"
                    :key="subscription.id"
                    class="pb-2">
                    <div
                        class="d-flex align-items-center bg-white p-2 rounded-3">
                        <div class="avatarContainer mb-auto">
                            <router-link :to="'/profile/' + subscription.follow.id">
                                <img :src="getBaseUrl + subscription.follow.person.picture.contentUrl" class="avatarImg"
                                     alt="profile picture">
                            </router-link>
                        </div>
                        <div
                            class="d-flex flex-column justify-content-center px-2">
                            <p class="m-0 fw-semibold">
                                {{ subscription.follow.person.givenName }}
                                {{ subscription.follow.person.familyName }}
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
    name: "SubscriptionsPage",
    computed: {
        ...mapGetters(['getSubscriptions', 'getParticipant']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchSubscriptions']),
    },
    mounted() {
        this.fetchSubscriptions(this.$route.params.id)
    }
}
</script>

<style scoped>

</style>