import patchRequest from "@/plugins/vuex/requests/patchRequest";

export default {
    actions: {
        changePersonPicture(context, person) {
            return patchRequest('/people/' + person.id, person.picture,'changePerson', context)
        }
    },
    mutations: {
        changePerson(state, person) {
            state.person = person
        }
    },
    state: {},
    getters: {}
}
