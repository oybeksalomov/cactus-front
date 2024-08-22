import axios from "@/plugins/vuex/axios"

export default function (url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios.get(url)
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
