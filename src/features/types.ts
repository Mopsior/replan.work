import { ReactNode } from 'react'

export interface ChoiceCardProps {
    title: string
    children?: string | ReactNode
    value: string
}
