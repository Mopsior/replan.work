import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { useUserCalendars } from '@/hooks/use-user-calendars'
import { Route } from '@/routes/app/route'
import { AdvancedCollapsible } from './form/advanceed-collapsible'
import { DateField } from './form/date-field'
import { useAppForm } from './form/hook'
import { defaultFormValues, formSchema } from './types'

// TODO
// - Add mobile time-picker

export const EventForm = () => {
    const { t } = useTranslation()
    const { userId } = Route.useLoaderData()
    const { data: calendars } = useUserCalendars(userId)

    const form = useAppForm({
        defaultValues: defaultFormValues(calendars),
        validators: {
            onSubmit: formSchema,
            onBlur: formSchema,
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
        listeners: {
            onChange: ({ formApi, fieldApi }) => {
                if (fieldApi.name === 'calendarId') {
                    const selectedCalendar = calendars?.find(
                        (calendar) => calendar.id === fieldApi.state.value,
                    )
                    if (selectedCalendar && selectedCalendar.name !== formApi.state.values.title) {
                        formApi.setFieldValue('title', selectedCalendar.name)
                    }
                }
            },
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className='flex flex-col w-full h-full justify-between space-y-4'
        >
            <FieldGroup className='gap-y-6'>
                <DateField form={form} />
                <form.AppField name='eventType' children={(field) => <field.EventTypeField />} />
                <form.AppField name='calendarId' children={(field) => <field.CalendarField />} />
                <AdvancedCollapsible>
                    <form.AppField name='title' children={(field) => <field.TitleField />} />
                </AdvancedCollapsible>
            </FieldGroup>
            <Button type='submit'>
                <Plus size={16} />
                {t('calendar.event.create.button')}
            </Button>
        </form>
    )
}
