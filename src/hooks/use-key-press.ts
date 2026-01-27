import { useCallback, useEffect } from 'react'

export const useKeyPress = (targetKey: string, callback: (event: KeyboardEvent) => void) => {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === targetKey) {
                callback(event)
            }
        },
        [targetKey, callback],
    )

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])
}
