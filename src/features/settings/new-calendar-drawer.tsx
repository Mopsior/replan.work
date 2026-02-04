import { Radio, RadioGroup } from '@base-ui/react'
import { useForm } from '@tanstack/react-form'
import { useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import type z from 'zod'
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
import { QueryKeys } from '@/types/constants'
import { catchError } from '@/utils/catch-error'
import Drawer from '../drawer'
import { Button } from '../ui/button'
import { COLOR_PALETTE, formSchema } from './types'

export const NewCalendarDrawer = () => {
    const { t } = useTranslation()
    const [isOpen, setIsOpen] = useState(false)
    const { userId } = Route.useLoaderData()
    const createCalendarFn = useServerFn(createCalendar)
    const queryCClient = useQueryClient()

    const form = useForm({
        defaultValues: {
            name: '',
            color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)].hex as string,
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
                toast.error(error.message)
                return
            }

            toast.success(t('appSettings.calendars.create.form.success'))
            queryCClient.invalidateQueries({ queryKey: [QueryKeys.USER_CALENDARS, userId] })
            setIsOpen(false)
            form.reset()
        },
    })

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={
                <Button>
                    <Plus size={16} />
                    {t('appSettings.calendars.add')}
                </Button>
            }
        >
            <div className='flex w-full flex-col gap-y-4 px-4 not-md:pb-8'>
                <Drawer.Title className='md:text-center'>
                    {t('appSettings.calendars.create.label')}
                </Drawer.Title>
                <Drawer.Description>
                    {t('appSettings.calendars.create.description')}
                </Drawer.Description>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}
                >
                    <FieldGroup>
                        <form.Field
                            name='name'
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            {t('appSettings.calendars.create.form.name.label')}
                                            <span className='text-destructive'>*</span>
                                        </FieldLabel>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            aria-invalid={isInvalid}
                                            placeholder={t(
                                                'appSettings.calendars.create.form.name.placeholder',
                                            )}
                                            autoComplete='off'
                                            required
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name='color'
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor='color-input'>
                                            {t('appSettings.calendars.create.form.color.label')}
                                            <span className='text-destructive'>*</span>
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
                                            {!COLOR_PALETTE.some(
                                                (c) => c.hex === field.state.value,
                                            ) && (
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
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                        <form.Field
                            name='salary'
                            children={(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            {t('appSettings.calendars.create.form.salary.label')}
                                        </FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput
                                                id={field.name}
                                                name={field.name}
                                                value={field.state.value ?? ''}
                                                onBlur={field.handleBlur}
                                                onChange={(e) => {
                                                    const val = e.target.value
                                                    field.handleChange(
                                                        val === '' ? undefined : Number(val),
                                                    )
                                                }}
                                                aria-invalid={isInvalid}
                                                placeholder={t(
                                                    'appSettings.calendars.create.form.salary.placeholder',
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
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                )
                            }}
                        />
                    </FieldGroup>
                    <Button type='submit' className='mt-4 w-full'>
                        <Plus size={16} />
                        {t('appSettings.calendars.create.form.submit')}
                    </Button>
                </form>
            </div>
        </Drawer.Dynamic>
    )
}
