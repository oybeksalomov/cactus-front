<template>
    <select @change="changeLocale()" v-model="locale" class="select px-2">
        <option
            v-for="(l, index) in locales"
            :key="index"
            :value="l"
            :class="{'select': locale === l }"
        >
            {{ l.toUpperCase() }}
        </option>
    </select>
</template>

<script>
import i18n from "@/locales/i18n";

export default {
    name: "SwitcherLanguage",
    data() {
        return {
            locales: ['uz', 'ru', 'en'],
            locale: localStorage.getItem('locale') || 'uz'
        }
    },
    methods: {
        changeLocale() {
            localStorage.setItem('locale', this.locale)
            i18n.locale = this.locale
        }
    },
    mounted() {
        console.log(localStorage.getItem('locale'))
    },
    watch: {
        locale() {
            this.$i18n.locale = this.locale;
        }
    }
}
</script>

<style scoped>
.select {
    border: none;
    background: none;
}
</style>