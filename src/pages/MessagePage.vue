<template>
    <div id="chat" class="mainContainer chatContainer bg-white position-relative">
        <div v-if="isChatsLoaded && isMessagesLoaded">
            <div class="chatTop position-fixed top-0" v-if="getChat.user === getUser.id">
                <div class="container-fluid">
                    <div class="d-flex align-items-center py-2">
                        <router-link to="/chats-page">
                            <button type="button" class="backBtn p-0 pe-2">
                                <img src="../components/assets/Back.png" alt="back">
                            </button>
                        </router-link>

                        <div class="avatarContainer">
                            <router-link :to="'/profile/' + getChat.participant">
                                <img :src="getBaseUrl + getChat.participantPicture" class="avatarImg" alt="profile picture">
                            </router-link>
                        </div>

                        <div class="d-flex flex-column justify-content-center px-2">
                            <p class="m-0 fw-semibold">
                                {{ getChat.participantGivenName }} {{ getChat.participantFamilyName }}</p>
                            <p class="fontSizeS fw-semibold opacity-50 m-0">{{ $t('online') }}</p>
                        </div>

                        <div class="d-flex align-items-center ms-auto">
                            <a href="#" class="aButton px-2">
                                <i class="bi bi-camera-video cactusIcon"></i>
                            </a>

                            <a href="#" role="button" class="aButton px-2">
                                <i class="bi bi-flag cactusIcon"></i>
                            </a>

                            <button  class=" iconBtnActive px-2">
                                <i class="bi bi-info-circle cactusIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="chatTop position-fixed top-0" v-else>
                <div class="container-fluid">
                    <div class="d-flex align-items-center py-2">
                        <router-link to="/chats-page">
                            <button type="button" class="backBtn p-0 pe-2">
                                <img src="../components/assets/Back.png" alt="back">
                            </button>
                        </router-link>

                        <div class="avatarContainer">
                            <router-link :to="'/profile/' + getChat.user">
                                <img :src="getBaseUrl + getChat.userPicture" class="avatarImg" alt="profile picture">
                            </router-link>
                        </div>

                        <div class="d-flex flex-column justify-content-center px-2">
                            <p class="m-0 fw-semibold">
                                {{ getChat.userGivenName }} {{ getChat.userFamilyName }}</p>
                            <p class="fontSizeS fw-semibold opacity-50 m-0">{{ $t('online') }}</p>
                        </div>

                        <div class="d-flex align-items-center ms-auto">
                            <a href="#" class="aButton px-2">
                                <i class="bi bi-camera-video cactusIcon"></i>
                            </a>

                            <a href="#" role="button" class="aButton px-2">
                                <i class="bi bi-flag cactusIcon"></i>
                            </a>

                            <button  class=" iconBtnActive px-2">
                                <i class="bi bi-info-circle cactusIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-for="message of this.getMessages"
                v-bind:key="message.id"
                class="container-fluid"
            >
                <div
                    class="row mt-4 mx-auto d-flex justify-content-end"
                    v-if="message.user.email === getUser.email"
                >
                    <h6 class="text-center chatDate">{{ timeAgo(message.createdAt) }}</h6>
                    <div
                        class="col-8 d-flex justify-content-between align-items-center shadow-sm py-3 px-4 userMsgBg chat"
                        :class="{'chatImg': message.media === null}"
                    >
                        <h6 class="mb-0 chatMsg" v-if="message.text.match(/^http.+/)">
                            <a :href="message.text">{{ message.text }}</a>
                        </h6>
                        <h6 class=" mb-0" v-else>{{ message.text }}</h6>
                        <p class="text-end mb-0 ps-2">
                            <i class="fa-solid fa-check-double" v-if="message.hasSeen"></i>
                            <i class="fa-solid fa-check" v-else></i>
                        </p>
                    </div>
                    <div class="col-8 px-0" v-if="message.media !== null">
                        <div class="post__img chatImg" v-if="message.media.contentUrl.match(/^.+\.(jpg|jpeg|png|webp)$/)">
                            <img class="h-100" :src="getBaseUrl + message.media.contentUrl"/>
                        </div>
                        <video class="card-img-top chatImg" controls height="180" v-else>
                            <source :src="getBaseUrl + message.media.contentUrl"/>
                        </video>
                    </div>
                </div>

                <div class="row mt-4 mx-auto" v-else>
                    <h6 class="text-center chatDate">{{ timeAgo(message.createdAt) }}</h6>
                    <div
                        class="col-8 align-items-center py-3 px-4 bg-light shadow-sm chat2"
                        :class="{'chatImg2': message.media === null}"
                    >
                        <h6 class="mb-0 chatMsg" v-if="message.text.match(/^http.+/)">
                            <a :href="message.text">{{ message.text }}</a>
                        </h6>
                        <h6 class=" mb-0" v-else>{{ message.text }}</h6>
                    </div>
                    <div class="col-8 px-0" v-if="message.media !== null">
                        <div class="post__img chatImg2" v-if="message.media.contentUrl.match(/^.+\.(jpg|jpeg|png|webp)$/)">
                            <img class="h-100" :src="getBaseUrl + message.media.contentUrl"/>
                        </div>
                        <video class="card-img-top chatImg2" controls height="180" v-else>
                            <source :src="getBaseUrl + message.media.contentUrl"/>
                        </video>
                    </div>
                </div>
            </div>

            <!-- Send message start -->
            <div class="messageBox position-fixed bottom-0">
                <div class="row search p-2 mx-auto message">
                    <div class="col-10">
                        <input
                            id="file"
                            type="file"
                            hidden
                            accept="video/*,image/*"
                            @change="createPicture($event)"
                        />
                        <label for="file">
                            <i class="fa-solid fa-camera text-white p-3 message message2"></i>
                        </label>
                        <input
                            class="ms-2"
                            type="text"
                            placeholder="Xabar..."
                            v-model="message.text"
                            @keyup.enter="send"
                        />
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <div v-if="isLoading">
                    <span
                        aria-hidden="true"
                        class="spinner-border spinner-border-sm text-secondary"
                        role="status"
                    />
                        </div>
                        <div
                            class="list-inline-item text-primary"
                            @click.prevent="send"
                            v-else
                        >
                            <i class="fa-solid fa-paper-plane fa-xl pointer"></i>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Send message end -->
        </div>

        <div v-else>
            <LoaderRow/>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import formatTime from "@/mixins/formatTime";
