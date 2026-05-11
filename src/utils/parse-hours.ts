export const parseHours = (hours: number, minutes?: number) => {
    if ((!hours || hours === 0) && (!minutes || minutes === 0)) {
        return null
    }
    if (!minutes || minutes === 0) {
        return `${hours} godz`
    }
    return `${hours} godz ${minutes} min`
}
