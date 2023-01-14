import axios from "axios"

export default {
  actions: {
    fetchToken(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/users/auth', data)
          .then((response) => {
            console.log('Token olindi')
            console.log(response)

            context.commit('updateToken', response.data.token)
            resolve()
          })
          .catch(() => {
            console.log('Token olishda xatolik yuz berdi')
            reject()
          })
          .finally(() => {
            console.log('Bu funksiya har doim ishlaydi')
          })
      })
    },

    fetchUser(context, userId) {
      return new Promise((resolve, reject) => {
        axios
          .get('/users/' + userId)
          .then((response) => {
            console.log('user olindi')
            console.log(response)

            context.commit('uodateUser', response.data.user)
            resolve()
          })
          .catch(() => {
            console.log('user olishda xatolik yuz berdi')
            reject()
          })
      })
    },

    pushUser(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/users/', data)
          .then((response) => {
            console.log('user qo\'shildi')
            console.log(response)

            let user = {
              id: null,
              email: null,
              createdAt: null,
              updatedAt: null,
            }

            context.commit('updateUser', user)
            resolve()
          })
          .catch(() => {
            console.log("user qo'shishda xatolik yuz berdi")
            reject()
          })
      })
    }
  },
  mutations: {
    updateToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    }
  },
  state: {
    token: localStorage.getItem('token'),

    user: {
      id: null,
      email: null,
      createdAt: null,
      updatedAt: null,
    },
  },
  getters: {
    getToken(state) {
      return state.token
    },

    getUser(state) {
      return state.user
    }
  }
}