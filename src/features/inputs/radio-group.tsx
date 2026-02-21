import {
    FieldTitle as BaseFieldTitle,
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from '@/components/ui/field'
import { RadioGroup as BaseRadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { FieldTitleProps, RadioGroupProps } from './types'

export const RadioGroup = ({
    items,
    orientation = 'horizontal',
    coloredTitle,
    ...props
}: RadioGroupProps) => {
    return (
        <BaseRadioGroup {...props}>
            {items.map((item) => (
                <FieldLabel htmlFor={item.value} key={`radio-group-item-${item.value}`}>
                    <Field orientation={orientation} className='cursor-pointer'>
                        <FieldContent>
                            {item.icon ? (
                                <div className='flex items-center gap-x-2 capitalize'>
                                    {item.icon}
                                    {item.title && (
                                        <FieldTitle coloredTitle={coloredTitle} className='mt-0.5'>
                                            {item.title}
                                        </FieldTitle>
                                    )}
                                </div>
                            ) : (
                                item.title && (
                                    <FieldTitle coloredTitle={coloredTitle}>
                                        {item.title}
                                    </FieldTitle>
                                )
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

const FieldTitle = ({ children, className, coloredTitle }: FieldTitleProps) => (
    <BaseFieldTitle className={cn([coloredTitle && 'text-foreground font-normal', className])}>
        {children}
    </BaseFieldTitle>
)
