<template>
    <div id="index" class="mainContainer mainContainerPadding bg-white position-relative">
        <NavbarRow/>
        <StoriesRow/>
        <PostRow/>
        <ButtonNavbar/>
    </div>
</template>

<script>

import PostRow from "@/components/PostRow.vue";
import StoriesRow from "@/components/StoriesRow.vue";
import NavbarRow from "@/components/NavbarRow.vue";
import ButtonNavbar from "@/components/ButtonNavbar.vue";
export default {
    name: 'HomePage',
    components: {ButtonNavbar, NavbarRow, StoriesRow, PostRow}
}
</script>

<style scoped>

</style>
