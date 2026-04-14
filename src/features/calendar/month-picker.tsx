import { useNavigate, useSearch } from '@tanstack/react-router'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useKeyPress } from '@/hooks/use-key-press'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/app/route'
import { H2 } from '../typography'
import { getMonthName } from './get-month-name'

export const MonthPicker = () => {
    const { month, year } = useSearch({
        from: Route.fullPath,
    })

    const navigate = useNavigate()

    const monthsItems = useMemo(() => {
        const months: Record<string, string> = {}
        for (let i = 1; i <= 12; i++) {
            months[i] = getMonthName(i)
        }
        return months
    }, [])

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
        <div
            className={cn([
                'flex gap-x-4',
                'not-md:before:absolute before:left-0 before:top-20 before:h-4 before:w-full before:bg-linear-to-b before:from-background before:via-background/90 before:to-transparent before:pointer-events-none before:content-[""]',
                'not-md:after:fixed after:left-0 after:bottom-0 after:h-8 after:w-full after:bg-linear-to-t after:from-background after:via-background/90 after:to-transparent after:pointer-events-none after:content-[""]',
            ])}
        >
            <Button variant='ghost' onClick={handlePrevMonth}>
                <ChevronLeft size={16} className='size-4' />
            </Button>
            <Select
                onValueChange={(value) => navigate({ to: '.', search: { month: Number(value) } })}
                value={month}
            >
                <SelectTrigger withInputStyles={false}>
                    <H2 className='cursor-pointer underline-offset-4 hover:underline'>
                        {getMonthName(month)}
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
