import axios from "@/plugins/vuex/axios"

export default function (url, mutationName, context) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then((response) => {
                console.log(response)
                let contents = {
                    models: response.data['hydra:member'],
                    totalItems: response.data['hydra:totalItems']
                }

                context.commit(mutationName, contents)
                resolve()
            })
            .catch(() => {
                reject()
            })
    })
}
