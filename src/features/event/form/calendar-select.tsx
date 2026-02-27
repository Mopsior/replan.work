import { t } from 'i18next'
import { ChevronDown } from 'lucide-react'
import { RadioGroup } from '@/components/ui/radio-group'
import ListItem from '@/features/calendar/list-item'
import { ErrorScreen } from '@/features/error-screen'
import { EmptyListSkeleton, ListItemSkeleton } from '@/features/skeletons/list-item'
import { useUserCalendars } from '@/hooks/use-user-calendars'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/app/route'
import { CalendarListProps, CalendarSelectProps, MobileCalendarListProps } from './types'

export const CalendarSelect = ({ value, onValueChange }: CalendarSelectProps) => {
    const { userId } = Route.useLoaderData()
    const { data: calendars, isLoading, error } = useUserCalendars(userId)

    if (error) return <ErrorScreen error={error} />
    if (!calendars) return !isLoading && <EmptyListSkeleton />

    return (
        <div className='flex flex-row md:flex-col gap-y-2 not-md:items-center w-full'>
            <CalendarsList
                calendars={calendars}
                value={value}
                onValueChange={onValueChange}
                isLoading={isLoading}
                className='not-md:hidden'
            />
            <MobileCalendarsList
                calendars={calendars}
                value={value}
                isLoading={isLoading}
                className='md:hidden'
            />
        </div>
    )
}

const CalendarsList = ({
    value,
    onValueChange,
    calendars,
    isLoading,
    className,
}: CalendarListProps) => {
    if (isLoading) return <ListItemSkeleton className={className} />

    return (
        <RadioGroup
            value={value}
            onValueChange={onValueChange}
            className={cn(['flex flex-col gap-y-2', className])}
        >
            {calendars.map((calendar) => (
                <ListItem.RadioItem
                    key={`event-creation-calendar-${calendar.id}`}
                    name={calendar.name}
                    color={calendar.color}
                    value={calendar.id}
                />
            ))}
        </RadioGroup>
    )
}

const MobileCalendarsList = ({
    value,
    isLoading,
    className,
    calendars,
}: MobileCalendarListProps) => {
    if (isLoading) return <ListItemSkeleton count={1} className={className} />
    const selectedCalendar = calendars.find((calendar) => calendar.id === value) ?? calendars[0]

    return (
        <ListItem
            name={selectedCalendar.name}
            color={selectedCalendar.color}
            className={cn(['text-sm text-muted-foreground', className])}
            addon={
                <span className='flex items-center gap-x-1'>
                    {t('select')}
                    <ChevronDown size={14} />
                </span>
            }
        />
    )
}
