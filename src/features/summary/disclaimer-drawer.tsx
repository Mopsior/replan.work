import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import Drawer from '../drawer'

export const DisclaimerDrawer = () => {
    const { t } = useTranslation()

    return (
        <Drawer>
            <Drawer.Trigger
                render={<Button variant='ghost' size='sm' className='text-muted-foreground' />}
            >
                {t('summary.earningsDisclaimer.explanation')}
            </Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Container>
                    <Drawer.Header>
                        <Drawer.Title>{t('summary.earningsDisclaimer.label')}</Drawer.Title>
                        <Drawer.Description>
                            {t('summary.earningsDisclaimer.hours')}
                        </Drawer.Description>
                    </Drawer.Header>
                </Drawer.Container>
            </Drawer.Content>
        </Drawer>
    )
}
