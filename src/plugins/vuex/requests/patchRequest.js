import axios from "@/plugins/vuex/axios"

const headers = {
    'Content-Type': 'application/merge-patch+json'
};
export default function (url, data, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data, {headers})
            .then((response) => {
                console.log(response)
                context.commit(mutationName, response.data)
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}
