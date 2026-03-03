import { useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { FormRequired } from '@/features/form-required'
import { DatePicker } from '@/features/inputs/date-picker'
import { RadioGroup } from '@/features/inputs/radio-group'
import TimePicker from '@/features/inputs/time-picker'
import { RadioGroupVariant, TimePickerType, TimePickerVariant } from '@/features/inputs/types'
import { defaultFormValues, EventDateType } from '../types'
import { withForm } from './hook'

export const DateField = withForm({
    defaultValues: defaultFormValues(),
    render: ({ form }) => {
        const { t } = useTranslation()
        const [timeVariant, setTimeVariant] = useState<EventDateType>(EventDateType.BLOCK)
        const today = new Date()

        const firstStartTimeInput = useRef(null)
        const secondStartTimeInput = useRef(null)
        const firstEndTimeInput = useRef(null)
        const secondEndTimeInput = useRef(null)
        const firstTotalTimeInput = useRef(null)
        const secondTotalTimeInput = useRef(null)

        const timeErrors = useMemo(() => {
            const timeFields = [
                'startTimeHours',
                'startTimeMinutes',
                'endTimeHours',
                'endTimeMinutes',
                'totalTimeHours',
                'totalTimeMinutes',
            ] as const

            return timeFields.flatMap((field) => {
                const meta = form.state.fieldMeta[field]
                return meta?.isTouched ? (meta.errors ?? []) : []
            })
        }, [form.state.fieldMeta])

        const handleTimeVariantChange = (variant: EventDateType) => {
            const fieldUpdates =
                variant === EventDateType.BLOCK
                    ? {
                          totalTimeHours: undefined,
                          totalTimeMinutes: undefined,
                          startTimeHours: today.getHours().toString().padStart(2, '0'),
                          startTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
                          endTimeHours: (today.getHours() + 1).toString().padStart(2, '0'),
                          endTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
                      }
                    : {
                          startTimeHours: undefined,
                          startTimeMinutes: undefined,
                          endTimeHours: undefined,
                          endTimeMinutes: undefined,
                          totalTimeHours: '8',
                          totalTimeMinutes: '00',
                      }

            Object.entries(fieldUpdates).forEach(([field, value]) => {
                form.setFieldValue(field as keyof typeof fieldUpdates, value)
            })

            setTimeVariant(variant)
        }

        return (
            <Field>
                <FieldLabel>
                    {t('calendar.event.create.form.date.label')}
                    <FormRequired />
                </FieldLabel>
                <div className='not-md:grid not-md:grid-cols-2 not-md:gap-x-2 justify-between items-center'>
                    <form.Field
                        name='date'
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <>
                                    <DatePicker
                                        id={field.name}
                                        date={field.state.value}
                                        setDate={field.handleChange}
                                        isInvalid={isInvalid}
                                        errors={field.state.meta.errors}
                                    />
                                    {isInvalid && (
                                        <FieldError
                                            className='mt-1'
                                            errors={field.state.meta.errors}
                                        />
                                    )}
                                </>
                            )
                        }}
                    />
                    <div className='flex w-full gap-x-2 md:gap-x-4 items-center justify-between md:justify-center md:pt-3'>
                        {timeVariant === EventDateType.BLOCK && (
                            <>
                                <span className='text-muted-foreground not-md:hidden'>
                                    {t('calendar.event.create.form.time.from')}
                                </span>
                                <TimePicker>
                                    <form.AppField
                                        name='startTimeHours'
                                        children={(field) => (
                                            <field.TimePickerField
                                                ref={firstStartTimeInput}
                                                secondRef={secondStartTimeInput}
                                                type={TimePickerType.HOURS}
                                            />
                                        )}
                                    />
                                    <TimePicker.Divider />
                                    <form.AppField
                                        name='startTimeMinutes'
                                        children={(field) => (
                                            <field.TimePickerField
                                                ref={secondStartTimeInput}
                                                firstRef={firstStartTimeInput}
                                                secondRef={firstEndTimeInput}
                                                type={TimePickerType.MINUTES}
                                            />
                                        )}
                                    />
                                </TimePicker>
                                <span className='text-muted-foreground not-md:hidden'>
                                    {t('calendar.event.create.form.time.to')}
                                </span>
                                <TimePicker>
                                    <form.AppField
                                        name='endTimeHours'
                                        children={(field) => (
                                            <field.TimePickerField
                                                ref={firstEndTimeInput}
                                                firstRef={secondStartTimeInput}
                                                secondRef={secondEndTimeInput}
                                                type={TimePickerType.HOURS}
                                            />
                                        )}
                                    />
                                    <TimePicker.Divider />
                                    <form.AppField
                                        name='endTimeMinutes'
                                        children={(field) => (
                                            <field.TimePickerField
                                                ref={secondEndTimeInput}
                                                firstRef={firstEndTimeInput}
                                                type={TimePickerType.MINUTES}
                                            />
                                        )}
                                    />
                                </TimePicker>
                            </>
                        )}
                        {timeVariant === EventDateType.TIME && (
                            <TimePicker variant={TimePickerVariant.WIDE}>
                                <form.AppField
                                    name='totalTimeHours'
                                    children={(field) => (
                                        <field.TimePickerField
                                            ref={firstTotalTimeInput}
                                            secondRef={secondTotalTimeInput}
                                            type={TimePickerType.HOURS}
                                            variant={TimePickerVariant.WIDE}
                                        />
                                    )}
                                />
                                <TimePicker.Divider />
                                <form.AppField
                                    name='totalTimeMinutes'
                                    children={(field) => (
                                        <field.TimePickerField
                                            ref={secondTotalTimeInput}
                                            firstRef={firstTotalTimeInput}
                                            type={TimePickerType.MINUTES}
                                            variant={TimePickerVariant.WIDE}
                                        />
                                    )}
                                />
                                <TimePicker.HoursAddon
                                    hours={parseInt(form.state.values.totalTimeHours ?? '0', 10)}
                                />
                            </TimePicker>
                        )}
                    </div>
                </div>
                <RadioGroup
                    variant={RadioGroupVariant.SMALL}
                    value={timeVariant}
                    onValueChange={(value) => handleTimeVariantChange(value as EventDateType)}
                    items={[
                        {
                            value: EventDateType.BLOCK,
                            title: t('calendar.event.create.form.type.block.label'),
                        },
                        {
                            value: EventDateType.TIME,
                            title: t('calendar.event.create.form.type.hours.label'),
                        },
                    ]}
                ></RadioGroup>
                {timeErrors.length > 0 && <FieldError errors={timeErrors} />}
            </Field>
        )
    },
})
