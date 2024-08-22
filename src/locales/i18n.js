import { createI18n } from 'vue-i18n'

const locales = ['uz', 'ru', 'en']

async function loadLocaleMessages() {
    const messages = {}
    await Promise.all(locales.map(async (locale) => {
        const localeMessages = await import((`./${locale}.json`))
        messages[locale] = localeMessages.default
    }))
    return messages
}

export default createI18n({
    locale: localStorage.getItem('locale') || 'uz',
    fallbackLocale: 'uz',
    messages: await loadLocaleMessages()
})
