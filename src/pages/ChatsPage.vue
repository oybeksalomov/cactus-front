<template>
    <div id="message" class="mainContainer bg-white position-relative">
        <div class="container-fluid pt-3">
            <div class="d-flex align-items-center pb-3">
                <router-link to="/">
                    <button type="button" class="backBtn p-0 pe-2">
                        <img src="../components/assets/Back.png" alt="back">
                    </button>
                </router-link>

                <h5 class="m-0 mx-auto">{{$t('messages')}}</h5>

                <router-link to="/search-page">
                    <button class=" iconBtnActive px-2">
                        <i class="bi bi-search cactusIcon"></i>
                    </button>
                </router-link>
            </div>
        </div>

        <div v-if="isChatsLoaded">
            <div class="comments" v-if="getChats.length === 0">
                <div class="container-fluid">
                    <div class="comments py-3">
                        <p class="fw-semibold text-dark text-center m-0 opacity-50">{{ $t('noChats') }}</p>
                    </div>
                </div>
            </div>

            <div class="mt-5" v-else>
                <div
                    v-for="chat of getChats" :key="chat.id"
                    class="pb-2 px-1 border-bottom"
                >
                    <router-link :to="'/chat/' + chat.id">
                        <div
                            v-if="chat.userEmail === getUser.email"
                            class="d-flex align-items-center bg-white p-2 rounded-3"
                        >
                            <div class="avatarContainer mb-auto">
                                <a href="#">
                                    <img
                                        :src="getBaseUrl + chat.participantPerson.picture.contentUrl"
                                        class="avatarImg"
                                        alt="profile picture"
                                    >
                                </a>
                            </div>
                            <div class="d-flex flex-column justify-content-center px-2">
                                <p class="m-0 fw-semibold text-dark">
                                    {{ chat.participantPerson.givenName }} {{ chat.participantPerson.familyName }}
                                    <span class="opacity-50 px-1">{{ timeAgo(chat.messageCreatedAt) }}</span>
                                </p>
                                <p class="msgActive m-0 fw-semibold">{{ chat.messageText }}</p>
                            </div>
                            <div class="ms-auto" v-if="chat.unSeenNumber > 0">
                                <div
                                    class="msgNotification rounded-circle d-flex align-items-center justify-content-center">
                                    <h6 class="text-white m-0 p-0 fw-semibold">{{ chat.unSeenNumber}}</h6>
                                </div>
                            </div>
                        </div>

                        <div v-else class="d-flex align-items-center bg-white p-2 rounded-3">
                            <div class="avatarContainer mb-auto">
                                <a href="#">
                                    <img
                                        :src="getBaseUrl + chat.userPerson.picture.contentUrl"
                                        class="avatarImg"
                                        alt="profile picture"
                                    >
                                </a>
                            </div>
                            <div class="d-flex flex-column justify-content-center px-2">
                                <p class="m-0 fw-semibold text-dark">
                                    {{ chat.userPerson.givenName }} {{ chat.userPerson.familyName }}
                                    <span class="opacity-50 px-1">{{ timeAgo(chat.messageCreatedAt) }}</span>
                                </p>
                                <p class="msgActive m-0 fw-semibold">{{ chat.messageText }}</p>
                            </div>
                            <div class="ms-auto" v-if="chat.unSeenNumber > 0">
                                <div
                                    class="msgNotifCon rounded-circle d-flex align-items-center justify-content-center">
                                    <h6 class="text-white m-0 p-0 fw-semibold">{{ chat.unSeenNumber}}</h6>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

        <div v-else>
            <LoaderRow/>
        </div>
        <ButtonNavbar/>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import formatTime from "@/mixins/formatTime";
import LoaderRow from "@/components/LoaderRow.vue";
import ButtonNavbar from "@/components/ButtonNavbar.vue";

export default {
    name: "MessagePage",
    components: {ButtonNavbar, LoaderRow},
    data() {
        return {
            isChatsLoaded: false,
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getChats', 'getUser']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchChats'])
    },
    mounted() {
        // Hozircha bu yerga setTimeOut qo'ydim, bo'masa delete bo'lgan chatlarni ham olib qo'yyapti
        setTimeout(()=>{
            this.fetchChats()
                .then(() => {
                    this.isChatsLoaded = true
                })
        }, 1000)
    }
}
</script>

<style scoped>
.msgNotification {
    width: 1.8rem;
    height: 1.8rem;
    background-color: #43a2fa;
}

.msgActive {
    color: #43a2fa;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    width: 100%;
    word-break: break-all;
    white-space: pre-wrap
}
</style>
