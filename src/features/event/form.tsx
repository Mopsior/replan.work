import { useForm } from '@tanstack/react-form'
import { Building, House, Laptop, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { EventType } from '@/types/enums'
import { FormRequired } from '../form-required'
import { DatePicker } from '../inputs/date-picker'
import { RadioGroup } from '../inputs/radio-group'
import TimePicker from '../inputs/time-picker'
import { RadioGroupVariant, TimePickerType, TimePickerVariant } from '../inputs/types'
import { EventDateType, formSchema } from './types'

// TODO
// - Add mobile time-picker
// - Make title as "Advanced" collapsed option
// + Maybe move useForm to separate file for better code cleanness (but remember about using this also for editing)

export const EventForm = () => {
    const { t } = useTranslation()
    const [timeVariant, setTimeVariant] = useState<EventDateType>(EventDateType.BLOCK)
    const firstStartTimeInput = useRef(null)
    const secondStartTimeInput = useRef(null)
    const firstEndTimeInput = useRef(null)
    const secondEndTimeInput = useRef(null)
    const firstTotalTimeInput = useRef(null)
    const secondTotalTimeInput = useRef(null)
    const today = new Date()

    const form = useForm({
        defaultValues: {
            date: new Date(),
            startTimeHours: today.getHours().toString().padStart(2, '0'),
            startTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
            endTimeHours: (today.getHours() + 1).toString().padStart(2, '0'),
            endTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
            totalTimeHours: '08',
            totalTimeMinutes: '00',
            eventType: EventType.STATIONARY,
            title: '',
        } as z.infer<typeof formSchema>,
        validators: {
            onSubmit: formSchema,
            onBlur: formSchema,
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            console.log(value)
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className='flex flex-col w-full h-full justify-between space-y-4'
        >
            <FieldGroup className='gap-y-6'>
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
                                    <DatePicker
                                        id={field.name}
                                        date={field.state.value}
                                        setDate={field.handleChange}
                                        isInvalid={isInvalid}
                                        errors={field.state.meta.errors}
                                    />
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
                                        <form.Field
                                            name='startTimeHours'
                                            children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched &&
                                                    !field.state.meta.isValid
                                                return (
                                                    <TimePicker.Input
                                                        name={field.name}
                                                        isInvalid={isInvalid}
                                                        value={field.state.value}
                                                        handleChange={field.handleChange}
                                                        handleBlur={field.handleBlur}
                                                        ref={firstStartTimeInput}
                                                        secondRef={secondStartTimeInput}
                                                        type={TimePickerType.HOURS}
                                                    />
                                                )
                                            }}
                                        />
                                        <TimePicker.Divider />
                                        <form.Field
                                            name='startTimeMinutes'
                                            children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched &&
                                                    !field.state.meta.isValid

                                                return (
                                                    <TimePicker.Input
                                                        name={field.name}
                                                        isInvalid={isInvalid}
                                                        value={field.state.value}
                                                        handleChange={field.handleChange}
                                                        handleBlur={field.handleBlur}
                                                        ref={secondStartTimeInput}
                                                        firstRef={firstStartTimeInput}
                                                        secondRef={firstEndTimeInput}
                                                        type={TimePickerType.MINUTES}
                                                    />
                                                )
                                            }}
                                        />
                                    </TimePicker>
                                    <span className='text-muted-foreground not-md:hidden'>
                                        {t('calendar.event.create.form.time.to')}
                                    </span>
                                    <TimePicker>
                                        <form.Field
                                            name='endTimeHours'
                                            children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched &&
                                                    !field.state.meta.isValid
                                                return (
                                                    <TimePicker.Input
                                                        name={field.name}
                                                        isInvalid={isInvalid}
                                                        value={field.state.value}
                                                        handleChange={field.handleChange}
                                                        handleBlur={field.handleBlur}
                                                        ref={firstEndTimeInput}
                                                        firstRef={secondStartTimeInput}
                                                        secondRef={secondEndTimeInput}
                                                        type={TimePickerType.HOURS}
                                                    />
                                                )
                                            }}
                                        />
                                        <TimePicker.Divider />
                                        <form.Field
                                            name='endTimeMinutes'
                                            children={(field) => {
                                                const isInvalid =
                                                    field.state.meta.isTouched &&
                                                    !field.state.meta.isValid
                                                return (
                                                    <TimePicker.Input
                                                        name={field.name}
                                                        isInvalid={isInvalid}
                                                        value={field.state.value}
                                                        handleChange={field.handleChange}
                                                        handleBlur={field.handleBlur}
                                                        ref={secondEndTimeInput}
                                                        firstRef={firstEndTimeInput}
                                                        type={TimePickerType.MINUTES}
                                                    />
                                                )
                                            }}
                                        />
                                    </TimePicker>
                                </>
                            )}
                            {timeVariant === EventDateType.TIME && (
                                <TimePicker variant={TimePickerVariant.WIDE}>
                                    <form.Field
                                        name='totalTimeHours'
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched &&
                                                !field.state.meta.isValid
                                            return (
                                                <TimePicker.Input
                                                    name={field.name}
                                                    isInvalid={isInvalid}
                                                    value={field.state.value}
                                                    handleChange={field.handleChange}
                                                    handleBlur={field.handleBlur}
                                                    ref={firstTotalTimeInput}
                                                    secondRef={secondTotalTimeInput}
                                                    type={TimePickerType.HOURS}
                                                    variant={TimePickerVariant.WIDE}
                                                />
                                            )
                                        }}
                                    />
                                    <TimePicker.Divider />
                                    <form.Field
                                        name='totalTimeMinutes'
                                        children={(field) => {
                                            const isInvalid =
                                                field.state.meta.isTouched &&
                                                !field.state.meta.isValid

                                            return (
                                                <TimePicker.Input
                                                    name={field.name}
                                                    isInvalid={isInvalid}
                                                    value={field.state.value}
                                                    handleChange={field.handleChange}
                                                    handleBlur={field.handleBlur}
                                                    ref={secondTotalTimeInput}
                                                    firstRef={firstTotalTimeInput}
                                                    type={TimePickerType.MINUTES}
                                                    variant={TimePickerVariant.WIDE}
                                                />
                                            )
                                        }}
                                    />
                                    <TimePicker.HoursAddon
                                        hours={parseInt(
                                            form.state.values.totalTimeHours ?? '0',
                                            10,
                                        )}
                                    />
                                </TimePicker>
                            )}
                        </div>
                    </div>
                    <RadioGroup
                        variant={RadioGroupVariant.SMALL}
                        value={timeVariant}
                        onValueChange={(value) => setTimeVariant(value as EventDateType)}
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
                </Field>
                <form.Field
                    name='eventType'
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t('calendar.event.create.form.eventType.label')}
                                    <FormRequired />
                                </FieldLabel>
                                <RadioGroup
                                    variant={RadioGroupVariant.DYNAMIC}
                                    value={field.state.value}
                                    onValueChange={(value) =>
                                        field.handleChange(value as EventType)
                                    }
                                    className='gap-y-2'
                                    items={[
                                        {
                                            value: EventType.STATIONARY,
                                            title: t(
                                                'calendar.event.create.form.eventType.stationary',
                                            ),
                                            icon: <Building size={16} />,
                                        },
                                        {
                                            value: EventType.REMOTE,
                                            title: t('calendar.event.create.form.eventType.remote'),
                                            icon: <House size={16} />,
                                        },
                                        {
                                            value: EventType.HYBRID,
                                            title: t('calendar.event.create.form.eventType.hybrid'),
                                            icon: <Laptop size={16} />,
                                        },
                                    ]}
                                />
                            </Field>
                        )
                    }}
                />
            </FieldGroup>
            <Button type='submit'>
                <Plus size={16} />
                {t('calendar.event.create.button')}
            </Button>
        </form>
    )
}
