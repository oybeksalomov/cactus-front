<template>
    <input type="file" ref="file" id="file" @change="createPicture" hidden/>
    <div
        id="accaunt"
        class="mainContainer mainContainerPadding bg-white position-relative"
    >
        <div id="bgImage" class="accBgImage position-relative position-absolute top-0 start-0">
            <div class="h-100 bg-dark opacity-50"></div>

            <router-link to="/" type="button" class="backBtn backWhite position-absolute border-0 p-0">
                <img src="../components/assets/Back-white.png" alt="back">
            </router-link>

            <div class="dropdown accMenuBtn position-absolute">
                <button
                    class="iconBtnActive"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i class="bi bi-list cactusIcon text-white"></i>
                </button>
                <ul class="dropdown-menu dropdownContent">
                    <li>
                        <button
                            type="button"
                            class="iconBtnActive bg-none fw-bolder d-flex align-items-center"
                            @click="signOut"
                        >
                            <i class="bi bi-box-arrow-in-right fs-4"></i>
                            <span class="ps-3">{{$t('left')}}</span>
                        </button>
                    </li>
                </ul>
            </div>

        </div>

        <div v-if="isProfileLoaded">
            <div
                id="bgContainer"
                class=
                    "accBgContainer
                px-2
                py-3
                bg-white
                rounded-top-5
                position-relative
                position-absolute
                bottom-0
                start-50
                translate-middle-x"
            >
                <div class="avatarContainer position-absolute top-0 start-50 translate-middle">
                    <img
                        :src="getBaseUrl + getParticipant.person.picture.contentUrl"
                        class="accAvatarImg"
                        alt="profile picture"
                    >
                </div>
                <div
                    class="addAvatar position-absolute top-0 start-50 translate-middle"
                    v-if="getUser.id === this.getParticipant.id"
                >
                    <label for="file"><i class="bi bi-plus-circle-dotted cactusIcon pointer"></i></label>
                </div>

                <div class="container-fluid">
                    <div>
                        <div class="d-flex justify-content-evenly pb-3">
                            <router-link :to="'/subscribers/' + getParticipant.id">
                                <div class="text-center text-dark">
                                    <h4 class="text-uppercase fw-bold m-0">{{ getSubscribers.totalItems }}</h4>
                                    <p class="opacity-50 fw-semibold m-0">{{$t('subscribers')}}</p>
                                </div>
                            </router-link>

                            <div style="width: 112px;"></div>

                            <router-link :to="'/subscription/' + getParticipant.id">
                                <div class="text-center text-dark">
                                    <h4 class="text-uppercase fw-bold m-0">{{ getSubscriptions.totalItems }}</h4>
                                    <p class="opacity-50 fw-semibold m-0">{{ $t('subscriptions') }}</p>
                                </div>
                            </router-link>
                        </div>

                        <div class="text-center pb-2">
                            <h4 class="text-uppercase fw-bold m-0">
                                {{ getParticipant.person.givenName }} {{ getParticipant.person.familyName }}</h4>
                            <p class="opacity-50 fw-semibold m-0 py-2">
                                <i class="bi bi-geo-alt px-1">{{ getParticipant.person.city }}</i>
                            </p>
                        </div>

                        <div v-if="getUser.id !== this.getParticipant.id" class="row pb-2">
                            <div class="col-6 ps-0" v-if="getSubscribers.isSubscriber">
                                <button
                                    @click="subscribeToUser"
                                    class="iconBtnActive accFollowBtn p-2 w-100 fw-semibold rounded-5"
                                >
                                    {{ $t('unsubscribe') }}
                                </button>
                            </div>

                            <div class="col-6 ps-0" v-else>
                                <button
                                    class="iconBtnActive accFollowBtn p-2 w-100 fw-semibold rounded-5"
                                    @click="subscribeToUser"
                                >
                                    {{ $t('toSubscribe') }}
                                </button>
                            </div>

                            <div class="col-6 pe-0">
                                <button
                                    class="iconBtnActive shadow p-2 w-100 fw-semibold rounded-5"
                                    @click="send(getParticipant.person)"
                                >
                                    {{ $t('message') }}
                                </button>
                            </div>
                        </div>

                        <div class="d-flex justify-content-around pb-2 opacity-50">
                            <button class="iconBtnActive">
                                <i class="bi bi-border-all cactusIcon tabIconActive"></i>
                            </button>

                            <button class="iconBtnActive">
                                <i class="bi bi-file-earmark-person cactusIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <RandomPostsRow :user="Number(this.$route.params.id)"/>
            </div>
        </div>
        <div v-else>
            <LoaderRow/>
        </div>
        <ButtonNavbar/>
    </div>
