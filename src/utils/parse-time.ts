export const parseTime = (time: string) => {
    const [h, m, s] = time.split(':').map(parseFloat)
    return h * 3600000 + m * 60000 + s * 1000
}
