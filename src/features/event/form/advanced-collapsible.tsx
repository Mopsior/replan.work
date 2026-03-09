import { ChevronDown, ChevronUp } from 'lucide-react'
import { ReactNode, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

export const AdvancedCollapsible = ({ children }: { children: ReactNode }) => {
    const { t } = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Collapsible
            className='space-y-2'
            open={isExpanded}
            onOpenChange={(open) => setIsExpanded(open)}
        >
            <CollapsibleTrigger className='text-sm text-muted-foreground hover:bg-muted rounded-md py-1 mx-auto px-2 cursor-pointer flex justify-center items-center gap-x-2 transition-colors'>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {t('advanced')}
            </CollapsibleTrigger>
            <CollapsibleContent>{children}</CollapsibleContent>
        </Collapsible>
    )
}
