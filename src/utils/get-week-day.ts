import { t } from 'i18next'

export const getWeekDay = (day: number) => {
    const weekDays = [
        t('calendar.weekdays.1'),
        t('calendar.weekdays.2'),
        t('calendar.weekdays.3'),
        t('calendar.weekdays.4'),
        t('calendar.weekdays.5'),
        t('calendar.weekdays.6'),
        t('calendar.weekdays.7'),
    ]
    return weekDays[day] || ''
}
