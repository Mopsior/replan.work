import { Toaster } from '@/components/ui/sonner'
import { useTheme } from './theme-provider'

export const ToasterWrapper = () => {
    const { userTheme } = useTheme()
    return <Toaster theme={userTheme} position='bottom-right' />
}
