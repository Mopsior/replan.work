import { useClerk, useUser } from '@clerk/tanstack-react-start'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item'
import { useDrawerControl } from '@/hooks/use-drawer-data'

export const AccountSettings = () => {
    const { t } = useTranslation()
    const { user } = useUser()
    const { openUserProfile } = useClerk()
    const { closeDrawer } = useDrawerControl()

    const handleOpenUserProfile = () => {
        openUserProfile()
        closeDrawer()
    }

    return (
        <div className='flex h-fit w-full flex-col gap-y-2 md:hidden'>
            <p className='text-muted-foreground text-sm'>{t('appSettings.account.label')}</p>
            <Item variant='outline'>
                <ItemMedia>
                    <Avatar>
                        <AvatarImage src={user?.imageUrl} />
                        <AvatarFallback>
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                        </AvatarFallback>
                    </Avatar>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>
                        {user?.username
                            ? user?.username
                            : user?.primaryEmailAddress
                              ? user?.primaryEmailAddress.emailAddress
                              : t('appSettings.account.item.title')}
                    </ItemTitle>
                    <ItemDescription>{t('appSettings.account.item.description')}</ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button size='sm' variant='secondary' onClick={handleOpenUserProfile}>
                        {t('go')}
                        <ArrowRight />
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )
}
