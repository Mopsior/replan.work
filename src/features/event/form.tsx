import { createEvent as createEventFn } from '@functions/event/create-event'
import { useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { useUserCalendars } from '@/hooks/use-user-calendars'
import { Route } from '@/routes/app/route'
import { QueryKeys } from '@/types/constants'
import { catchError } from '@/utils/catch-error'
import { AdvancedCollapsible } from './form/advanced-collapsible'
import { DateField } from './form/date-field'
import { useAppForm } from './form/hook'
import { defaultFormValues, formSchema } from './types'

const formatTime = (hours?: string, minutes?: string) => `${hours ?? '00'}:${minutes ?? '00'}`

export const EventForm = ({ setIsOpen }: { setIsOpen: (open: boolean) => void }) => {
    const { t } = useTranslation()
    const { userId } = Route.useLoaderData()
    const { data: calendars } = useUserCalendars(userId)
    const queryClient = useQueryClient()
    const createEvent = useServerFn(createEventFn)

    const form = useAppForm({
        defaultValues: defaultFormValues(calendars),
        validators: {
            onSubmit: formSchema,
            onBlur: formSchema,
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            const title = calendars?.find((calendar) => calendar.id === value.calendarId)?.name
                ? undefined
                : value.title
            const isTotalTime = Boolean(value.totalTimeHours || value.totalTimeMinutes)

            const [error] = await catchError(
                createEvent({
                    data: {
                        calendarId: value.calendarId,
                        title,
                        eventType: value.eventType,
                        startTime: isTotalTime
                            ? undefined
                            : formatTime(value.startTimeHours, value.startTimeMinutes),
                        endTime: isTotalTime
                            ? undefined
                            : formatTime(value.endTimeHours, value.endTimeMinutes),
                        totalTime: isTotalTime
                            ? formatTime(value.totalTimeHours, value.totalTimeMinutes)
                            : undefined,
                        date: value.date,
                    },
                }),
            )

            if (error) {
                console.error(error)
                toast.error(t('calendar.event.create.form.error'), { description: error.message })
                return
            }

            toast.success(t('calendar.event.create.form.success'))
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_CALENDARS, userId] })
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_EVENTS, userId] })
            setIsOpen(false)
            form.reset()
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
