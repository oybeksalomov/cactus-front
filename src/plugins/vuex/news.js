import getRequests from "@/plugins/vuex/requests/getRequests"

export default {
    actions: {
        fetchNews(context) {
            return getRequests('/news/orderBy', 'updateNews', context)
        },
    },
    mutations: {
        updateNews(state, news) {
            state.news = news
        }
    },
    state: {
        news: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getNews(state) {
            return state.news.models
        }
    }
}
