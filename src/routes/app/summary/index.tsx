import { createFileRoute } from '@tanstack/react-router'
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
import { useDrawerData } from '@/hooks/use-drawer-data'

export const Route = createFileRoute('/app/summary/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { t } = useTranslation()

    useDrawerData({
        title: t('summaryDrawer'),
        isTitleVisible: false,
        description: t('summary.description'),
        isDescriptionVisible: true,
    })

    return (
        <div className='flex w-full h-full gap-y-4 flex-col items-center'>
            <Table>
                <TableHeader>
                    <TableRow className='*:text-center *:tabular-nums *:text-sm'>
                        {/* <TableHead>{t('summary.table.week')}</TableHead> */}
                        <TableHead />
                        <TableHead>{t('summary.table.sumHours')}</TableHead>
                        <TableHead>{t('summary.table.weekendHours')}</TableHead>
                        <TableHead>{t('summary.table.earnings')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className='*:tabular-nums'>
                        <TableCell>1.</TableCell>
                        <TableCell>2 godz 35 min</TableCell>
                        <TableCell>8 godz</TableCell>
                        <TableCell className='text-end'>250,00 zł</TableCell>
                    </TableRow>
                    <TableRow className='*:tabular-nums'>
                        <TableCell>1.</TableCell>
                        <TableCell>2 godz 35 min</TableCell>
                        <TableCell>8 godz</TableCell>
                        <TableCell className='text-end'>250,00 zł</TableCell>
                    </TableRow>
                    <TableRow className='*:tabular-nums'>
                        <TableCell>1.</TableCell>
                        <TableCell>2 godz 35 min</TableCell>
                        <TableCell>8 godz</TableCell>
                        <TableCell className='text-end'>250,00 zł</TableCell>
                    </TableRow>
                    <TableRow className='*:tabular-nums'>
                        <TableCell>1.</TableCell>
                        <TableCell>2 godz 35 min</TableCell>
                        <TableCell>8 godz</TableCell>
                        <TableCell className='text-end'>250,00 zł</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className='*:tabular-nums'>
                        <TableCell />
                        <TableCell>10 godz 35 min</TableCell>
                        <TableCell>40 godz</TableCell>
                        <TableCell className='text-end'>1000,00 zł</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
