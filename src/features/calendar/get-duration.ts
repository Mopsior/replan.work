import { parseTime } from './parse-time'

export const getDuration = (firstTime: string, secondTime?: string) => {
    if (secondTime) {
        return parseTime(secondTime) - parseTime(firstTime)
    }

    return parseTime(firstTime)
}
