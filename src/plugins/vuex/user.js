import postRequest from "@/plugins/vuex/requests/postRequest"
import getRequests from "@/plugins/vuex/requests/getRequests"
import getRequest from "@/plugins/vuex/requests/getRequest"
import putRequest from "@/plugins/vuex/requests/putRequest"

export default {
    actions: {
        fetchToken(context, data) {
            return postRequest('/users/auth', data, 'updateToken', context)
        },

        refreshToken(context, data) {
            return postRequest('/users/auth/refreshToken', data, 'updateToken', context)
        },

        fetchAboutMe(context) {
            return getRequest('/users/about_me', 'updateUser', context)
        },

        pushUser(context, user) {
            return postRequest('/users', user, 'updateUser', context)
        },

        fetchUser(context, userId) {
            return getRequest('/users/' + userId, 'takeParticipant', context)
        },

        pushIsUniqueEmail(context, email) {
            return postRequest('/users/is_unique_email', email, 'updateEmail', context)
        },

        fetchPersonGivenName(context, givenName = null) {
            let search = '?givenName=*'

            if (givenName) {
                search = '?givenName=' + givenName
            }

            return getRequests('/people' + search, 'updatePersons', context)
        },

        changeRoles(context, roles) {
            return putRequest(`/users/${roles.id}/roles`, roles.role, 'updateRoles', context)
        }
    },
    mutations: {
        updateToken(state, data) {
            localStorage.setItem('accessToken', data.accessToken)
            state.accessToken = data.accessToken
            localStorage.setItem('refreshToken', data.refreshToken)
            state.refreshToken = data.refreshToken
        },
        updateUser(state, user) {
            state.user = user
        },
        takeParticipant(state, participant) {
            state.participant = participant
        },
        updateEmail(state, email) {
            state.isUnique = email.isUnique
        },
        clearTokens(state) {
            state.accessToken = null
            state.refreshToken = null

            localStorage.setItem('accessToken', null)
            localStorage.setItem('refreshToken', null)
        },
        updatePersons(state, persons) {
            state.persons = persons
        },
        updateRoles(state, roles) {
            state.roles = roles
        },
    },
    state: {
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),

        user: {
            id: null,
            email: null,
            person: null,
            roles: []
        },
        participant: {
            id: null,
            email: null,
            person: null,
            roles: []
        },

        isUnique: false,

        persons: {
            models: [],
            totalItems: 0
        }
    },
    getters: {
        getAccessToken(state) {
            return state.accessToken
        },
        getRefreshToken(state) {
            return state.refreshToken
        },
        getUser(state) {
            return state.user
        },
        getParticipant(state) {
            return state.participant
        },
        getIsUniqueEmail(state) {
            return state.isUnique
        },
        isAuthorized(state) {
            return state.accessToken !== null
        },
        getPersonGivenName(state) {
            return state.persons.models
        }
    }
}
