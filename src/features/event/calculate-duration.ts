import { useCallback, useEffect, useRef, useState } from 'react'
import z from 'zod'
import { formatTime } from '../calendar/format-time'
import { EventDateType, formSchema } from './types'

export const useCalculateDuration = (
    form: {
        state: { values: z.infer<typeof formSchema> }
        store: { subscribe: (cb: () => void) => () => void }
    },
    timeVariant: EventDateType,
) => {
    const [totalTime, setTotalTime] = useState('')
    const prevValuesRef = useRef<{
        startTimeHours?: string
        startTimeMinutes?: string
        endTimeHours?: string
        endTimeMinutes?: string
        totalTimeHours?: string
        totalTimeMinutes?: string
    }>({})

    const calculateDuration = useCallback(() => {
        const values = form.state.values

        const relevantFields =
            timeVariant === EventDateType.BLOCK
                ? {
                      startTimeHours: values.startTimeHours,
                      startTimeMinutes: values.startTimeMinutes,
                      endTimeHours: values.endTimeHours,
                      endTimeMinutes: values.endTimeMinutes,
                  }
                : {
                      totalTimeHours: values.totalTimeHours,
                      totalTimeMinutes: values.totalTimeMinutes,
                  }

        const hasChanged = Object.entries(relevantFields).some(
            ([key, value]) =>
                prevValuesRef.current[key as keyof typeof prevValuesRef.current] !== value,
        )

        if (!hasChanged && Object.keys(prevValuesRef.current).length > 0) return

        prevValuesRef.current = relevantFields

        if (timeVariant === EventDateType.BLOCK) {
            const startHours = parseInt(values.startTimeHours || '0', 10)
            const startMinutes = parseInt(values.startTimeMinutes || '0', 10)
            const endHours = parseInt(values.endTimeHours || '0', 10)
            const endMinutes = parseInt(values.endTimeMinutes || '0', 10)

            const startMs = startHours * 3600000 + startMinutes * 60000
            const endMs = endHours * 3600000 + endMinutes * 60000
            const diffMs = endMs - startMs

            setTotalTime(diffMs > 0 ? formatTime(diffMs) : '')
        } else if (timeVariant === EventDateType.TIME) {
            const hours = parseInt(values.totalTimeHours || '0', 10)
            const minutes = parseInt(values.totalTimeMinutes || '0', 10)

            const totalMs = hours * 3600000 + minutes * 60000

            setTotalTime(totalMs > 0 ? formatTime(totalMs) : '')
        }
    }, [form, timeVariant])

    useEffect(() => {
        prevValuesRef.current = {}
        calculateDuration()
        const unsubscribe = form.store.subscribe(calculateDuration)

        return () => unsubscribe()
    }, [form, calculateDuration])

    return totalTime
}
