import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { FormVariant } from '@/types/enums'
import Drawer from '../drawer'
import { CalendarForm } from './form'

export const CreateCalendarDrawer = () => {
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
            <Drawer.Title withCenter>{t('appSettings.calendars.create.label')}</Drawer.Title>
            <Drawer.Description>{t('appSettings.calendars.description')}</Drawer.Description>
            <CalendarForm setIsOpen={setIsOpen} variant={FormVariant.CREATE} />
        </Drawer.Dynamic>
    )
}
