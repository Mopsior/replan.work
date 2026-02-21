import { ChangeEvent, useEffect } from 'react'
import { InputGroup, InputGroupInput, InputGroupText } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'
import { TimePickerInputProps, TimePickerType } from './types'

const TimePicker = ({ children }: { children: React.ReactNode }) => {
    return <InputGroup className='max-w-24'>{children}</InputGroup>
}

const TimePickerInput = ({
    name,
    isInvalid,
    value,
    handleChange,
    handleBlur,
    type = TimePickerType.HOURS,
    className,
    firstRef,
    secondRef,
    ...props
}: TimePickerInputProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const sanitizedValue = e.target.value.replace(/[^0-9]/g, '')
        const maxValue = type === TimePickerType.HOURS ? 23 : 59
        const numValue = parseInt(sanitizedValue, 10)

        if (sanitizedValue.length === 0 || numValue <= maxValue) {
            handleChange(sanitizedValue)
        }
    }

    useEffect(() => {
        if (!(typeof props.ref !== 'function' && props.ref?.current)) return

        const handleKeyUp = (e: KeyboardEvent) => {
            if (typeof props.ref === 'function') return
            const key = e.key.toLowerCase()
            console.log(key, e.ctrlKey, e.altKey, e.metaKey)
            if (
                e.ctrlKey ||
                e.altKey ||
                e.metaKey ||
                e.shiftKey ||
                key === 'control' ||
                key === 'alt' ||
                key === 'meta' ||
                key === 'shift' ||
                key === 'tab'
            )
                return

            if (key === 'backspace' || key === 'delete') {
                if (props.ref?.current?.value.length !== 0) return
                if (!firstRef?.current) return
                return firstRef.current.focus()
            }

            if (key === 'arrowright') {
                if (!secondRef?.current) return
                secondRef?.current?.focus()
                return secondRef?.current?.select()
            }

            if (key.startsWith('arrow')) return

            if (props.ref?.current?.value.length !== 2) return
            if (!secondRef?.current) return

            secondRef?.current?.focus()
            secondRef?.current?.select()
        }

        const refCurrent = props.ref.current
        refCurrent.addEventListener('keyup', (e: KeyboardEvent) => handleKeyUp(e))

        return () => refCurrent?.removeEventListener('keyup', (e: KeyboardEvent) => handleKeyUp(e))
    }, [props.ref, secondRef])

    return (
        <InputGroupInput
            name={name}
            data-invalid={isInvalid}
            type='text'
            inputMode='numeric'
            pattern='[0-9]*'
            placeholder={type === TimePickerType.HOURS ? '12' : '23'}
            minLength={1}
            maxLength={2}
            min={0}
            max={type === TimePickerType.HOURS ? 23 : 59}
            value={value}
            onChange={(e) => handleInputChange(e)}
            onBlur={handleBlur}
            className={cn(['text-center', className])}
            autoComplete='off'
            {...props}
        />
    )
}

const TimePickerDivider = () => <InputGroupText>:</InputGroupText>

TimePicker.Input = TimePickerInput
TimePicker.Divider = TimePickerDivider
export default TimePicker
