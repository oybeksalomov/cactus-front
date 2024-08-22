import axios from "./axios"
import deleteRequest from "@/plugins/vuex/requests/deleteRequest";
import getRequests from "@/plugins/vuex/requests/getRequests";
import postRequest from "@/plugins/vuex/requests/postRequest";

export default {
    actions: {
        fetchPosts(context, filterProps = {}) {
            let postUrl = ''

            if(filterProps.page) {
                postUrl = '?page=' + filterProps.page
            }

            if(filterProps.user) {
                postUrl += '&user=' + filterProps.user
            }

            return getRequests(`/posts/orderBy` + postUrl, 'updatePosts', context)
        },
        fetchPost(context, postId) {
            return new Promise((resolve, reject) => {
                axios.get('/posts/' + postId)
                    .then((response) => {
                        console.log('Post haqida ma\'lumot olindi')
                        console.log(response)

                        let post = {
                            id: response.data.id,
                            personId: response.data.person.id,
                            personPicture: response.data.person.picture.contentUrl,
                            givenName: response.data.person.givenName,
                            familyName: response.data.person.familyName,
                            city: response.data.person.city,
                            media: response.data.media.contentUrl,
                            postLikesCount: response.data.postLikesCount,
                            commentsCount: response.data.commentsCount,
                            isPostLike: response.data.isPostLike
                        }

                        context.commit('updatePost', post)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Post haqida ma\'lumot olishda xatolik')
                        reject()
                    })
            })
        },
        pushPost(context, post) {
            return postRequest('/posts', post, 'pushPost', context)
        },
        pushPostLike(context, post) {
            return postRequest('/post_likes', post, 'pushPostLike', context)
        },
        deletePostLike(context, postLike) {
            return deleteRequest('/post_likes/' + postLike, 'deletePostLike', context)
        },
        fetchUserPostLikes(context) {
            return getRequests('/user/post_likes', 'updateUserPostLikes', context)
        },
        fetchNotifications(context) {
            return getRequests('/notifications', 'updateNotifications', context)
        },
        fetchNotificationsCount(context) {
            return new Promise((resolve, reject) => {
                axios.get('/notifications/count')
                    .then((response) => {
                        console.log(response)

                        context.commit('updateNotificationsCount', response.data)
                        resolve()
                    })
                    .catch(() => {
                        reject()
                    })
            })
        }
    },
    mutations: {
        updatePosts(state, posts) {
            state.posts = posts
        },
        updatePost(state, post) {
            state.post = post
        },
        pushPost(state, data) {
            state.data = data
        },
        pushPostLike(state, data) {
            state.data = data
        },
        deletePostLike(state, data) {
            state.data = data
        },
        updateUserPostLikes(state, userPostLikes) {
            state.userPostLikes = userPostLikes
        },
        updateNotifications(state, notifications) {
            state.notifications = notifications
        },
        updateNotificationsCount(state, notificationsCount) {
            state.notificationsCount = notificationsCount
        }
    },
    state: {
        posts: {
            models: [],
            totalItems: 0
        },
        post: {
            id: null,
            personId: null,
            personPicture: null,
            givenName: null,
            familyName: null,
            city: null,
            media: null,
            postLikesCount: 0,
            commentsCount: 0,
            isPostLike: false
        },
        userPostLikes: {
            models: [],
            totalItems: 0
        },
        notifications: {
            models: [],
            totalItems: 0
        },
        notificationsCount: 0
    },
    getters: {
        getPosts(state) {
            return state.posts
        },
        getPost(state) {
            return state.post
        },
        getUserPostLikes(state) {
            return state.userPostLikes
        },
        getNotifications(state) {
            return state.notifications
        },
        getNotificationsCount(state) {
            return state.notificationsCount
        },
    }
}
