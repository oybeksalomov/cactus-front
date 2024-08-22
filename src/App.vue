<template>
    <router-view/>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: 'App',
    computed: {
        ...mapGetters(['isAuthorized', 'getRefreshToken'])
    },
    methods: {
        ...mapActions(['fetchAboutMe', 'refreshToken']),
        ...mapMutations(['clearTokens'])
    },
    mounted() {
        if (this.isAuthorized) {
            this.fetchAboutMe()
                .catch(() => {
                    this.refreshToken({refreshToken: this.getRefreshToken})
                        .then(() => {
                            this.fetchAboutMe()
                                .then(() => {
                                    this.$router.push('/')
                                })
                        })
                        .catch(() => {
                            this.clearTokens()
                            this.$router.push('/login')
                        })
                })
        }
    }
}
</script>

<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 0.875rem;
    background-color: #FAFAFA;
    max-width: 425px;
    margin: auto;
}

a {
    text-decoration: none;
}

.mainContainer {
    min-height: 100vh;
    width: 100%;
}

.mainContainerPadding {
    padding-bottom: 48px;
}

.pointer {
    cursor: pointer;
}

.iconBtnActive {
    color: #262628;
    padding: 0 0.25rem;
    border: none;
    background-color: #26262800;
    text-decoration: none;
}

.aButton {
    color: #262628;
}

.iconBtnActive:hover,
.aButton:hover {
    opacity: 0.8;
}

.iconBtnActive:active,
.aButton:active {
    opacity: 0.5;
}

.fontSizeS {
    font-size: 0.75rem;
}

.tabIconActive {
    color: #43a2fa;
}
.errorMsg {
    color: red;
}

/******************************************************* login *********************************************/
.bgImage {
    background-image: url('./components/assets/background-img.png');
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    height: 50vh;
    width: 100%;
}

.bgContainer {
    top: 4rem;
    height: fit-content;
    width: 100%;
}

.backBtn {
    outline: none;
    border: none;
    background-color: #26262800;
}

.backBtn:hover {
    opacity: 0.85;
}

.backBtn:active {
    opacity: 1;
}

.formBtn {
    background-color: #262628;
}

.formBtn:hover {
    opacity: 0.8;
}

.formBtn:active {
    opacity: 0.75;
}

.cactusLogo img {
    width: 130px;
}

/******************************************************* register *********************************************/

.step {
    background-color: #d9d9d9;
    width: 7px;
    height: 7px;
    margin: 6px;
}

.activeStep {
    background-color: #38b000;
}

/************************************************index*****************************************************/

.cactusIcon {
    font-size: 1.5rem;
}

.avatarImgNav {
    width: 56px;
    height: 56px;
    border-radius: 50%;
}

.avatarImg {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
}

.avatarContainer {
    border-radius: 50%;
    padding: 2px;
    background-color: white;
    text-decoration: none;
}

.avatarBorder {
    background: linear-gradient(196.07deg, #008000 11.13%, #70E000 34.56%, #9EF01A 71.49%, #CCFF33 87.79%);
    padding: 2px;
    border-radius: 50%;
    display: inline-block;
}

.postMedia {
    width: 100%;
    height: fit-content;
    object-fit: contain;
}

.postMediaBg {
    width: 100%;
    background-color: #262628;
}

.postInfo {
    width: 90%;
    bottom: 10px;
    background-color: rgba(255, 255, 255, 0.556);
    backdrop-filter: blur(5px)
}

.bottomNavIcon {
    color: #262628;
}

.bottomNavIcon img {
    width: 40px;
}

#bottomNavbar {
    max-width: 425px;
    width: inherit;
}

/*************************************************story******************************************/
.sendMessage {
    background: rgba(50, 50, 50, 0.5);
    backdrop-filter: blur(5px);
}

.sendMessageBtn {
    color: white;
}

.sendMessageInput {
    background-color: rgba(50, 50, 50, 0);
    outline: none;
}

.sendMessageInput::placeholder {
    color: #fff;
}

/************************************************storyUpload***************************************/
.rightButton {
    width: 40px;
    height: 40px;
    background: rgba(50, 50, 50, 0.5);
    backdrop-filter: blur(5px);
}

/**********************************************search**********************************/
.searchInput {
    background-color: #26262800;
    outline: none;
    border: none;
    color: #595C5F;
    font-weight: 600;

}

.searchInput::placeholder {
    font-weight: 600;
    color: #9797bd;

}

.searchBtn i {
    color: #9797bd;
}

/*random posts*/
.randomPost {
    height: fit-content;
}

.randomPostMedia {
    aspect-ratio: 1 / 1;
}

.randomPostMedia img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50%;
}

/*************************************************accaunt*********************************/
.backWhite {
    top: 2rem;
    left: 1rem;
}

.backWhite img {
    width: 36px;
}

.accBgContainer {
    top: 6rem;
    height: fit-content;
    width: 100%;
}

.accMenuBtn {
    top: 2rem;
    right: 1rem;
}

.accAvatarImg {
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
}


.pl circle {
    transform-box: fill-box;
    transform-origin: 50% 50%;
}

.pl__ring1 {
    animation: ring1 4s 0s ease-in-out infinite;
}

.pl__ring2 {
    animation: ring2 4s 0.04s ease-in-out infinite;
}

.pl__ring3 {
    animation: ring3 4s 0.08s ease-in-out infinite;
}

.pl__ring4 {
    animation: ring4 4s 0.12s ease-in-out infinite;
}

.pl__ring5 {
    animation: ring5 4s 0.16s ease-in-out infinite;
}

.pl__ring6 {
    animation: ring6 4s 0.2s ease-in-out infinite;
}

/* Animations */
@keyframes ring1 {
    from {
        stroke-dashoffset: -376.237129776;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -94.247778;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -376.237129776;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -94.247778;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -376.237129776;
        transform: rotate(4.75turn);
    }
}

@keyframes ring2 {
    from {
        stroke-dashoffset: -329.207488554;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -82.46680575;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -329.207488554;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -82.46680575;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -329.207488554;
        transform: rotate(4.75turn);
    }
}

@keyframes ring3 {
    from {
        stroke-dashoffset: -288.4484661616;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -72.2566298;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -288.4484661616;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -72.2566298;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -288.4484661616;
        transform: rotate(4.75turn);
    }
}

@keyframes ring4 {
    from {
        stroke-dashoffset: -253.9600625988;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -63.61725015;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -253.9600625988;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -63.61725015;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -253.9600625988;
        transform: rotate(4.75turn);
    }
}

@keyframes ring5 {
    from {
        stroke-dashoffset: -225.7422778656;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -56.5486668;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -225.7422778656;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -56.5486668;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -225.7422778656;
        transform: rotate(4.75turn);
    }
}

@keyframes ring6 {
    from {
        stroke-dashoffset: -203.795111962;
        transform: rotate(-0.25turn);
        animation-timing-function: ease-in;
    }

    23% {
        stroke-dashoffset: -51.05087975;
        transform: rotate(1turn);
        animation-timing-function: ease-out;
    }

    46%, 50% {
        stroke-dashoffset: -203.795111962;
        transform: rotate(2.25turn);
        animation-timing-function: ease-in;
    }

    73% {
        stroke-dashoffset: -51.05087975;
        transform: rotate(3.5turn);
        animation-timing-function: ease-out;
    }

    96%, to {
        stroke-dashoffset: -203.795111962;
        transform: rotate(4.75turn);
    }
}
</style>