</template>

<script>

import ButtonNavbar from "@/components/ButtonNavbar.vue";
import {mapActions, mapGetters, mapMutations} from "vuex";
import RandomPostsRow from "@/components/RandomPostsRow.vue";
import LoaderRow from "@/components/LoaderRow.vue";

export default {
    name: 'ProfilePage',
    components: {
        LoaderRow,
        RandomPostsRow,
        ButtonNavbar
    },
    data() {
        return {
            isProfileLoaded: false
        }
    },
    computed: {
        ...mapGetters([
            'getUser',
            'getParticipant',
            'getSubscribers',
            'getSubscriptions',
            'getChats',
            'getChatId',
            'getPicture'
        ]),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        },
    },
    methods: {
        ...mapActions([
            'fetchUser',
            'fetchSubscribers',
            'fetchSubscriptions',
            'pushSubscription',
            'deleteSubscriber',
            'fetchChats',
            'pushChat',
            'pushPicture',
            'changePersonPicture'
        ]),
        ...mapMutations(['clearTokens']),
        subscriptionInformations(id) {
            this.fetchSubscriptions(id)
            this.fetchSubscribers(id)
        },
        subscribeToUser() {
            this.pushSubscription({follow: this.getParticipant['@id']})
                .then(() => this.subscriptionInformations(this.getParticipant.id))
        },
        send(person) {
            for (const chat of this.getChats) {
                if (chat.participantPerson.id === this.getParticipant.id || chat.userPerson.id === this.getParticipant.id) {
                    return this.$router.push('/chat/' + chat.id)
                }
            }

            this.pushChat({participant: '/api/users/' + person.id})
                .then(() => {
                    this.$router.push('/chat/' + this.getChatId)
                })
        },
        createPicture() {
            this.file = this.$refs.file.files[0];
            const formData = new FormData();
            formData.append('file', this.file);
            if (this.file.name.match(/^.+\.(jpg|jpeg|png|webp)$/)) {
                this.pushPicture(formData)
                    .then(() => {
                        this.changePersonPicture(
                            {id: this.getUser.id, picture: {picture: this.getPicture['@id']}})
                            .then(() => {
                                this.fetchUser(this.getUser.id)
                            })
                    })
            }
        },
        signOut() {
            this.clearTokens()
            this.$router.push('/login')
        }
    },
    mounted() {
        this.fetchUser(this.$route.params.id)
            .then(() => {
                this.subscriptionInformations(this.getParticipant.id)
                this.isProfileLoaded = true
            })
        this.fetchChats()
    },
    watch: {
        '$route.params.id'() {
            this.fetchUser(this.$route.params.id)
                .then(() => {
                this.subscriptionInformations(this.getParticipant.id)
                this.isProfileLoaded = true
            })
            this.fetchChats()
        }
    }
}
</script>

<style scoped>
.accFollowBtn {
    background-color: #43a2fa;
    color: #fff;
}

.accBgImage {
    background-image: url('../components/images/post-8.jpg');
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    height: 30vh;
    width: 100%;
}
.addAvatar {
    width: 32px;
    height: 32px;
    text-align: center;
    border-radius: 50%;
    background-color: white;
    opacity: 50%;
}
.dropdownContent {
    inset: 0 0 auto auto !important;
    padding: 0.5rem;
}
</style>
