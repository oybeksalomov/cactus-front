import {createRouter, createWebHistory} from "vue-router"
import store from "@/plugins/vuex/store"

const ifNotAuthorized = (to, from, next) => {
    if (store.getters.isAuthorized) {
        next('/')
    } else {
        next()
    }
}

const ifAuthorized = (to, from, next) => {
    if (store.getters.isAuthorized) {
        next()
    } else {
        next('/login')
    }
}

const routes = [
    {
        path: '/',
        component: () => import('../pages/HomePage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/search-page',
        component: () => import('../pages/SearchPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/comment-page/:postId',
        component: () => import('../pages/CommentPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/chats-page',
        component: () => import('../pages/ChatsPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/chat/:chatId',
        component: () => import('../pages/MessagePage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/notification-page',
        component: () => import('../pages/NotificationPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/profile/:id',
        component: () => import('../pages/ProfilePage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/subscription/:id',
        component: () => import('../pages/SubscriptionsPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/subscribers/:id',
        component: () => import('../pages/SubscribersPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/story-page/:storyId',
        component: () => import('../pages/StoryPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/login',
        component: () => import('../pages/LoginPage.vue'),
        beforeEnter: ifNotAuthorized
    },
    {
        path: '/register',
        component: () => import('@/pages/RegistrationPage.vue'),
        beforeEnter: ifNotAuthorized
    },
    {
        path: '/add-story',
        component: () => import('@/pages/AddStoryPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/add-post',
        component: () => import('@/pages/AddPostPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/stories',
        component: () => import('@/pages/StoriesPage.vue'),
        beforeEnter: ifAuthorized
    },
    {
        path: '/selected-posts',
        component: () => import('@/pages/SelectedPostPage.vue'),
        beforeEnter: ifAuthorized
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
