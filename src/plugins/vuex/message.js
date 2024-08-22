import postRequest from "@/plugins/vuex/requests/postRequest";
import getRequests from "@/plugins/vuex/requests/getRequests";

export default {
    actions: {
        pushMessage(context, message) {
            return postRequest('/messages', message, 'pushMessage', context)
        },
        fetchMessages(context, chatId) {
            return getRequests('/messages?chat=' + chatId, 'updateMessages', context)
        }
    },
    mutations: {
        pushMessage(state, data) {
            state.data = data
        },
        updateMessages(state, messages) {
            state.messages = messages
        }
    },
    state: {
        messages: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getMessages(state) {
            return state.messages.models
        }
    }
}
