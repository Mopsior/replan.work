import { ComponentProps, Fragment } from 'react'
import {
    FieldTitle as BaseFieldTitle,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field'
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { FieldTitleProps, RadioGroupItemProps, RadioGroupProps, RadioGroupVariant } from './types'

export const RadioGroup = ({
    items,
    className,
    variant = RadioGroupVariant.DEFAULT,
    ...props
}: RadioGroupProps) => {
    return (
        <BaseRadioGroup
            className={cn([
                className,
                variant === RadioGroupVariant.SMALL &&
                    'flex items-center gap-x-2 overflow-y-auto justify-center',
                variant === RadioGroupVariant.DYNAMIC &&
                    'not-md:flex not-md:items-center not-md:gap-x-2 not-md:overflow-y-auto not-md:justify-center',
            ])}
            {...props}
        >
            {items.map((item) => (
                <Fragment key={`radio-group-item-${item.value}`}>
                    {(variant === RadioGroupVariant.DEFAULT ||
                        variant === RadioGroupVariant.DYNAMIC) && (
                        <RadioGroupItemWide
                            item={item}
                            className={cn(variant === RadioGroupVariant.DYNAMIC && 'not-md:hidden')}
                        />
                    )}
                    {(variant === RadioGroupVariant.SMALL ||
                        variant === RadioGroupVariant.DYNAMIC) && (
                        <RadioGroupItemSmall
                            item={item}
                            className={cn(variant === RadioGroupVariant.DYNAMIC && 'md:hidden')}
                        />
                    )}
                </Fragment>
            ))}
        </BaseRadioGroup>
    )
}

export const RadioGroupItemWide = ({
    item,
    ...props
}: RadioGroupItemProps & ComponentProps<typeof FieldLabel>) => (
    <FieldLabel htmlFor={item.value} {...props}>
        <Field className='cursor-pointer px-4! py-2! items-center!' orientation='horizontal'>
            <FieldContent>
                {item.icon ? (
                    <div className='flex items-center gap-x-2 capitalize'>
                        {item.icon}
                        {item.title && (
                            <FieldTitle className='mt-0.5 text-foreground'>{item.title}</FieldTitle>
                        )}
                    </div>
                ) : (
                    item.title && <FieldTitle className='text-foreground'>{item.title}</FieldTitle>
                )}
                {item.description && <FieldDescription>{item.description}</FieldDescription>}
            </FieldContent>
            <RadioGroupItem value={item.value} id={item.value} />
        </Field>
    </FieldLabel>
)

export const RadioGroupItemSmall = ({
    item,
    className,
    ...props
}: RadioGroupItemProps & ComponentProps<typeof FieldLabel>) => (
    <FieldLabel
        className={cn(
            'flex items-center gap-x-2 rounded-md border px-2 py-1 w-fit has-data-checked:bg-primary/10 has-data-checked:border-primary transition-colors group cursor-pointer *:cursor-pointer',
            className,
        )}
        htmlFor={item.value}
        {...props}
    >
        <FieldContent className='group-has-data-checked:text-primary text-base flex flex-row items-center! gap-x-2'>
            {item.icon}
            {item.title}
        </FieldContent>
        <RadioGroupItem value={item.value} id={item.value} withIndicator={false} />
    </FieldLabel>
)

const FieldTitle = ({ children, className }: FieldTitleProps) => (
    <BaseFieldTitle className={className}>{children}</BaseFieldTitle>
)
