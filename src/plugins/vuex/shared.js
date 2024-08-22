export default {
    actions: {
        shareUrl(context, url) {
            context.commit('updateShareUrl', url)
        }
    },
    mutations: {
        updateShareUrl(state, sharedUrl) {
            state.sharedUrl = sharedUrl
        },
    },
    state: {
        sharedUrl: null
    },
    getters: {
        getShareUrl(state) {
            return state.sharedUrl
        }
    }
}
