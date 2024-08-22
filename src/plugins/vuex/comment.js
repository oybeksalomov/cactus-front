import axios from "./axios"

export default {
    actions: {
        fetchComments(context, postId) {
            return new Promise((resolve, reject) => {
                axios.get('/comments?post=' + postId)
                    .then((response) => {
                        console.log('Commentlar olindi')
                        console.log(response)

                        let comments = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateComments', comments)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Commentlarni olishda xatolik')
                        reject()
                    })
            })
        },
        fetchStoryComments(context, storyId) {
            return new Promise((resolve, reject) => {
                axios.get('/comments?story=' + storyId)
                    .then((response) => {
                        console.log('Commentlar olindi')
                        console.log(response)

                        let storyComments = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateStoryComments', storyComments)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Commentlarni olishda xatolik')
                        reject()
                    })
            })
        },
        pushComment(context, comment) {
            return new Promise((resolve, reject) => {
                axios.post('/comments', comment)
                    .then((response) => {
                        console.log('Comment yuborildi')
                        console.log(response)

                        context.commit('pushComment', response.data)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Comment yuborishda xatolik')
                        reject()
                    })
            })
        }
    },
    mutations: {
        updateComments(state, comments) {
            state.comments = comments
        },
        updateStoryComments(state, storyComments) {
            state.storyComments = storyComments
        },
        pushComment(state, data) {
            state.data = data
        }
    },
    state: {
        comments: {
            models: [],
            totalItems: 0
        },
        storyComments: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getComments(state) {
            return state.comments.models
        },
        getStoryComments(state) {
            return state.storyComments.models
        }
    }
}
