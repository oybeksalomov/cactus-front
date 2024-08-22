<template>
    <div id="notification" class="mainContainer notificationBg position-relative">
        <div class="py-3">
            <div class="container-fluid">
                <div class="d-flex align-items-center pb-3">
                    <router-link to="/">
                        <button type="button" class="backBtn p-0 pe-2">
                            <img src="../components/assets/Back.png" alt="back">
                        </button>
                    </router-link>
                    <h5 class="m-0 mx-auto pe-5">{{$t('notification')}}</h5>
                </div>
                <div v-if="isNotificationsLoaded">
                    <div
                        v-for="postLike of getNotifications.models"
                        :key="postLike.id"
                        class="pb-2"
                    >
                        <div class="d-flex align-items-center bg-white p-2 rounded-3">
                            <div class="avatarContainer mb-auto">
                                <router-link :to="'/profile/' + postLike.user.id">
                                    <img :src="getBaseUrl + postLike.user.person.picture.contentUrl"
                                         class="avatarImg" alt="profile picture">
                                </router-link>
                            </div>

                            <div class="d-flex flex-column justify-content-center px-2">
                                <p class="m-0 fw-semibold">
                                    {{ postLike.user.person.givenName }} {{ postLike.user.person.familyName }}
                                    <span class="opacity-50 px-1">{{ timeAgo(postLike.createdAt) }}</span>
                                </p>
                                <p class="m-0 fw-semibold opacity-50">{{ $t('postLike') }}</p>
                            </div>

                            <div class="ms-auto">
                                <router-link :to="'/comment-page/' + postLike.post.id">
                                    <img :src="getBaseUrl + postLike.post.media.contentUrl" class="notificationMedia" alt="post">
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-if="getNotifications.models.length === 0">
                        <p class="fw-semibold text-dark text-center m-0 opacity-50">{{ $t('noNotification') }}</p>
                    </div>
                </div>

                <div v-else>
                    <LoaderRow/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import formatTime from "@/mixins/formatTime"
import LoaderRow from "@/components/LoaderRow.vue";

export default {
    name: "NotificationPage",
    components: {LoaderRow},
    data() {
        return {
            isNotificationsLoaded: false
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getNotifications']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL;
        }
    },
    methods: {
        ...mapActions(['fetchNotifications'])
    },
    mounted() {
        this.fetchNotifications()
            .then(() => this.isNotificationsLoaded = true)
    }
}
</script>

<style scoped>
.notificationBg {
    background-color: #f2f3fa;
}

.notificationMedia {
    width: 45px;
    height: 45px;
    object-fit: cover;
    object-position: center;
    border-radius: 5px;
}
</style>
