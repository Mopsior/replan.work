import type { ClassNameValue } from 'tailwind-merge'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

export const H1 = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'h1'> & { className?: ClassNameValue }) => {
    return (
        <h1
            className={cn([
                'text-center text-4xl font-extrabold tracking-tight text-balance',
                className,
            ])}
            {...props}
        />
    )
}

export const H2 = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'h2'> & { className?: ClassNameValue }) => {
    return <h2 className={cn(['text-3xl font-semibold tracking-tight', className])} {...props} />
}

export const H3 = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'h3'> & { className?: ClassNameValue }) => {
    return <h3 className={cn(['text-2xl font-semibold tracking-tight', className])} {...props} />
}

export const H4 = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'h4'> & { className?: ClassNameValue }) => {
    return <h4 className={cn(['text-xl font-semibold tracking-tight', className])} {...props} />
}

export const P = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'p'> & { className?: ClassNameValue }) => {
    return <p className={cn(['leading-7', className])} {...props} />
}

export const InlineCode = ({
    className,
    ...props
}: ComponentPropsWithoutRef<'code'> & { className?: ClassNameValue }) => (
    <code className={cn(['bg-secondary rounded-md px-2 py-0.5', className])} {...props} />
)
