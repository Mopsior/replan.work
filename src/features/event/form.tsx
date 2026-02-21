import { useForm } from '@tanstack/react-form'
import { Clock2Icon, Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { EventType } from '@/types/enums'
import { FormRequired } from '../form-required'
import { DatePicker } from '../inputs/date-picker'
import { RadioGroup } from '../inputs/radio-group'
import { EventDateType, formSchema } from './types'

// TODO
// - Move calendar to Nested Drawer (here show only input from datePicker and predefined days like tommorow etc.) - try to avoid any popups or anythign like that, just use nested drawer
// - Create own 24h time picker based on text and regex
// + Maybe make custom <form.Field> with isInvalid and erors build in (to clean code)
// + Maybe move useForm to separate file for better code cleanness (but remember about using this also for editing)

export const EventForm = () => {
    const { t } = useTranslation()
    const [timeVariant, setTimeVariant] = useState<EventDateType>(EventDateType.BLOCK)
    console.log('🚀 ~ EventForm ~ timeVariant:', timeVariant)

    const form = useForm({
        defaultValues: {
            date: new Date(),
            startTime: '',
            endTime: '',
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
                        <form.Field
                            name='startTime'
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            {t('calendar.event.create.form.startTime.label')}
                                            <FormRequired />
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                type='time'
                                                id={field.name}
                                                step='1'
                                                defaultValue='10:30:00'
                                                className='bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none'
                                            />
                                            <InputGroupAddon>
                                                <Clock2Icon className='text-muted-foreground' />
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
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
