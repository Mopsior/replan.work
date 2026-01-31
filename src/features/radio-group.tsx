import type { ComponentProps, ReactNode } from 'react'
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
    FieldTitle,
} from '@/components/ui/field'
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export const RadioGroup = ({
    items,
    orientation = 'horizontal',
    ...props
}: {
    items: Array<{
        title?: string
        description?: string
        icon?: ReactNode
        value: string
    }>
    orientation?: ComponentProps<typeof Field>['orientation']
} & ComponentProps<typeof BaseRadioGroup>) => {
    return (
        <BaseRadioGroup {...props}>
            {items.map((item) => (
                <FieldLabel htmlFor={item.value} key={`radio-group-item-${item.value}`}>
                    <Field orientation={orientation} className='cursor-pointer'>
                        <FieldContent>
                            {item.icon ? (
                                <div className='flex items-center gap-x-2 capitalize'>
                                    {item.icon}
                                    {item.title && <FieldTitle>{item.title}</FieldTitle>}
                                </div>
                            ) : (
                                item.title && <FieldTitle>{item.title}</FieldTitle>
                            )}
                            {item.description && (
                                <FieldDescription>{item.description}</FieldDescription>
                            )}
                        </FieldContent>
                        <RadioGroupItem value={item.value} id={item.value} />
                    </Field>
                </FieldLabel>
            ))}
        </BaseRadioGroup>
    )
}
