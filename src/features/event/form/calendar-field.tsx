import { useTranslation } from 'react-i18next'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { FormRequired } from '@/features/form-required'
import { FormValues } from '../types'
import { CalendarSelect } from './calendar-select'
import { useFieldContext } from './hook'

export const CalendarField = () => {
    const { t } = useTranslation()
    const field = useFieldContext<FormValues['calendarId']>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
                {t('calendar.event.create.form.calendar.label')}
                <FormRequired />
            </FieldLabel>
            <CalendarSelect
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value as string)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    )
}
