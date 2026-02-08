import { useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Trash } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { removeCalendarFn } from '@/functions/calendar/remove-calendar'
import { Route } from '@/routes/app/route'
import { QueryKeys } from '@/types/constants'
import { catchError } from '@/utils/catch-error'
import { RemoveCalendarProps } from './types'

export const RemoveCalendnarButton = ({ id, setIsOpen }: RemoveCalendarProps) => {
    const { t } = useTranslation()
    const removeCalendar = useServerFn(removeCalendarFn)
    const state = Route.useLoaderData()
    const queryClient = useQueryClient()

    const handleRemove = async () => {
        const [error] = await catchError(removeCalendar({ data: { id: id, userId: state.userId } }))

        if (error) {
            console.error(error)
            toast.error(t('appSettings.calendars.remove.error'), { description: error.message })
            return
        }

        toast.success(t('appSettings.calendars.remove.success'))
        queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_CALENDARS, state.userId] })
        setIsOpen(false)
    }

    return (
        <Button type='button' className='w-full' variant='destructive' onClick={handleRemove}>
            <Trash size={16} />
            {t('delete')}
        </Button>
    )
}
