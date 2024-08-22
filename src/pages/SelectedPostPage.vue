
<template>
    <div id="index" class="mainContainer mainContainerPadding bg-white position-relative">
        <NavbarRow/>

        <div v-if="isPostsLoaded" id="selectedPosts">
            <TransitionGroup name="selectedPosts">
                <div
                    v-for="selectedPost of selectedPosts"
                    :key="selectedPost.id"
                    class="post pb-3"
                >
                    <div class="pb-2">
                        <div class="container-fluid">
                            <div class="d-flex">
                                <div class="avatarContainer">
                                    <router-link :to="'/profile/' + selectedPost.post.user.person.id">
                                        <img
                                            :src="getBaseUrl + selectedPost.post.user.person.picture.contentUrl"
                                            alt="profile picture"
                                            class="avatarImg"
                                        >
                                    </router-link>
                                </div>
                                <div class="d-flex flex-column justify-content-center px-2">
                                    <p class="m-0 fw-semibold">
                                        {{ selectedPost.post.user.person.givenName }} {{ selectedPost.post.user.person.familyName }}
                                    </p>
                                    <p class="fontSizeS opacity-50 m-0">{{ selectedPost.post.user.person.city }}</p>
                                </div>
                                <button class="iconBtnActive border-0 bg-white ms-auto">
                                    <i class="bi bi-three-dots cactusIcon"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="postMediaContainer position-relative">
                        <div class="postMediaBg">
                            <img :src="getBaseUrl + selectedPost.post.media.contentUrl" alt="post photo" class="postMedia">
                        </div>
                        <div class="postInfo position-absolute start-50 translate-middle-x rounded-5 p-2 d-flex">
                            <div class="d-flex align-items-center px-2">
                                <router-link :to="'/comment-page/' + selectedPost.post.id" class="aButton px-1" role="button">
                                    <i class="bi bi-chat cactusIcon"></i>
                                </router-link>
                            </div>
                            <div class="d-flex align-items-center px-2">
                                <button class="iconBtnActive" @click="share(selectedPost.id)">
                                    <i class="bi bi-send cactusIcon"></i>
                                </button>
                            </div>
                            <div class="d-flex align-items-center px-2 ms-auto">
                                <button @click="deleteSPost(selectedPost)" class="iconBtnActive">
                                    <i class="bi bi-bookmark-fill cactusIcon"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
        <div v-else>
            <LoaderRow/>
        </div>
        <div>
            <h6 v-if="getSelectedPosts.totalItems === 0" class="opacity-50 px-2 text-center">
                Hozircha sizda tanlangan postlar mavjud emas!
            </h6>
        </div>

        <div ref="loader" class="observer d-flex justify-content-center pt-2">
            <CustomSpinner v-if="!isLastPage"/>
        </div>
        <ButtonNavbar/>
    </div>
</template>

<script>
import NavbarRow from "@/components/NavbarRow.vue";
import ButtonNavbar from "@/components/ButtonNavbar.vue";
import {mapActions, mapGetters} from "vuex";
import LoaderRow from "@/components/LoaderRow.vue";
import CustomSpinner from "@/components/CustomSpinner.vue";

export default {
    components: {CustomSpinner, LoaderRow, ButtonNavbar, NavbarRow},

    data() {
        return {
            isPostsLoaded: false,
            isLastPage: false,
            selectedPosts: [],
            page: 1
        }
    },
    computed: {
        ...mapGetters(['getSelectedPosts']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchSelectedPosts', 'deleteSelectedPost', 'shareUrl']),
        share(postId) {
            this.shareUrl(`${window.location.href}comment-page/${postId}`)
            this.$router.push('/chats-page')
        },
        deleteSPost(selectedPost) {
            this.deleteSelectedPost(selectedPost.id)
                .then(()=>{
                    this.selectedPosts = this.selectedPosts.filter(p => p.id !== selectedPost.id)
                })
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

                this.fetchSelectedPosts({page: this.page})
                    .then(() => {
                        if (!this.getSelectedPosts.models.length) {
                            this.isLastPage = true
                        }

                        this.getSelectedPosts.models.forEach(post => this.selectedPosts.push(post))
                    })
            }
        },
    },
    mounted() {
        this.fetchSelectedPosts({page: this.page})
            .then(() => {
                this.isPostsLoaded = true
                this.selectedPosts = this.getSelectedPosts.models
            })
        this.intersectionObserver()
    },

}
</script>

<style scoped>
.selectedPosts-enter-active,
.selectedPosts-leave-active {
    transition: all 0.5s ease;
}
.selectedPosts-enter-from,
.selectedPosts-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>