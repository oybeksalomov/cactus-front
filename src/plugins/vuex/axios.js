import axios from "axios"
import store from "@/plugins/vuex/store"

axios.defaults.baseURL = process.env.VUE_APP_API_URL + '/api';
axios.defaults.headers.post['Content-Type'] = 'application/ld-json';

axios.interceptors.request.use((config) => {
  // todo tekshiring, balkim config url'da har doim to'liq url joylashgandir
  if (config.url !== '/users/auth') {
    config.headers.common['Authorization'] = 'bearer ' + store.getters.getToken
  }

  return config
})

export default axios