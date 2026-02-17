import { useQuery } from '@tanstack/react-query'
import { getEvents } from '@/functions/event/get-events'
import { QueryKeys } from '@/types/constants'

export const useEvents = (userId: string, month: number, year: number) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QueryKeys.USER_EVENTS, userId, month, year],
        queryFn: () => getEvents({ data: { userId, month, year } }),
        staleTime: 1000 * 60 * 5,
    })

    return { data, isLoading, isError, error }
}
