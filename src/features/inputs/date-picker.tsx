import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FieldError } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { IS_DESKTOP } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import Drawer from '../drawer'
import { DatePickerProps, I18N_TO_LOCALE } from './types'

export const DatePicker = ({ date, setDate, id, isInvalid, errors }: DatePickerProps) => {
    const { t, i18n } = useTranslation()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const isDesktop = useMediaQuery(IS_DESKTOP)

    const { format } = new Intl.DateTimeFormat(i18n.language, {
        dateStyle: 'long',
    })

    const handleSelect = (value: Date) => {
        setDate(value)
        if (isDesktop && !isInvalid) return setIsOpen(false)
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger
                render={
                    <Button
                        variant='outline'
                        className={cn('w-full', isInvalid && 'border-red-500!')}
                    />
                }
            >
                <CalendarIcon className='text-muted-foreground' />
                {date ? format(date) : <span>{t('input.datePicker.placeholder')}</span>}
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Container>
                    <Drawer.Header>
                        <Drawer.Title>{t('input.datePicker.label')}</Drawer.Title>
                        <Drawer.Description>
                            {date
                                ? t('input.datePicker.description', { date: format(date) })
                                : t('input.datePicker.notSelected')}
                        </Drawer.Description>
                    </Drawer.Header>
                    <Calendar
                        mode='single'
                        selected={date}
                        onSelect={(value) => handleSelect(value)}
                        id={id}
                        required
                        weekStartsOn={1}
                        locale={I18N_TO_LOCALE[i18n.language]}
                        className='rounded-md bg-transparent border w-full mt-2'
                    />
                    {isInvalid && <FieldError className='text-center' errors={errors} />}
                </Drawer.Container>
            </Drawer.Content>
        </Drawer>
    )
}
