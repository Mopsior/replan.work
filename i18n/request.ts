import Negotiator from 'negotiator'
import { getRequestConfig } from 'next-intl/server'
import { cookies, headers } from 'next/headers'

const locales = ['pl']

export default getRequestConfig(async () => {
    const browserHeaders = await headers()
    const store = await cookies()
    const browserLanguage = new Negotiator({ headers: Object.fromEntries(browserHeaders) }).language(locales)
    const locale = store.get('locale')?.value || browserLanguage || locales[0]

    return {
        locale,
        messages: (await import(`@/messages/${locale}.json`)).default
    }
})