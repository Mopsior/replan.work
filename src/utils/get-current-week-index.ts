import { getWeekIndexByDay } from './get-week-index-by-day'

interface CurrentWeekIndexParams {
    month: number
    year: number
    firstDayOfMonth: number
    today?: Date
}

export const getCurrentWeekIndex = ({
    month,
    year,
    firstDayOfMonth,
    today = new Date(),
}: CurrentWeekIndexParams) => {
    if (today.getMonth() + 1 !== month || today.getFullYear() !== year) {
        return 0
    }

    return getWeekIndexByDay(today.getDate(), firstDayOfMonth)
}
