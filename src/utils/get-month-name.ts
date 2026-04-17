import { t } from 'i18next'

export const getMonthName = (month: number) => {
    const months = [
        t('calendar.months.1'),
        t('calendar.months.2'),
        t('calendar.months.3'),
        t('calendar.months.4'),
        t('calendar.months.5'),
        t('calendar.months.6'),
        t('calendar.months.7'),
        t('calendar.months.8'),
        t('calendar.months.9'),
        t('calendar.months.10'),
        t('calendar.months.11'),
        t('calendar.months.12'),
    ]
    return months[month - 1] || ''
}
