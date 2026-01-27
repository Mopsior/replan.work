import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/summary/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            {/* <Drawer.Title>{t('summaryDrawer')}</Drawer.Title>
            <div className='p-4'>{t('summaryDrawerContent')}</div> */}
        </>
    )
}
