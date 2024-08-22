<template>
    <div id="indexNavbar" class="mb-3">
        <div class="container-fluid">
            <div class="d-flex">
                <div class="cactusLogo text-center">
                    <router-link to="/">
                        <img src="./assets/Cactus.png" alt="Cactus Logo">
                    </router-link>
                </div>

                <div class="d-flex align-items-center ms-auto px-2">
                    <router-link to="/search-page" class="aButton px-2">
                        <i class="bi bi-search cactusIcon"></i>
                    </router-link>

                    <router-link
                        to="/notification-page"
                        role="button"
                        class="aButton px-2"
                        :class="{'ms-2': getNotificationsCount > 0}"
                    >
                        <i class="bi bi-bell cactusIcon"></i>
                        <span
                            v-if="getNotificationsCount > 0"
                            class="start-100 translate-middle badge rounded-pill bg-danger">
                            {{ getNotificationsCount }}
                            <span class="visually-hidden">{{ $t('unreadMessages') }}</span>
                        </span>
                    </router-link>

                    <router-link to="/chats-page">
                        <button  class=" iconBtnActive px-2">
                        <i class="bi bi-send cactusIcon"></i>
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";

export default {
    name: 'NavbarRow',
    computed: {
        ...mapGetters(['getNotificationsCount'])
    },
    methods: {
        ...mapActions(['fetchNotificationsCount'])
    },
    mounted() {
        this.fetchNotificationsCount()
    }
}
</script>

<style scoped>
#indexNavbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #fff;
}
</style>