import { DesktopCalendar } from './desktop'
import { MobileCalendar } from './mobile'
import { MonthPicker } from './month-picker'
import { CalendarProps } from './types'

export const Calendar = ({ didInitialScroll, setDidInitialScroll }: CalendarProps) => {
    return (
        <div className='flex h-dvh w-full flex-col items-center gap-4 pt-8 md:px-8 md:pt-4 md:pb-16'>
            <MonthPicker />
            <MobileCalendar
                didInitialScroll={didInitialScroll}
                setDidInitialScroll={setDidInitialScroll}
            />
            <DesktopCalendar />
        </div>
    )
}
