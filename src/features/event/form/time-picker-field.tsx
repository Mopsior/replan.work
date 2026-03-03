import TimePicker from '@/features/inputs/time-picker'
import { FormValues } from '../types'
import { useFieldContext } from './hook'
import { TimePickerFieldProps } from './types'

export const TimePickerField = ({
    ref,
    firstRef,
    secondRef,
    type,
    variant,
}: TimePickerFieldProps) => {
    const field = useFieldContext<
        | FormValues['startTimeHours']
        | FormValues['startTimeMinutes']
        | FormValues['endTimeHours']
        | FormValues['endTimeMinutes']
        | FormValues['totalTimeHours']
        | FormValues['totalTimeMinutes']
    >()
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

    return (
        <TimePicker.Input
            name={field.name}
            isInvalid={isInvalid}
            value={field.state.value}
            handleChange={field.handleChange}
            handleBlur={field.handleBlur}
            ref={ref}
            firstRef={firstRef}
            secondRef={secondRef}
            type={type}
            variant={variant}
        />
    )
}
