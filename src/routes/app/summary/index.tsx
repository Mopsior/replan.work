import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import Drawer from '@/features/drawer'
import { ErrorScreen } from '@/features/error-screen'
import { Return } from '@/features/return'
import { RectangleSkeleton } from '@/features/skeletons/input'
import { DisclaimerDrawer } from '@/features/summary/disclaimer-drawer'
import { useDrawerData } from '@/hooks/use-drawer-data'
import { useSummary } from '@/hooks/use-summary'
import { cn } from '@/lib/utils'
import { Route as SearchRoute } from '@/routes/app/route'
import { parseHours } from '@/utils/parse-hours'

export const Route = createFileRoute('/app/summary/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()
    const { userId } = SearchRoute.useLoaderData()

    useDrawerData({
        title: t('summaryDrawer'),
        isTitleVisible: false,
        description: t('summary.description'),
        isDescriptionVisible: true,
    })

    const { month, year } = useSearch({
        from: SearchRoute.fullPath,
    })

    const { data, isLoading, error } = useSummary(userId, month, year)

    if (isLoading && !data) {
        return (
            <div className='flex flex-col gap-y-4 w-full h-full mt-2'>
                <RectangleSkeleton className='w-3/4 h-6 mx-auto' />
                <RectangleSkeleton className='w-full h-40' />
            </div>
        )
    }

    if (!data || error) {
        return <ErrorScreen error={error ?? new Error('No data returned from server')} />
    }

    return (
        <div className='flex w-full h-full gap-y-2 flex-col items-center'>
            <Drawer.Header>
                <Drawer.Title>{t('tabs.summary.label')}</Drawer.Title>
                <Drawer.Description>{t('summary.description')}</Drawer.Description>
            </Drawer.Header>
            <Table>
                <TableHeader>
                    <TableRow className='*:text-center *:tabular-nums *:text-sm'>
                        <TableHead />
                        <TableHead>{t('summary.table.sumHours')}</TableHead>
                        <TableHead>{t('summary.table.weekendHours')}</TableHead>
                        <TableHead>{t('summary.table.earnings')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='text-end'>
                    {data.weeks.map((week, index) => (
                        <TableRow className='*:tabular-nums' key={`summary-week-${index}`}>
                            <TableCell>{index + 1}.</TableCell>
                            <TableCell
                                className={cn([
                                    !week.totalTime.hours &&
                                        !week.totalTime.minutes &&
                                        'text-muted-foreground',
                                ])}
                            >
                                {parseHours(week.totalTime.hours, week.totalTime.minutes) ?? '-'}
                            </TableCell>
                            <TableCell
                                className={cn([
                                    !week.totalWeekendTime.hours &&
                                        !week.totalWeekendTime.minutes &&
                                        'text-muted-foreground',
                                ])}
                            >
                                {parseHours(
                                    week.totalWeekendTime.hours,
                                    week.totalWeekendTime.minutes,
                                ) ?? '-'}
                            </TableCell>
                            <TableCell
                                className={cn([
                                    'text-end',
                                    !week.salary && 'text-muted-foreground',
                                ])}
                            >
                                {week.salary.toFixed(2)} zł
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className='*:tabular-nums text-end'>
                        <TableCell />
                        <TableCell>
                            {parseHours(data.totalTime.hours, data.totalTime.minutes) ?? '0 godz'}
                        </TableCell>
                        <TableCell
                            className={cn([
                                !data.totalWeekendTime.hours &&
                                    !data.totalWeekendTime.minutes &&
                                    'text-muted-foreground',
                            ])}
                        >
                            {parseHours(
                                data.totalWeekendTime.hours,
                                data.totalWeekendTime.minutes,
                            ) ?? '-'}
                        </TableCell>
                        <Tooltip>
                            <TooltipTrigger render={<TableCell className='text-end' />}>
                                {data.totalSalary.toFixed(2)} zł
                            </TooltipTrigger>
                            <TooltipContent side='bottom' sideOffset={18}>
                                <p className='text-pretty'>
                                    {t('summary.earningsDisclaimer.hours')}
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className='md:hidden w-full flex justify-between items-center'>
                <Return to='/app' viewTransition />
                <DisclaimerDrawer />
            </div>
        </div>
    )
}
