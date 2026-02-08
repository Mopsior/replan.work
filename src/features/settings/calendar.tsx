import { useTranslation } from 'react-i18next'
import { useUserCalendars } from '@/hooks/use-user-calendars'
import { Route } from '@/routes/app/route'
import { getRandomColor } from '@/utils/get-random-color'
import { ListItem } from '../calendar/list-item'
import { ErrorScreen } from '../error-screen'
import { ListItemSkeleton } from '../skeletons/list-item'
import { NewCalendarDrawer } from './new-calendar-drawer'

export const CalendarSettings = () => {
    const { t } = useTranslation()
    const state = Route.useLoaderData()
    const { data, isLoading, isError, error } = useUserCalendars(state.userId)

    return (
        <div className='flex h-fit w-full flex-col gap-y-2'>
            <p className='text-muted-foreground text-sm'>{t('appSettings.calendars.label')}</p>
            {isError && error && <ErrorScreen error={error} />}
            {isLoading && <ListItemSkeleton />}
            {data?.map((calendar) => (
                <ListItem
                    key={`calendar-item-${calendar.id}`}
                    name={calendar.name}
                    color={calendar.color ?? getRandomColor()}
                    salary={calendar.salary ?? undefined}
                    id={calendar.id}
                />
            ))}
            {!isLoading && !isError && <NewCalendarDrawer />}
        </div>
    )
}
