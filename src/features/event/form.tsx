import { useForm } from '@tanstack/react-form'
import { Plus } from 'lucide-react'
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
import { TimePickerType } from '../inputs/types'
import { EventDateType, formSchema } from './types'

// TODO
// - Move calendar to Nested Drawer (here show only input from datePicker and predefined days like tommorow etc.) - try to avoid any popups or anythign like that, just use nested drawer
// - Create own 24h time picker based on text and regex
// + Maybe make custom <form.Field> with isInvalid and erors build in (to clean code)
// + Maybe move useForm to separate file for better code cleanness (but remember about using this also for editing)

export const EventForm = () => {
    const { t } = useTranslation()
    const [timeVariant, setTimeVariant] = useState<EventDateType>(EventDateType.BLOCK)
    const firstStartTimeInput = useRef(null)
    const secondStartTimeInput = useRef(null)
    const firstEndTimeInput = useRef(null)
    const secondEndTimeInput = useRef(null)
    const today = new Date()

    const form = useForm({
        defaultValues: {
            date: new Date(),
            startTimeHours: today.getHours().toString().padStart(2, '0'),
            startTimeMinutes: today.getMinutes().toString().padStart(2, '0'),
            endTimeHours: (today.getHours() + 1).toString().padStart(2, '0'),
            endTimeMinutes: today.getHours().toString().padStart(2, '0'),
            totalTime: '',
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
                <div className='space-y-3'>
                    <form.Field
                        name='date'
                        children={(field) => {
                            const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                            return (
                                <Field data-invalid={isInvalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        {t('calendar.event.create.form.date.label')}
                                        <FormRequired />
                                    </FieldLabel>
                                    <DatePicker
                                        id={field.name}
                                        date={field.state.value}
                                        setDate={field.handleChange}
                                        isInvalid={isInvalid}
                                        errors={field.state.meta.errors}
                                    />
                                </Field>
                            )
                        }}
                    />
                    <RadioGroup
                        value={timeVariant}
                        onValueChange={(value) => setTimeVariant(value as EventDateType)}
                        coloredTitle
                        items={[
                            {
                                value: EventDateType.BLOCK,
                                title: t('calendar.event.create.form.type.block.label'),
                                description: t('calendar.event.create.form.type.block.description'),
                            },
                            {
                                value: EventDateType.TIME,
                                title: t('calendar.event.create.form.type.hours.label'),
                                description: t('calendar.event.create.form.type.hours.description'),
                            },
                        ]}
                    />
                    {timeVariant === EventDateType.BLOCK && (
                        <Field>
                            <FieldLabel>
                                {t('calendar.event.create.form.time.label')}
                                <FormRequired />
                            </FieldLabel>
                            <div className='flex gap-x-4 items-center'>
                                <span className='text-muted-foreground'>
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

                                            console.log(field.state.value)
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
                                <span className='text-muted-foreground'>
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
                            </div>
                        </Field>
                    )}
                </div>
            </FieldGroup>
            <Button type='submit'>
                <Plus size={16} />
                {t('calendar.event.create.button')}
            </Button>
        </form>
    )
}
