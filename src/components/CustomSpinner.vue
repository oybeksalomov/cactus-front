<template>
    <div class="my-spinner"></div>
</template>

<script>
export default {
    name: 'custom-spinner'
}
</script>

<style scoped>
.my-spinner {
    position: relative;
    width: 2rem;
    height: 2rem;
    background: linear-gradient(#CCFF33, #9EF01A, #70E000, #38B000);
    border-radius: 50%;
    animation: animate 1s linear infinite;
}
.my-spinner:before {
    position: absolute;
    content: "";
    background: #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    border-radius: 50%;
}
@keyframes animate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>