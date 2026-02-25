import { ComponentProps } from 'react'
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
                <>
                    {(variant === RadioGroupVariant.DEFAULT ||
                        variant === RadioGroupVariant.DYNAMIC) && (
                        <RadioGroupItemWide
                            item={item}
                            key={`radio-group-item-default-${item.value}`}
                            className={cn(variant === RadioGroupVariant.DYNAMIC && 'not-md:hidden')}
                        />
                    )}
                    {(variant === RadioGroupVariant.SMALL ||
                        variant === RadioGroupVariant.DYNAMIC) && (
                        <RadioGroupItemSmall
                            item={item}
                            key={`radio-group-item-small-${item.value}`}
                            className={cn(variant === RadioGroupVariant.DYNAMIC && 'md:hidden')}
                        />
                    )}
                </>
            ))}
        </BaseRadioGroup>
    )
}

export const RadioGroupItemWide = ({
    item,
    className,
    ...props
}: RadioGroupItemProps & ComponentProps<typeof FieldLabel>) => (
    <FieldLabel htmlFor={item.value} className={className} {...props}>
        <Field className='cursor-pointer' orientation='horizontal'>
            <FieldContent>
                {item.icon ? (
                    <div className='flex items-center gap-x-2 capitalize'>
                        {item.icon}
                        {item.title && <FieldTitle className='mt-0.5'>{item.title}</FieldTitle>}
                    </div>
                ) : (
                    item.title && <FieldTitle>{item.title}</FieldTitle>
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
}: RadioGroupItemProps & ComponentProps<typeof Field>) => (
    <Field
        className={cn(
            'flex items-center gap-x-2 rounded-md border px-2 py-1 w-fit has-data-checked:bg-primary/10 has-data-checked:border-primary transition-colors group text-primary cursor-pointer *:cursor-pointer',
            className,
        )}
        orientation='vertical'
        {...props}
    >
        <FieldLabel htmlFor={item.value} className='group-has-data-checked:text-primary text-base'>
            {item.icon}
            {item.title}
        </FieldLabel>
        <RadioGroupItem value={item.value} id={item.value} withIndicator={false} />
    </Field>
)

const FieldTitle = ({ children, className }: FieldTitleProps) => (
    <BaseFieldTitle className={className}>{children}</BaseFieldTitle>
)
