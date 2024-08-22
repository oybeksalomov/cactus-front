<template>
    <div class="storyContainer">
        <video
            ref="videoRef"
            :src="getBaseUrl + story.media.contentUrl"
            controls
            class="storyMedia"
        ></video>
    </div>
</template>

<script>

export default {
    name: "StoryVideoPlayer",
    props: {
        getBaseUrl: String,
        story: Object,
    },
    methods: {
        setupIntersectionObserver() {
            const video = this.$refs.videoRef;
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.5,
            };
            const callback = (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                    }
                });
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(video);
        },
    },
    mounted() {
        this.setupIntersectionObserver();
    }
}
</script>

<style scoped>
.storyContainer {
    height: 90vh;
}

.storyMedia {
    height: 100%;
    width: 100%;
}

@media (max-width: 768px) {
    .storyContainer {
        height: 85vh;
    }
}
</style>
