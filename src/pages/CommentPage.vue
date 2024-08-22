<template>
    <div id="index" class="mainContainer mainContainerPadding bg-white position-relative">
        <div v-if="isCommentsLoaded && isPostsLoaded">
            <div class="post py-3">
                <div class="pb-2">
                    <div class="container-fluid">
                        <div class="d-flex">
                            <router-link to="/">
                                <button type="button" class="backBtn p-0 pe-2">
                                    <img src="../components/assets/Back.png" alt="back">
                                </button>
                            </router-link>

                            <div class="avatarContainer">
                                <router-link :to="'/profile/' + getPost.personId">
                                    <img :src="getBaseUrl + getPost.personPicture" class="avatarImg" alt="profile picture">
                                </router-link>
                            </div>

                            <div class="d-flex flex-column justify-content-center px-2">
                                <p class="m-0 fw-semibold">
                                    {{ getPost.givenName }} {{ getPost.familyName }}</p>
                                <p class="fontSizeS opacity-50 m-0">{{ getPost.city }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="postMediaContainer position-relative">
                    <div class="postMediaBg">
                        <img :src="getBaseUrl + getPost.media" class="postMedia" alt="post photo">
                    </div>
                    <div class="postInfo position-absolute start-50 translate-middle-x rounded-5 p-2 d-flex">
                        <div class="d-flex align-items-center bg-white rounded-5 px-2">
                            <button
                                class="iconBtnActive"
                                :class="{'text-danger': getPost.isPostLike}"
                                @click="pushLike"
                            >
                                <i class="bi bi-heart cactusIcon"></i>
                            </button>
                            <p class="m-0 fw-semibold">{{ getPost.postLikesCount }}</p>
                        </div>

                        <div class="d-flex align-items-center px-2">
                            <a href="#" role="button" class="iconBtnActive">
                                <i class="bi bi-chat cactusIcon"></i>
                            </a>
                            <p class="m-0 fw-semibold">{{ getPost.commentsCount }}</p>
                        </div>

                        <div class="d-flex align-items-center px-2">
                            <button class="iconBtnActive" @click="share">
                                <i class="bi bi-send cactusIcon"></i>
                            </button>
                        </div>

                        <div class="d-flex align-items-center px-2 ms-auto">
                            <button class="iconBtnActive">
                                <i class="bi bi-bookmark cactusIcon"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="comments" v-if="getPost.commentsCount === 0">
                <div class="container-fluid">
                    <div class="comments py-3">
                        <p class="fw-semibold text-dark text-center m-0 opacity-50">{{ $t('noComments') }}</p>
                    </div>
                </div>
            </div>
            <!-- Comments start  -->
            <div v-else>
                <div class="container-fluid mb-5">
                    <div class="comments" v-for="comment of getComments" :key="comment.id">
                        <div class="text-center userName mt-4">{{ timeAgo(comment.createdAt) }}</div>
                        <div class="d-flex align-items-center pb-3">
                            <div class="avatarContainer mb-auto">
                                <router-link :to="'/profile/' + comment.user.person.id">
                                    <img :src="getBaseUrl + comment.user.person.picture.contentUrl" class="avatarImg" alt="profile picture">
                                </router-link>
                            </div>

                            <div class="d-flex flex-column justify-content-center px-2">
                                <p class="m-0 fw-semibold">
                                    {{ comment.user.person.givenName }}
                                    {{ comment.user.person.familyName }}
                                </p>
                                <p class="m-0 commentText">{{ comment.text }}</p>
                            </div>
                            <button type="button" class="iconBtnActive ms-auto">
                                <i class="bi bi-heart cactusIcon opacity-50"></i>
                            </button>
                        </div>
                        <div v-if="comment.media !== null">
                            <div
                                class="post__img chatImg"
                                v-if="comment.media.contentUrl.match(/^.+\.(jpg|jpeg|png|webp)$/)"
                            >
                                <img class="h-100" :src="getBaseUrl + comment.media.contentUrl"/>
                            </div>
                            <video class="card-img-top chatImg" controls height="230" v-else>
                                <source :src="getBaseUrl + comment.media.contentUrl"/>
                            </video>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Comments end  -->

            <!-- Send comment start -->
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
                            v-model="comment.text"
                            @keyup.enter="send"
                        />
                    </div>
                    <div class="col-2 d-flex justify-content-center align-items-center">
                        <div v-if="isLoadingComment">
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
            <!-- Send comment end -->
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
    name: "CommentPage",
    components: {LoaderRow},
    data() {
        return {
            isCommentsLoaded: false,
            isPostsLoaded: false,
            isLoadingComment: false,
            comment: {
                post: '/api/posts/' + this.$route.params.postId,
                text: '',
                media: ''
            }
        }
    },
    mixins: [formatTime],
    computed: {
        ...mapGetters(['getPost', 'getComments', 'getUser', 'getPicture']),
        getBaseUrl() {
            return process.env.VUE_APP_API_URL
        }
    },
    methods: {
        ...mapActions([
            'fetchPost',
            'fetchComments',
            'pushPostLike',
            'deletePostLike',
            'pushComment',
            'pushPicture',
            'shareUrl'
        ]),
        createPicture(event) {
            this.isLoadingComment = true
            this.file = event.target.files[0]
            const formData = new FormData();
            formData.append('file', this.file);
            this.pushPicture(formData)
                .then(() => {
                    this.comment.media = this.getPicture['@id']
                    this.pushComment(this.comment)
                        .then(() => {
                            this.fetchComments(this.getPost.id)
                            this.fetchPost(this.getPost.id)
                            this.comment.media = ''
                            this.isLoadingComment = false
                        })
                })
        },
        send() {
            if (this.text !== '') {
                this.isLoadingComment = true
                this.pushComment({post: this.comment.post, text: this.comment.text})
                    .then(() => {
                        this.fetchComments(this.getPost.id)
                        this.fetchPost(this.getPost.id)
                        this.comment.text = ''
                        this.isLoadingComment = false
                    })
            }
        },
        pushLike() {
            this.pushPostLike({post: '/api/posts/' + this.getPost.id})
                .then(() => this.fetchPost(this.getPost.id))
        },
        share() {
            this.shareUrl(window.location.href)
            this.$router.push('/chats-page')
        }
    },
    mounted() {
        this.fetchComments(this.$route.params.postId)
            .then(() => {
                this.isCommentsLoaded = true
            })
        this.fetchPost(this.$route.params.postId)
            .then(() => {
                this.isPostsLoaded = true
            })
    }
}
</script>

<style scoped>
.comments {
    background-color: #f7f8fc;
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

.commentText {
    width: 100%;
    word-break: break-word;
    white-space: pre-wrap
}

.chatImg {
    border-radius: 20px;
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
</style>
