<template>
    <div id="storiesBar" ref="storyContainer" @wheel.prevent="scroll" class="pb-1 mb-3">
        <div class="pe-2 item">
            <div class="p-1">
                <router-link to="/add-story">
                    <img src="./assets/You.png" class="avatarImgNav" alt="Your avatar">
                </router-link>
            </div>
            <p class="m-0 text-center fontSizeS">You</p>
        </div>
        <div v-if="isStoriesLoaded" class="d-inline-block">
            <div v-for="story of stories" :key="story.id" class="item">
                <div class="px-2">
                    <div class="avatarBorder">
                        <div class="avatarContainer">
                            <router-link :to="'/story-page/' + story.id">
                                <img
                                    :src="getBaseUrl + story.user.person.picture.contentUrl"
                                    class="avatarImgNav"
                                    alt="profile picture"
                                >
                            </router-link>
                        </div>
                    </div>
                    <p class="m-0 text-center fontSizeS">{{ story.user.person.givenName }}</p>
                </div>
            </div>
        </div>
        <div v-else class="w-100 mr-5 d-inline-block"></div>
        <div ref="loader" class="observer d-inline-block justify-content-center pt-2 mb-4">
            <CustomSpinner v-if="!isLastPage" class="m-2"/>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import CustomSpinner from "@/components/CustomSpinner";

export default {
    name: 'StoriesRow',
    components: {CustomSpinner},
    data() {
        return {
            isStoriesLoaded: false,
            stories: [],
            page: 1,
            isLastPage: false
        }
    },
    computed: {
        ...mapGetters(['getStories']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        },
    },
    methods: {
        ...mapActions(['fetchStories']),
        scroll(event) {
            this.$refs.storyContainer.scrollLeft += +event.deltaY / 6
        },
        intersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    this.loadMorePost()
                }
            }, {rootMargin: '0px', threshold: true})

            observer.observe(this.$refs.loader)
        },
        loadMorePost() {
            if (!this.isLastPage) {
                this.page += 1

                this.fetchStories(this.page)
                    .then(() => {
                        if (!this.getStories.models.length) {
                            this.isLastPage = true
                        }

                        this.getStories.models.forEach(post => this.stories.push(post))
                    })
            }
        },
    },
    mounted() {
        this.fetchStories(this.page)
            .then(() => {
                this.isStoriesLoaded = true
                this.stories = this.getStories.models;
            })
        this.intersectionObserver()
    }
}
</script>


<style scoped>
#storiesBar {
    overflow-x: auto;
    white-space: nowrap;
}
#storiesBar::-webkit-scrollbar {
    display: none;
}

.item {
    display: inline-block;
}
</style>
