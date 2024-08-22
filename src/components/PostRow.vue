<template>
    <div v-if="isPostsLoaded" id="posts">
        <div
            v-for="(post, index) of posts"
            v-bind:key="post.id"
            class="post pb-3"
        >
            <div class="pb-2">
                <div class="container-fluid">
                    <div class="d-flex">
                        <div class="avatarContainer">
                            <router-link :to="'/profile/' + post.person.id">
                                <img
                                    :src="getBaseUrl + post.person.picture.contentUrl"
                                    alt="profile picture"
                                    class="avatarImg"
                                >
                            </router-link>
                        </div>
                        <div class="d-flex flex-column justify-content-center px-2">
                            <p class="m-0 fw-semibold">
                                {{ post.person.givenName }} {{ post.person.familyName }}
                            </p>
                            <p class="fontSizeS opacity-50 m-0">{{ post.person.city }}</p>
                        </div>
                        <button class="iconBtnActive border-0 bg-white ms-auto">
                            <i class="bi bi-three-dots cactusIcon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div class="postMediaContainer position-relative">
                <div class="postMediaBg">
                    <img :src="getBaseUrl + post.media.contentUrl" alt="post photo" class="postMedia">
                </div>
                <div class="postInfo position-absolute start-50 translate-middle-x rounded-5 p-2 d-flex">
                    <div class="d-flex align-items-center bg-white rounded-5 px-2">
                        <button
                            :class="{'text-danger': post.isPostLike}"
                            class="iconBtnActive"
                            @click="pushLike(post, index)">
                            <i class="bi bi-heart cactusIcon"></i>
                        </button>
                        <p class="m-0 fw-semibold">{{ post.postLikesCount }}</p>
                    </div>
                    <div class="d-flex align-items-center px-2">
                        <router-link :to="'/comment-page/' + post.id" class="aButton px-1" role="button">
                            <i class="bi bi-chat cactusIcon"></i>
                        </router-link>
                        <p class="m-0 fw-semibold">{{ post.commentsCount }}</p>
                    </div>
                    <div class="d-flex align-items-center px-2">
                        <button class="iconBtnActive" @click="share(post.id)">
                            <i class="bi bi-send cactusIcon"></i>
                        </button>
                    </div>
                    <div class="d-flex align-items-center px-2 ms-auto">
                        <button
                            @click="pushSelected(post, index)"
                            class="iconBtnActive"
                        >
                            <i
                                :class="{'fa-solid' : post.isSelectedPost}"
                                class="fa-regular fa-bookmark cactusIcon"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <LoaderRow/>
    </div>
    <div ref="loader" class="observer d-flex justify-content-center pt-2">
        <CustomSpinner v-if="!isLastPage"/>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import LoaderRow from "@/components/LoaderRow.vue";
import CustomSpinner from "@/components/CustomSpinner";

export default {
    name: 'PostRow',
    components: {LoaderRow, CustomSpinner},
    data() {
        return {
            isPostsLoaded: false,
            posts: [],
            page: 1,
            isLastPage: false,
        }
    },
    computed: {
        ...mapGetters(['getPosts', 'getUser']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions(['fetchPosts', 'pushPostLike', 'deletePostLike', 'shareUrl', 'pushSelectedPost', 'deleteSelectedPost']),
        pushSelected(post, index) {
            if (post.person.id !== this.getUser.id) {
                this.pushSelectedPost({post: '/api/posts/' + post.id})
                    .then(() => {
                        this.posts[index].isSelectedPost = !this.posts[index].isSelectedPost;
                    })
            }
        },
        pushLike(post, index) {
            if (post.person.id !== this.getUser.id) {
                this.pushPostLike({post: '/api/posts/' + post.id})
                    .then(() => {
                        this.posts[index].isPostLike = !this.posts[index].isPostLike;
                    })
            }
        },
        share(postId) {
            this.shareUrl(`${window.location.href}comment-page/${postId}`)
            this.$router.push('/chats-page')
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

                this.fetchPosts({page: this.page})
                    .then(() => {
                        if (!this.getPosts.models.length) {
                            this.isLastPage = true
                        }

                        this.getPosts.models.forEach(post => this.posts.push(post))
                    })
            }
        },
    },
    mounted() {
        this.fetchPosts({page: this.page})
            .then(() => {
                this.isPostsLoaded = true
                this.posts = this.getPosts.models;
            })
        this.intersectionObserver()
    }
}
</script>

<style scoped>


</style>
