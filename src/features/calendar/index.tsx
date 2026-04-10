import { DesktopCalendar } from './desktop'
import { MobileCalendar } from './mobile'
import { MonthPicker } from './month-picker'

export const Calendar = () => {
    return (
        <div className='flex h-dvh w-full flex-col items-center gap-4 pt-8 md:p-8 md:pb-16'>
            <MonthPicker />
            <MobileCalendar />
            <DesktopCalendar />
        </div>
    )
}
