import { ChangeEvent, useCallback, useEffect } from 'react'
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

    const handleInputBlur = () => {
        if (value && value.length === 1) {
            handleChange(value.padStart(2, '0'))
        }
        handleBlur()
    }

    const handleKeyUp = useCallback(
        (e: KeyboardEvent) => {
            if (typeof props.ref === 'function' || !props.ref?.current) return
            if (e.target !== props.ref.current) return

            const key = e.key.toLowerCase()
            const currentValue = props.ref.current.value

            const isModifierKey = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey
            const isModifierKeyName = ['control', 'alt', 'meta', 'shift', 'tab'].includes(key)
            if (isModifierKey || isModifierKeyName) return

            if ((key === 'backspace' || key === 'delete') && currentValue.length === 0) {
                firstRef?.current?.focus()
                return
            }

            if (key === 'arrowleft' && firstRef?.current && currentValue.length === 0) {
                firstRef.current.focus()
                firstRef.current.select()
                return
            }

            if (key === 'arrowright' && secondRef?.current && currentValue.length === 2) {
                secondRef.current.focus()
                secondRef.current.select()
                return
            }

            if (key.startsWith('arrow')) return

            if (!(currentValue.length === 2 && secondRef?.current)) return

            secondRef.current.focus()
            secondRef.current.select()
        },
        [props.ref, firstRef, secondRef],
    )

    useEffect(() => {
        if (typeof props.ref === 'function' || !props.ref?.current) return

        const refCurrent = props.ref.current
        refCurrent.addEventListener('keyup', handleKeyUp)

        return () => {
            refCurrent.removeEventListener('keyup', handleKeyUp)
        }
    }, [props.ref, handleKeyUp])

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
            onBlur={handleInputBlur}
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
