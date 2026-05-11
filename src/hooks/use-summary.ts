import { useQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { getSummaryFn } from '@/functions/event/get-summary'
import { QueryKeys } from '@/types/constants'

export const useSummary = (userId: string, month: number, year: number, calendarId?: string) => {
    const getSummary = useServerFn(getSummaryFn)

    const { data, isLoading, isError, error } = useQuery({
        queryKey: [QueryKeys.USER_SUMMARY, userId, month, year, calendarId],
        queryFn: () => getSummary({ data: { userId, month, year, calendarId } }),
        staleTime: 1000 * 60 * 5,
    })

    return { data, isLoading, isError, error }
}
