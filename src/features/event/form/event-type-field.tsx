import { Building, House, Laptop } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Field, FieldLabel } from '@/components/ui/field'
import { FormRequired } from '@/features/form-required'
import { RadioGroup } from '@/features/inputs/radio-group'
import { RadioGroupVariant } from '@/features/inputs/types'
import { EventType } from '@/types/enums'
import { FormValues } from '../types'
import { useFieldContext } from './hook'

export const EventTypeField = () => {
    const { t } = useTranslation()
    const field = useFieldContext<FormValues['eventType']>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
                {t('calendar.event.create.form.eventType.label')}
                <FormRequired />
            </FieldLabel>
            <RadioGroup
                variant={RadioGroupVariant.DYNAMIC}
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as EventType)}
                className='gap-y-2'
                items={[
                    {
                        value: EventType.STATIONARY,
                        title: t('calendar.event.create.form.eventType.stationary'),
                        icon: <Building size={16} />,
                    },
                    {
                        value: EventType.REMOTE,
                        title: t('calendar.event.create.form.eventType.remote'),
                        icon: <House size={16} />,
                    },
                    {
                        value: EventType.HYBRID,
                        title: t('calendar.event.create.form.eventType.hybrid'),
                        icon: <Laptop size={16} />,
                    },
                ]}
            />
        </Field>
    )
}
