import { createApp } from 'vue'
import App from './App.vue'
import router from "@/plugins/router"
import store from "@/plugins/vuex/store"
import i18n from "@/locales/i18n";

createApp(App)
    .use(i18n)
    .use(router)
    .use(store)
    .mount('#app')
