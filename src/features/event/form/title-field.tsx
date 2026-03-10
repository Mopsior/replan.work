import { useTranslation } from 'react-i18next'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormValues } from '../types'
import { useFieldContext } from './hook'

export const TitleField = () => {
    const { t } = useTranslation()
    const field = useFieldContext<FormValues['title']>()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={field.name}>
                {t('calendar.event.create.form.title.label')}
            </FieldLabel>
            <Input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
            <FieldDescription>{t('calendar.event.create.form.title.description')}</FieldDescription>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    )
}
