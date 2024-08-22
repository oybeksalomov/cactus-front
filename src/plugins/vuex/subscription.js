import axios from "./axios"
import deleteRequest from "@/plugins/vuex/requests/deleteRequest";
import getRequests from "@/plugins/vuex/requests/getRequests";
import postRequest from "@/plugins/vuex/requests/postRequest";

export default {
    actions: {
        fetchSubscribers(context, userId) {
            return new Promise((resolve, reject) => {
                axios.get('/subscribers?follow=' + userId)
                    .then((response) => {
                        console.log('User obunachilari olindi')
                        console.log(response)

                        let subscribers = {
                            models: response.data.subscribers['hydra:member'],
                            totalItems: response.data.subscribers['hydra:totalItems'],
                            isSubscriber: response.data.isSubscriber
                        }

                        context.commit('updateSubscribers', subscribers)
                        resolve()
                    })
                    .catch(() => {
                        console.log('User bunachilarini olishda xatolik')
                        reject()
                    })
            })
        },
        fetchSubscriptions(context, userId) {
            return getRequests('/subscriptions?user=' + userId, 'updateSubscriptions', context)
        },
        pushSubscription(context, userId) {
            return postRequest('/subscriptions', userId, 'pushSubscription', context)
        },
        deleteSubscriber(context, subscriberId) {
            return deleteRequest('/subscriptions/' + subscriberId, 'deleteSubscriber', context)
        }
    },
    mutations: {
        updateSubscribers(state, subscribers) {
            state.subscribers = subscribers
        },
        updateSubscriptions(state, subscriptions) {
            state.subscriptions = subscriptions
        },
        pushSubscription(state, data) {
            state.data = data
        },
        deleteSubscriber(state, data) {
            state.data = data
        }
    },
    state: {
        subscribers: {
            models: [],
            totalItems: 0,
            isSubscriber: false
        },
        subscriptions: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getSubscribers(state) {
            return state.subscribers
        },
        getSubscriptions(state) {
            return state.subscriptions
        }
    }
}
