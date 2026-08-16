import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormVariant } from '@/types/enums'
import Drawer from '../drawer'
import { CalendarForm } from './form'

export const CreateCalendarDrawer = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <Drawer.Trigger>
                <Plus size={16} />
                {t('appSettings.calendars.add')}
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Container>
                    <Drawer.Header>
                        <Drawer.Title>{t('appSettings.calendars.create.label')}</Drawer.Title>
                        <Drawer.Description>
                            {t('appSettings.calendars.description')}
                        </Drawer.Description>
                    </Drawer.Header>
                    <CalendarForm setIsOpen={setIsOpen} variant={FormVariant.CREATE} />
                </Drawer.Container>
            </Drawer.Content>
        </Drawer>
    )
}
