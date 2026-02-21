import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { IS_MOBILE } from '@/types/constants'
import { useMediaQuery } from '@/utils/use-media-query'
import Drawer from '../drawer'
import { EventForm } from './form'

export const CreateEvent = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useMediaQuery(IS_MOBILE)

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <Button
                    className='md:absolute md:bottom-8 md:right-8'
                    variant={isMobile ? 'secondary' : 'default'}
                >
                    <Plus size={16} />
                    <span className='hidden md:block'>{t('calendar.event.create.button')}</span>
                </Button>
            }
        >
            <Drawer.Title withCenter>{t('calendar.event.create.label')}</Drawer.Title>
            <Drawer.Description>{t('calendar.event.create.description')}</Drawer.Description>
            <EventForm />
        </Drawer.Dynamic>
    )
}
