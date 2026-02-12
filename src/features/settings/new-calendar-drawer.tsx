import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FormVariant } from '@/types/enums'
import Drawer from '../drawer'
import { CalendarForm } from './calendar-form'

export const NewCalendarDrawer = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <Button>
                    <Plus size={16} />
                    {t('appSettings.calendars.add')}
                </Button>
            }
        >
            <div className='flex w-full h-full flex-col gap-y-4 px-4 not-md:pb-4'>
                <Drawer.Title className='md:text-center'>
                    {t('appSettings.calendars.create.label')}
                </Drawer.Title>
                <Drawer.Description>{t('appSettings.calendars.description')}</Drawer.Description>
                <CalendarForm setIsOpen={setIsOpen} variant={FormVariant.CREATE} />
            </div>
        </Drawer.Dynamic>
    )
}
