import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Drawer from '../drawer'

export const DisclaimerDrawer = () => {
    const { t } = useTranslation()

    return (
        <Drawer.Nested
            trigger={
                <Button variant='ghost' size='sm' className='text-muted-foreground'>
                    {t('summary.earningsDisclaimer.explanation')}
                </Button>
            }
        >
            <Drawer.Wrapper className='gap-y-2'>
                <Drawer.Title>{t('summary.earningsDisclaimer.label')}</Drawer.Title>
                <Drawer.Description>{t('summary.earningsDisclaimer.hours')}</Drawer.Description>
            </Drawer.Wrapper>
        </Drawer.Nested>
    )
}
