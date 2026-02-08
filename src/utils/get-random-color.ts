import { COLOR_PALETTE } from '@/types/constants'

export const getRandomColor = () =>
    COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)].hex as string
