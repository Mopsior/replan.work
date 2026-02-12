export const getDuration = (startTime: string, endTime: string) => {
    const parseTime = (time: string) => {
        const [h, m, s] = time.split(':').map(parseFloat)
        return h * 3600000 + m * 60000 + s * 1000
    }

    return parseTime(endTime) - parseTime(startTime)
}
