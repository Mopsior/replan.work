import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

interface ExternalLinkProps extends ComponentPropsWithoutRef<'a'> {
    to: string
    withUnderline?: boolean
}

export const ExternalLink = ({ to, withUnderline = false, ...props }: ExternalLinkProps) => {
    return (
        <a
            href={to}
            target='_blank'
            rel='noopener noreferrer'
            className={cn([withUnderline && 'hover:underline', props.className])}
            {...props}
        />
    )
}
