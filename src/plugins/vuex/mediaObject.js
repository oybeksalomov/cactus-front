import axios from "./axios"

export default {
    actions: {
        pushPicture(context, picture) {
            return new Promise((resolve, reject) => {
                axios.post('/media_objects', picture)
                    .then((response) => {
                        console.log('File yuborildi')
                        console.log(response)

                        context.commit('updatePicture', response.data)
                        resolve()
                    })
                    .catch(() => {
                        console.log('File yuborishda xatolik')
                        reject()
                    })
            })
        }
    },
    mutations: {
        updatePicture(state, data) {
            state.data = data
        }
    },
    state: {
        data: null
    },
    getters: {
        getPicture(state) {
            return state.data
        }
    }
}
