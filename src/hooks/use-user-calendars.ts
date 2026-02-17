import { useQuery } from '@tanstack/react-query'
import { getCalendars } from '@/functions/calendar/get-calendars'
import { QueryKeys } from '@/types/constants'

export const useUserCalendars = (userId: string) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QueryKeys.USER_CALENDARS, userId],
        queryFn: () => getCalendars({ data: { userId } }),
        staleTime: 1000 * 60 * 15,
        refetchOnWindowFocus: false,
    })

    return { data, isLoading, isError, error }
}
