import axios from "./axios"

export default {
    actions: {
        fetchChats(context) {
            return new Promise((resolve, reject) => {
                axios.get('/user-chats')
                    .then((response) => {
                        console.log('Chatlar olindi')
                        console.log(response)

                        let chats = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateChats', chats)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Chatlarni olishda xatolik yuz berdi')
                        reject()
                    })
            })
        },
        fetchChat(context, chatId) {
            return new Promise((resolve, reject) => {
                axios.get('/chats/' + chatId)
                    .then((response) => {
                        console.log('Chat haqida ma\'lumot olindi')
                        console.log(response)

                        let chat = {
                            id: response.data.id,
                            participant: response.data.participant.id,
                            participantPicture: response.data.participant.person.picture.contentUrl,
                            participantGivenName: response.data.participant.person.givenName,
                            participantFamilyName: response.data.participant.person.familyName,
                            user: response.data.user.id,
                            userPicture: response.data.user.person.picture.contentUrl,
                            userGivenName: response.data.user.person.givenName,
                            userFamilyName: response.data.user.person.familyName,
                            messages: response.data.messages
                        }

                        context.commit('updateChat', chat)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Chat haqida ma\'lumot olishda xatolik')
                        reject()
                    })
            })
        },
        pushChat(context, participant) {
            return new Promise((resolve, reject) => {
                axios.post('/chats', participant)
                    .then((response) => {
                        console.log('Chat yuborildi')
                        console.log(response)

                        let chatId = {
                            id: response.data.id,
                            participant: response.data.participant.email,
                            user: response.data.user.email
                        }
                        context.commit('pushChat', chatId)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Chat yuborishda xatolik')
                        reject()
                    })
            })
        },
        deleteChat(context, chatId) {
            return new Promise((resolve, reject) => {
                axios.delete('/chats/' + chatId)
                    .then((response) => {
                        console.log(response)
                        console.log("chat o'chirildi")

                        resolve()
                    })
                    .catch(() => {
                        console.log("chat o'chirishda xatolik bor")
                        reject()
                    })
            })
        }
    },
    mutations: {
        updateChats(state, chats) {
            state.chats = chats
        },
        updateChat(state, chat) {
            state.chat = chat
        },
        pushChat(state, chatId) {
            state.chatId = chatId
        }
    },
    state: {
        chats: {
            models: [],
            totalItems: 0
        },
        chat: {
            id: null,
            participant: null,
            participantPicture: null,
            participantGivenName: null,
            participantFamilyName: null,
            user: null,
            userPicture: null,
            userGivenName: null,
            userFamilyName: null,
            messages: []
        },
        chatId: {
            id: null,
            participant: null,
            user: null
        }
    },
    getters: {
        getChats(state) {
            return state.chats.models
        },
        getChat(state) {
            return state.chat
        },
        getChatId(state) {
            return state.chatId.id
        }
    }
}
