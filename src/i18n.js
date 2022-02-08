import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
    const locales = require.context('./langs', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })

    return messages
}

export default new VueI18n({
    locale: getBrowserLocale(),
    fallbackLocale: 'en',
    silentFallbackWarn: true,
    messages: loadLocaleMessages()
})

function getBrowserLocale() {
    if (localStorage.Lang != null) return localStorage.Lang;

    const navigatorLocale =
        navigator.languages !== undefined ?
            navigator.languages[0] :
            navigator.language

    if (!navigatorLocale) {
        return undefined
    }
    if (navigatorLocale.trim().split(/-|_/)[0].match(/en|sl/i)) {
        return navigatorLocale.trim().split(/-|_/)[0]
    }
    return "en"
}