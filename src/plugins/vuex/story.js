import axios from "./axios"

export default {
    actions: {
        fetchStories(context, page = null) {
            let storyUrl = '?order%5Bid%5D=desc';

            if (page) {
                storyUrl += '&page=' + page;
            }

            return new Promise((resolve, reject) => {
                axios.get('/stories' + storyUrl)
                    .then((response) => {
                        console.log('Storylar olindi')
                        console.log(response)

                        let stories = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateStories', stories)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Storylarni olishda xatolik')
                        reject()
                    })
            })
        },
        fetchStory(context, storyId) {
            return new Promise((resolve, reject) => {
                axios.get('/stories/' + storyId)
                    .then((response) => {
                        console.log('Story haqida ma\'lumot olindi')
                        console.log(response)

                        let story = {
                            id: response.data.id,
                            media: response.data.media.contentUrl,
                            text: response.data.text,
                            personId: response.data.user.person.id,
                            personPicture: response.data.user.person.picture.contentUrl,
                            givenName: response.data.user.person.givenName,
                            familyName: response.data.user.person.familyName,
                            storyLikes: response.data.storyLikes,
                            createdAt: response.data.createdAt,
                        }

                        context.commit('updateStory', story)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Story haqida ma\'lumot olishda xatolik')
                        reject()
                    })
            })
        },
        pushStory(context, story) {
            return new Promise((resolve, reject) => {
                axios.post('/stories', story)
                    .then((response) => {
                        console.log('Story yuborildi')
                        console.log(response)

                        context.commit('pushStory', response.data)
                        resolve()
                    })
                    .catch(() => {
                        console.log('Story yuborishda xatolik')
                        reject()
                    })
            })
        },
        pushStoryLike(context, storyId) {
            return new Promise((resolve, reject) => {
                axios.post('/story_likes', storyId)
                    .then((response) => {
                        console.log('StoryLike yuborildi')
                        console.log(response)

                        context.commit('pushStoryLike', response.data)
                        resolve()
                    })
                    .catch(() => {
                        console.log('StoryLike yuborishda xatolik')
                        reject()
                    })
            })
        },
        fetchStoryLikes(context) {
            return new Promise((resolve, reject) => {
                axios.get('/story_likes/orderBy')
                    .then((response) => {
                        console.log('StoryLikelar olindi')
                        console.log(response)

                        let storyLikes = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateStoryLikes', storyLikes)
                        resolve()
                    })
                    .catch(() => {
                        console.log('StoryLikelarni olishda xatolik')
                        reject()
                    })
            })
        },
        fetchUserStoryLikes(context) {
            return new Promise((resolve, reject) => {
                axios.get('/story_likes?order%5Bid%5D=desc')
                    .then((response) => {
                        console.log('User StoryLikelar olindi')
                        console.log(response)

                        let userStoryLikes = {
                            models: response.data['hydra:member'],
                            totalItems: response.data['hydra:totalItems']
                        }

                        context.commit('updateUserStoryLikes', userStoryLikes)
                        resolve()
                    })
                    .catch(() => {
                        console.log('User StoryLikelarni olishda xatolik')
                        reject()
                    })
            })
        }
    },
    mutations: {
        updateStories(state, stories) {
            state.stories = stories
        },
        updateStory(state, story) {
            state.story = story
        },
        pushStory(state, data) {
            state.data = data
        },
        pushStoryLike(state, data) {
            state.data = data
        },
        updateStoryLikes(state, storyLikes) {
            state.storyLikes = storyLikes
        },
        updateUserStoryLikes(state, userStoryLikes) {
            state.userStoryLikes = userStoryLikes
        }
    },
    state: {
        stories: {
            models: [],
            totalItems: 0
        },
        story: {
            id: null,
            media: null,
            text: null,
            personId: null,
            personPicture: null,
            givenName: null,
            familyName: null,
            storyLikes: [],
            createdAt: null
        },
        storyLikes: {
            models: [],
            totalItems: 0
        },
        userStoryLikes: {
            models: [],
            totalItems: 0
        },
    },
    getters: {
        getStories(state) {
            return state.stories
        },
        getStoriesCount(state) {
            return state.stories.totalItems
        },
        getStory(state) {
            return state.story
        },
        getStoryLikes(state) {
            return state.storyLikes
        },
        getUserStoryLikes(state) {
            return state.userStoryLikes
        }
    }
}
