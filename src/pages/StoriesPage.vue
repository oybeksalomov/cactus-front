<template>
    <div id="storyUpload" class="mainContainer position-relative">
        <div class="storyInfo" v-if="isStoriesLoaded">
            <div
                v-for="story in getStories.models"
                :key="story.id"
                class="h-100 storyPage d-flex flex-column pt-4"
            >
                <div class="d-flex align-items-center px-4">
                    <div class="avatarContainer mb-auto">
                        <router-link :to="'/profile/' + story.user.id">
                            <img
                                :src="getBaseUrl + story.user.person.picture.contentUrl"
                                class="avatarImg"
                                alt="profile picture"
                            >
                        </router-link>
                    </div>
                    <div class="d-flex flex-column justify-content-center px-2 text-white">
                        <p class="m-0 fw-semibold">
                            {{ story.user.person.givenName }} {{ story.user.person.familyName }}</p>
                        <span class="opacity-75 px-1">{{ timeAgo(story.createdAt) }}</span>
                    </div>
                    <div class="d-flex ms-auto">
                        <div class="px-1">
                            <router-link to="/" role="button" class="bottomNavIcon">
                                <i class="bi bi-x cactusIcon text-white"></i>
                            </router-link>
                        </div>
                    </div>
                </div>

                <StoryVideoPlayer :getBaseUrl="getBaseUrl" :story="story"/>
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
import StoryVideoPlayer from "@/components/StoryVideoPlayer.vue";

export default {
    name: "StoriesPage",
    components: {StoryVideoPlayer, LoaderRow},
    data() {
        return {
            isStoriesLoaded: false,
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getStories']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        },
    },
    methods: {
        ...mapActions(['fetchStories']),
    },
    mounted() {
        this.fetchStories()
            .then(() => {
                this.isStoriesLoaded = true
            })
    }
}
</script>

<style scoped>
.storyInfo {
    height: 100vh;
    width: 100%;
    background-color: black;
    overflow: auto;
    scroll-snap-type: both mandatory;
    overscroll-behavior-x: contain;
}
.storyPage {
    scroll-snap-align: center;
}
</style>
