import { t } from 'i18next'
import { Backpack, Building, House, Laptop } from 'lucide-react'
import type { ReactNode } from 'react'
import { EventType } from '@/types/enums'

export const variantTranslation: Record<EventType, string> = {
    [EventType.STATIONARY]: t('calendar.event.variant.stationary'),
    [EventType.REMOTE]: t('calendar.event.variant.remote'),
    [EventType.HYBRID]: t('calendar.event.variant.hybrid'),
    [EventType.CUSTOM]: t('calendar.event.variant.custom'),
}

const iconProps = {
    className: 'size-3 text-muted-foreground',
    size: 12,
}

export const variantIcon: Record<EventType, ReactNode> = {
    [EventType.STATIONARY]: <Building {...iconProps} />,
    [EventType.REMOTE]: <House {...iconProps} />,
    [EventType.HYBRID]: <Laptop {...iconProps} />,
    [EventType.CUSTOM]: <Backpack {...iconProps} />,
}
