import {createStore} from "vuex"
import user from "@/plugins/vuex/user"
import mediaObject from "@/plugins/vuex/mediaObject"
import post from "@/plugins/vuex/post"
import story from "@/plugins/vuex/story"
import comment from "@/plugins/vuex/comment"
import chat from "@/plugins/vuex/chat"
import message from "@/plugins/vuex/message"
import subscription from "@/plugins/vuex/subscription"
import course from "@/plugins/vuex/course"
import news from "@/plugins/vuex/news"
import person from "@/plugins/vuex/person";
import shared from "@/plugins/vuex/shared";
import selectedPost from "@/plugins/vuex/selectedPost";

export default createStore({
    modules: {
        user,
        selectedPost,
        person,
        mediaObject,
        post,
        story,
        comment,
        course,
        chat,
        message,
        subscription,
        news,
        shared
    }
})
