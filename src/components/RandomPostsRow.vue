<template>
    <div class="mb-4" id="randomPosts">
        <div class="container-fluid">

            <div v-if="isPostsLoaded" class="randomPosts">
                <div
                    v-for="post of posts"
                    :key="post.id"
                    class="randomPost item p-1 border1px"
                    ref="randomPosts"
                >
                    <div class="randomPostMedia w-100">
                        <router-link :to="'/comment-page/' + post.id">
                            <img :src="getBaseUrl + post.media.contentUrl" alt="Post picture" />
                        </router-link>
                    </div>
                </div>
            </div>
            <div v-else>
                <LoaderRow/>
            </div>
            <div ref="loader" class="observer d-flex justify-content-center pt-2">
                <CustomSpinner v-if="!isLastPage"/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import LoaderRow from "@/components/LoaderRow";
import CustomSpinner from "@/components/CustomSpinner";

export default {
    name: "RandomPostsRow",
    components: {
        LoaderRow,
        CustomSpinner
    },
    props: {
        user: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isPostsLoaded: false,
            posts: [],
            page: 1,
            isLastPage: false
        }
    },
    computed: {
        ...mapGetters(["getPosts"]),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL;
        },
        shuffledPosts() {
            return this.getPosts.models.slice().sort(() => 0.5 - Math.random());
        },
    },
    methods: {
        ...mapActions(["fetchPosts"]),

        intersectionObserver() {
            const observer = new IntersectionObserver((entries) => {
                if(entries[0].isIntersecting) {
                    this.loadMorePost()
                }
            } , { rootMargin: '0px', threshold: true })

            observer.observe(this.$refs.loader)
        },
        loadMorePost() {
            if(!this.isLastPage) {
                this.page += 1

                this.fetchPosts({page: this.page, user: this.user})
                    .then(() => {
                        if(!this.getPosts.models.length) {
                            this.isLastPage = true
                        }

                        this.shuffledPosts.forEach(post => this.posts.push(post))
                    })
            }
        },
    },
    mounted() {
        this.fetchPosts({page: this.page, user: this.user})
            .then(() => {
                this.posts = this.shuffledPosts
                this.isPostsLoaded = true
            });

        this.intersectionObserver()

        this.$nextTick(() => {
            window.addEventListener("resize", this.foo);
        });
    },
    beforeUnmount() {
        window.removeEventListener("resize", this.foo);
    },
};
</script>

<style scoped>
.randomPosts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: #FAFAFA;
}
.item:nth-child(18n+11), .item:nth-child(18n+1) {
    grid-column-end: span 2;
    grid-row-end: span 2;
}
</style>
