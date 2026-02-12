import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormVariant } from '@/types/enums'
import Drawer from '../drawer'
import { CalendarForm } from '../settings/calendar-form'
import { ListItemProps } from './types'

export const ListItem = ({ name, color, salary, id }: ListItemProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <div className='border-border hover:bg-secondary/20 flex w-full items-center gap-x-2 rounded-md border px-4 py-2 transition-colors cursor-pointer'>
                    <div className='size-3 rounded-full' style={{ backgroundColor: `#${color}` }} />
                    {name}
                </div>
            }
        >
            <div className='flex w-full h-full flex-col gap-y-4 px-4 not-md:pb-4'>
                <Drawer.Title className='md:text-center'>
                    {t('appSettings.calendars.edit.label')}
                </Drawer.Title>
                <Drawer.Description>{t('appSettings.calendars.description')}</Drawer.Description>
                <CalendarForm
                    setIsOpen={setIsOpen}
                    variant={FormVariant.EDIT}
                    defaultValues={{
                        name,
                        color,
                        salary,
                    }}
                    id={id}
                />
            </div>
        </Drawer.Dynamic>
    )
}
