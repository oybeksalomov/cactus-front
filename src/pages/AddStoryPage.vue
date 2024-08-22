<template>
    <div id="storyUpload" class="mainContainer position-relative">
        <div class="storyInfo">
            <div class="h-100 d-flex flex-column py-3" v-if="isProfileLoaded">
                <div class="d-flex align-items-center px-2 pb-2">
                    <div class="px-1">
                        <router-link to="/" role="button" class="bottomNavIcon">
                            <i class="bi bi-x cactusIcon text-white"></i>
                        </router-link>
                    </div>

                    <div class="d-flex ms-auto">
                        <div class="px-1">
                            <input
                                id="file"
                                type="file"
                                hidden
                                accept="video/*"
                                @change="createPicture($event)"
                            />
                            <label class="iconBtnActive pointer" for="file">
                                <i class="bi bi-download cactusIcon text-white"></i>
                            </label>
                        </div>

                        <div class="px-1">
                            <button type="button" class="iconBtnActive">
                                <i class="bi bi-paperclip cactusIcon text-white"></i>
                            </button>
                        </div>

                        <div class="px-1">
                            <button type="button" class="iconBtnActive">
                                <i class="bi bi-emoji-smile cactusIcon text-white"></i>
                            </button>
                        </div>

                        <div class="px-1">
                            <button type="button" class="iconBtnActive">
                                <i class="bi bi-type cactusIcon text-white"></i>
                            </button>
                        </div>
                    </div>
                </div>

                <div class="storyContainer">
                    <video
                        v-if="videoSrc"
                        ref="videoPlayer"
                        :src="videoSrc"
                        controls
                        autoplay
                        class="storyMedia"
                    ></video>
                    <img
                        v-else
                        alt="story"
                        class="storyMedia"
                        src="@/components/images/story-1.jpg"
                    >
                </div>

                <div class="d-flex align-items-center mt-3">
                    <div class="avatarContainer mx-2">
                        <router-link :to="'/profile/' + getUser.id">
                            <img
                                :src="getBaseUrl + getUser.person.picture.contentUrl"
                                alt="profile picture"
                                class="avatarImg">
                        </router-link>
                    </div>

                    <div class="d-flex flex-column justify-content-center px-2 text-white">
                        <p class="m-0 fw-semibold">{{ getUser.person.givenName }}</p>
                    </div>

                    <div class="d-flex ms-auto">
                        <div class="px-1">
                            <button class="iconBtnActive rightButton rounded-circle" type="button">
                                    <span
                                        v-if="isLoading"
                                        aria-hidden="true"
                                        class="spinner-border spinner-border-sm text-secondary"
                                        role="status"
                                    />
                                <i class="bi bi-chevron-right text-white" @click="createStory" v-else></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <LoaderRow/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoaderRow from "@/components/LoaderRow.vue";

export default {
    name: 'AddStoryPage',
    components: {LoaderRow},
    data() {
        return {
            story: {
                media: ''
            },
            isProfileLoaded: false,
            isLoading: false,
            videoSrc: null,
            formData: null
        }
    },
    computed: {
        ...mapGetters(['getUser', 'getPicture']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        },
    },
    methods: {
        ...mapActions(['fetchAboutMe', 'pushPicture', 'pushStory']),
        createPicture(event) {
            this.file = event.target.files[0]
            this.formData = new FormData();
            this.formData.append('file', this.file);
            this.videoSrc = URL.createObjectURL(this.file);
        },
        createStory() {
            if (this.formData) {
                this.isLoading = true
                this.pushPicture(this.formData)
                    .then(() => {
                        this.story.media = this.getPicture['@id']
                        this.pushStory(this.story)
                            .then(() => {
                                this.$router.push('/')
                            })
                    })
            }
        }
    },
    mounted() {
        this.fetchAboutMe()
            .then(() => {
                this.isProfileLoaded = true
            })
    }
}
</script>

<style scoped>
.storyContainer {
    height: calc(100% - 100px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.storyMedia {
    max-width: 100%;
    max-height: 100%;
}

.storyInfo {
    height: 100vh;
    width: 100%;
    background-color: #262628;
}
</style>
