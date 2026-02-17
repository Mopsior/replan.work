export const formatTime = (diff: number) => {
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)

    return `${hours.toString()}h ${minutes > 0 ? `${minutes.toString().padStart(2, '0')} min` : ''}`
}
