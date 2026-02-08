import { Radio, RadioGroup } from '@base-ui/react'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Plus } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type z from 'zod'
import { Button } from '@/components/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group'
import { createCalendar } from '@/functions/calendar/create-calendar'
import { cn } from '@/lib/utils'
import { Route } from '@/routes/app/route'
import { COLOR_PALETTE, QueryKeys } from '@/types/constants'
import { FormVariant } from '@/types/enums'
import { catchError } from '@/utils/catch-error'
import { getRandomColor } from '@/utils/get-random-color'
import { FormRequired } from '../form-required'
import { RemoveCalendnarButton } from './remove-button'
import { CalendarFormProps, formSchema } from './types'

export const CalendarForm = ({ setIsOpen, variant, defaultValues, id }: CalendarFormProps) => {
    const { t } = useTranslation()
    const { userId } = Route.useLoaderData()
    const createCalendarFn = useServerFn(createCalendar)
    const queryClient = useQueryClient()

    const form = useForm({
        defaultValues: {
            name: defaultValues?.name ?? '',
            color: defaultValues?.color.toUpperCase() ?? getRandomColor(),
            salary: defaultValues?.salary ?? undefined,
        } as z.infer<typeof formSchema>,
        validators: {
            onSubmit: formSchema,
            onBlur: formSchema,
            onChange: formSchema,
        },
        onSubmit: async ({ value }) => {
            const [error] = await catchError(
                createCalendarFn({
                    data: {
                        name: value.name,
                        color: value.color,
                        salary: value.salary,
                        userId: userId,
                    },
                }),
            )

            if (error) {
                console.error(error)
                toast.error(
                    t(
                        variant === FormVariant.CREATE
                            ? 'appSettings.calendars.create.error'
                            : 'appSettings.calendars.edit.error',
                    ),
                    { description: error.message },
                )
                return
            }

            toast.success(
                variant === FormVariant.CREATE
                    ? t('appSettings.calendars.form.success.create')
                    : t('appSettings.calendars.form.success.edit'),
            )
            queryClient.invalidateQueries({ queryKey: [QueryKeys.USER_CALENDARS, userId] })
            setIsOpen(false)
            form.reset()
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                form.handleSubmit()
            }}
            className='flex flex-col w-full h-full justify-between'
        >
            <FieldGroup>
                <form.Field
                    name='name'
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t('appSettings.calendars.form.name.label')}
                                    <FormRequired />
                                </FieldLabel>
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    aria-invalid={isInvalid}
                                    placeholder={t('appSettings.calendars.form.name.placeholder')}
                                    autoComplete='off'
                                    required
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />
                <form.Field
                    name='color'
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor='color-input'>
                                    {t('appSettings.calendars.form.color.label')}
                                    <FormRequired />
                                </FieldLabel>
                                <RadioGroup
                                    value={field.state.value}
                                    onValueChange={(newValue) =>
                                        field.handleChange(newValue as string)
                                    }
                                    className='mb-2 flex justify-between'
                                >
                                    {COLOR_PALETTE.map((color) => (
                                        <Radio.Root
                                            key={color.hex}
                                            value={color.hex}
                                            className={cn([
                                                'data-checked:ring-foreground size-6 cursor-pointer rounded-md transition-transform hover:scale-110 data-checked:ring-2 data-checked:ring-offset-2',
                                                color.tailwind,
                                            ])}
                                        >
                                            <Radio.Indicator className='hidden' />
                                        </Radio.Root>
                                    ))}
                                </RadioGroup>
                                <InputGroup>
                                    <InputGroupInput
                                        id='color-input'
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                            field.handleChange(e.target.value.toUpperCase())
                                        }
                                        aria-invalid={isInvalid}
                                        autoComplete='off'
                                        required
                                        type='text'
                                        maxLength={6}
                                        minLength={6}
                                        placeholder='000000'
                                    />
                                    <InputGroupAddon>
                                        <InputGroupText>#</InputGroupText>
                                    </InputGroupAddon>
                                    {!COLOR_PALETTE.some((c) => c.hex === field.state.value) && (
                                        <InputGroupAddon align='inline-end'>
                                            <div
                                                className='size-5 rounded-sm'
                                                style={{
                                                    backgroundColor: `#${field.state.value}`,
                                                }}
                                            />
                                        </InputGroupAddon>
                                    )}
                                </InputGroup>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />
                <form.Field
                    name='salary'
                    children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                            <Field data-invalid={isInvalid}>
                                <FieldLabel htmlFor={field.name}>
                                    {t('appSettings.calendars.form.salary.label')}
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        id={field.name}
                                        name={field.name}
                                        value={field.state.value ?? ''}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => {
                                            const val = e.target.value
                                            field.handleChange(val === '' ? undefined : Number(val))
                                        }}
                                        aria-invalid={isInvalid}
                                        placeholder={t(
                                            'appSettings.calendars.form.salary.placeholder',
                                        )}
                                        autoComplete='off'
                                        type='number'
                                        min={0}
                                        step={0.01}
                                        max={150}
                                    />
                                    <InputGroupAddon align='inline-end'>
                                        <InputGroupText>zł</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )
                    }}
                />
            </FieldGroup>
            <div className='space-y-2'>
                {variant === FormVariant.EDIT && id && (
                    <RemoveCalendnarButton id={id} setIsOpen={setIsOpen} />
                )}
                <Button type='submit' className='w-full'>
                    <Plus size={16} />
                    {variant === FormVariant.CREATE
                        ? t('appSettings.calendars.form.submit.create')
                        : t('appSettings.calendars.form.submit.edit')}
                </Button>
            </div>
        </form>
    )
}