import LoaderRow from "@/components/LoaderRow.vue";

export default {
    name: "MessagePage",
    components: {LoaderRow},
    data() {
        return {
            message: {
                chat: '/api/chats/' + this.$route.params.chatId,
                text: '',
                media: ''
            },
            isChatsLoaded: false,
            isMessagesLoaded: false,
            isLoading: false,
            chatId: null
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getChat', 'getMessages', 'getUser', 'getPicture', 'getShareUrl']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchChat','deleteChat', 'fetchMessages', 'pushMessage', 'pushPicture', 'shareUrl']),
        createPicture(event) {
            this.isLoading = true
            this.file = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.file);
            this.pushPicture(formData)
                .then(() => {
                    this.message.media = this.getPicture['@id']
                    this.pushMessage(this.message)
                        .then(() => {
                            this.fetchMessages(this.getChat.id)
                            this.isLoading = false
                        })
                })
        },
        send() {
            if (this.message.text !== '') {
                this.isLoading = true
                this.pushMessage({chat: this.message.chat, text: this.message.text})
                    .then(() => {
                        this.message.text = ''
                        this.fetchMessages(this.getChat.id)
                        this.isLoading = false
                        this.shareUrl(null)
                    })
            }
        }
    },
    beforeUnmount() {
        this.shareUrl('')
    },
    mounted() {
        this.fetchChat(this.$route.params.chatId)
            .then(() => {
                this.isChatsLoaded = true
            })
        this.fetchMessages(this.$route.params.chatId)
            .then(() => {
                this.isMessagesLoaded = true
            })
        this.message.text = this.getShareUrl ? this.getShareUrl : ''
        this.chatId = this.$route.params.chatId
    },
    unmounted() {

        if (this.getMessages.length === 0) {
            this.deleteChat(this.chatId)
        }
    }
}
</script>

<style scoped>
.chat {
    border-top-left-radius: 40px;
}

.chat2 {
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    color: #4c4c4c;
}
.chat h6,
.chat2 h6 {
    width: 100%;
    word-break: break-word;
    white-space: pre-wrap
}

.chatImg {
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
}

.chatImg2 {
    border-bottom-right-radius: 40px;
}

.search {
    border-radius: 5px;
    background: linear-gradient(90.96deg, rgba(151, 151, 189, 0.35) 0%, rgba(151, 151, 189, 0.1) 100%);
    backdrop-filter: blur(5px);
}

.search input {
    background-color: transparent;
    border: none;
    color: #262628;
}

.search input:focus {
    outline: none;
}

.message {
    border-radius: 40px;
}

.fa-paper-plane {
    color: #55a630;
}

.message2 {
    background: linear-gradient(90deg, #55a630 18.23%, #80b918 100%);
    margin-left: -10px;
    cursor: pointer;
}

.messageBox {
    max-width: 425px;
    width: 100%;
    background-color: white;
    padding: 10px 0;
}

.post__img {
    height: 320px;
    position: relative;
    overflow: hidden;
}

.post__img img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.card-img-top {
    background-color: black;
}

.userMsgBg {
    background-color: #38b000;
    color: #fff;
}

.chatTop {
    max-width: 425px;
    width: 100%;
    background-color: #fff;
    z-index: 100;
}
.chatContainer {
    padding-top: 80px;
    padding-bottom: 85px;
}

.chatDate {
    color:#9797bd;
    top: 85px;
    font-size: 0.8rem;
}
</style>
