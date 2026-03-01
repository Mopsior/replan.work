import { t } from 'i18next'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup } from '@/components/ui/radio-group'
import ListItem from '@/features/calendar/list-item'
import Drawer from '@/features/drawer'
import { ErrorScreen } from '@/features/error-screen'
import { EmptyListSkeleton, ListItemSkeleton } from '@/features/skeletons/list-item'
import { useUserCalendars } from '@/hooks/use-user-calendars'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/app/route'
import { CalendarListProps, CalendarSelectProps } from './types'

export const CalendarSelect = ({ value, onValueChange }: CalendarSelectProps) => {
    const { userId } = Route.useLoaderData()
    const { data: calendars, isLoading, error } = useUserCalendars(userId)

    if (error) return <ErrorScreen error={error} />
    if (!calendars) return !isLoading && <EmptyListSkeleton />

    return (
        <div className='flex flex-row md:flex-col gap-y-2 not-md:items-center w-full'>
            <ExpandableCalendarList
                value={value}
                onValueChange={onValueChange}
                calendars={calendars}
                isLoading={isLoading}
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
                    itemColor={calendar.color}
                    value={calendar.id}
                />
            ))}
        </RadioGroup>
    )
}

const ExpandableCalendarList = ({
    value,
    onValueChange,
    calendars,
    isLoading,
    className,
}: CalendarListProps) => {
    const [isOpen, setIsOpen] = useState(false)
    if (isLoading) return <ListItemSkeleton count={1} className={className} />
    const selectedCalendar = calendars.find((calendar) => calendar.id === value) ?? calendars[0]

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <ListItem
                    name={selectedCalendar.name}
                    itemColor={selectedCalendar.color}
                    className={cn(['text-sm text-muted-foreground', className])}
                    addon={
                        <span className='flex items-center gap-x-1'>
                            {t('select')}
                            <ChevronDown size={14} />
                        </span>
                    }
                />
            }
            bottomChildren={
                <Button type='button' onClick={() => setIsOpen(false)}>
                    {t('select')}
                </Button>
            }
        >
            <Drawer.Title>{t('calendar.event.create.form.calendar.choose')}</Drawer.Title>
            <Drawer.HiddenDescription>
                {t('calendar.event.create.form.calendar.altDescription')}
            </Drawer.HiddenDescription>
            <CalendarsList
                value={value}
                onValueChange={onValueChange}
                calendars={calendars}
                isLoading={isLoading}
            />
        </Drawer.Dynamic>
    )
}
