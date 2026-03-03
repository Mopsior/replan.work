import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { CalendarField } from './calendar-field'
import { EventTypeField } from './event-type-field'
import { TimePickerField } from './time-picker-field'
import { TitleField } from './title-field'

export const { fieldContext, formContext, useFieldContext } = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TitleField,
        CalendarField,
        EventTypeField,
        TimePickerField,
    },
    formComponents: {},
})
