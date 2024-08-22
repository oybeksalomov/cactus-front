<template>
    <div id="story" class="mainContainer bg-white position-relative">
        <div v-if="isStoriesLoaded">
            <div v-if="isVideo" class="storyContainer d-flex justify-content-center align-items-center">
                <video
                    :src="getBaseUrl + getStory.media"
                    autoplay
                    loop
                    class="storyMedia"
                    ref="storyMedia"
                ></video>
            </div>
            <div
                class="storyInfo position-absolute top-0"
                @dblclick="playAndPause"
            >
                <div
                    @click.stop
                    class="container-fluid h-100">
                    <div @click.stop class=" h-100 d-flex flex-column pb-3">
                        <div class="d-flex row py-3 px-2">
                            <div class="storyLengthBg col rounded-5 p-0">
                                <div class="storyLength bg-white rounded"></div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center pb-2">
                            <div class="avatarContainer mb-auto">
                                <router-link :to="'/profile/' + getStory.personId">
                                    <img
                                        :src="getBaseUrl + getStory.personPicture"
                                        alt="profile picture"
                                        class="avatarImg"
                                    >
                                </router-link>
                            </div>
                            <div class="d-flex flex-column justify-content-center px-2 text-white">
                                <p class="m-0 fw-semibold">
                                    {{ getStory.givenName }} {{ getStory.familyName }}</p>
                                <span class="opacity-75 px-1 user-select-none">{{ timeAgo(getStory.createdAt) }}</span>
                            </div>
                            <div class="d-flex ms-auto">
                                <div class="px-1">
                                    <router-link class="bottomNavIcon" role="button" to="/">
                                        <i class="bi bi-x cactusIcon text-white"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class=" story-buttons">
                            <button class="iconBtnActive" @click="storyComments(getStory.id)">
                                <i class="bi bi-chat cactusIcon"></i>
                            </button>
                            <button class="iconBtnActive " @click.prevent="share">
                                <i class="bi bi-send cactusIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
    name: "StoryPage",
    components: {LoaderRow},
    data() {
        return {
            isVideo: false,
            isStoriesLoaded: false,
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getStory']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchStory', 'shareUrl']),
        sort() {
            if (this.getStory.media.match(/^.+\.(mkv|mp4|avi)$/)) {
                this.isVideo = true
            }
        },
        share() {
            this.shareUrl(window.location.href)
            this.$router.push('/chats-page')
        },
        playAndPause() {
            if(this.$refs.storyMedia.paused) {
                this.$refs.storyMedia.play()
            } else {
                this.$refs.storyMedia.pause()
            }
        },
        storyComments(storyId) {
            console.log(storyId)
            this.$router.push(`/story-comments/${storyId}`)
        }
    },
    mounted() {
        this.fetchStory(this.$route.params.storyId)
            .then(() => {
                this.sort()
                this.isStoriesLoaded = true
                // this.$nextTick(() => {
                //     const storyMedia = document.querySelector(".storyMedia");
                //     const playStory = document.querySelector(".playStory");
                //
                //     playStory.addEventListener("click", () => {
                //         storyMedia.paused ? storyMedia.play() : storyMedia.pause();
                //     });
                // });
            })
    },
}
</script>

<style scoped>
.storyContainer {
    height: 100vh;
    background-color: #262628;
}

.storyMedia {
    max-height: 100%;
    max-width: 100%;
}

.storyInfo {
    height: 100%;
    width: 100%;
}

.storyLengthBg {
    height: 0.25rem;
    margin: 0 2px;
    background-color: rgba(255, 255, 255, 0.5);
}

.storyLength {
    height: 100%;
    width: 100%;
}

.story-buttons {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
}
.story-buttons button {
    padding: .3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: #33333377;
    margin: .5rem;
}
</style>
