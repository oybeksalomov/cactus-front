import postRequest from "@/plugins/vuex/requests/postRequest";
import deleteRequest from "@/plugins/vuex/requests/deleteRequest";
import getRequests from "@/plugins/vuex/requests/getRequests";

export default {
    actions: {
        fetchSelectedPosts(context, filterProps = {}){
            let selectedPostsOrder = '&order%5Bid%5D=desc'

            return getRequests('/selected_posts?page=' + filterProps.page + selectedPostsOrder, 'updateSelectedPosts', context)

        },
        pushSelectedPost(context, post) {
            return postRequest('/selected_posts', post, 'pushSelectedPost', context)
        },
        deleteSelectedPost(context, selectPost) {
            return deleteRequest('/selected_posts/' + selectPost, 'deleteSelectedPost', context)
        },
    },
    mutations: {
        updateSelectedPosts(state, selectedPosts) {
            state.selectedPosts = selectedPosts
        },
        pushSelectedPost(state, data) {
            state.data = data
        },
        deleteSelectedPost(state, data) {
            state.data = data
        },
    },
    state: {
        selectedPosts: {
            models: [],
            totalItems: 0
        },
        posts: {
            models: [],
            totalItems: 0
        },
    },
    getters: {
        getSelectedPosts(state) {
            return state.selectedPosts
        }
    }
}
