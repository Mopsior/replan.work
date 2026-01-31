import { ChevronLeft, ChevronRight } from 'lucide-react'
import { t } from 'i18next'
import { useMemo } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { H2 } from '../typography'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { Route } from '@/routes/app/route'
import { useKeyPress } from '@/hooks/use-key-press'

const monthsItems = {
    1: t('calendar.months.1'),
    2: t('calendar.months.2'),
    3: t('calendar.months.3'),
    4: t('calendar.months.4'),
    5: t('calendar.months.5'),
    6: t('calendar.months.6'),
    7: t('calendar.months.7'),
    8: t('calendar.months.8'),
    9: t('calendar.months.9'),
    10: t('calendar.months.10'),
    11: t('calendar.months.11'),
    12: t('calendar.months.12'),
}

export const MonthPicker = () => {
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const navigate = useNavigate()

    const yearsItems = useMemo(() => {
        const years = []
        for (let i = year; i <= year + 4; i++) {
            years.push(i)
        }
        return years
    }, [year])

    const handleNextMonth = () => {
        const newMonth = month + 1 > 12 ? 1 : month + 1
        const newYear = month + 1 > 12 ? year + 1 : year
        navigate({ to: '.', search: { month: newMonth, year: newYear } })
    }

    const handlePrevMonth = () => {
        const newMonth = month - 1 < 1 ? 12 : month - 1
        const newYear = month - 1 < 1 ? year - 1 : year
        navigate({ to: '.', search: { month: newMonth, year: newYear } })
    }

    useKeyPress('ArrowRight', handleNextMonth)
    useKeyPress('ArrowLeft', handlePrevMonth)

    return (
        <div className='flex gap-x-4'>
            <Button variant='ghost' onClick={handlePrevMonth}>
                <ChevronLeft size={16} className='size-4' />
            </Button>
            <Select
                onValueChange={(value) => navigate({ to: '.', search: { month: Number(value) } })}
                value={month}
            >
                <SelectTrigger withInputStyles={false}>
                    <H2 className='cursor-pointer underline-offset-4 hover:underline'>
                        {monthsItems[month as keyof typeof monthsItems]}
                    </H2>
                </SelectTrigger>
                <SelectContent
                    alignItemWithTrigger={false}
                    side='bottom'
                    sideOffset={16}
                    alignOffset={12}
                >
                    {Object.entries(monthsItems).map(([key, value]) => (
                        <SelectItem key={`month-picker-item-${key}`} value={key}>
                            {value}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select
                onValueChange={(value) => navigate({ to: '.', search: { year: Number(value) } })}
                value={year}
            >
                <SelectTrigger withInputStyles={false}>
                    <H2 className='text-muted-foreground cursor-pointer underline-offset-4 hover:underline'>
                        {year}
                    </H2>
                </SelectTrigger>
                <SelectContent
                    alignItemWithTrigger={false}
                    side='bottom'
                    sideOffset={16}
                    alignOffset={12}
                >
                    {yearsItems.map((year) => (
                        <SelectItem key={`year-picker-item-${year}`} value={year}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant='ghost' onClick={handleNextMonth}>
                <ChevronRight size={16} className='size-4' />
            </Button>
        </div>
    )
}
