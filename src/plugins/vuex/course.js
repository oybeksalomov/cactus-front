import getRequest from "@/plugins/vuex/requests/getRequest"

export default {
    actions: {
        fetchDollar(context) {
            return getRequest('/dollars/orderBy', 'updateDollar', context)
        },
        fetchEuro(context) {
            return getRequest('/euros/orderBy', 'updateEuro', context)
        },
        fetchRuble(context) {
            return getRequest('/rubles/orderBy', 'updateRuble', context)
        }
    },
    mutations: {
        updateDollar(state, dollar) {
            state.dollar = dollar
        },
        updateEuro(state, euro) {
            state.euro = euro
        },
        updateRuble(state, ruble) {
            state.ruble = ruble
        }
    },
    state: {
        dollar: {
            id: null,
            price: null,
            sellPrice: null
        },
        euro: {
            id: null,
            price: null,
            sellPrice: null
        },
        ruble: {
            id: null,
            price: null,
            sellPrice: null
        }
    },
    getters: {
        getDollar(state) {
            return state.dollar
        },
        getEuro(state) {
            return state.euro
        },
        getRuble(state) {
            return state.ruble
        }
    }
}
