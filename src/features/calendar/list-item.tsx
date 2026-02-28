import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FieldLabel } from '@/components/ui/field'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'
import { FormVariant } from '@/types/enums'
import Drawer from '../drawer'
import { CalendarForm } from './form'
import { ListItemEditableProps, ListItemProps, ListItemRadioItemProps } from './types'

const ListItem = ({ name, itemColor, className, addon, ...props }: ListItemProps) => (
    <div
        className={cn([
            'border-border hover:bg-secondary/20 flex w-full items-center gap-x-2 justify-between rounded-md border px-4 py-2 transition-colors cursor-pointer',
            className,
        ])}
        {...props}
    >
        <div className='flex items-center gap-x-2'>
            <div className='size-3 rounded-full' style={{ backgroundColor: `#${itemColor}` }} />
            {name}
        </div>
        {addon}
    </div>
)
const EditableListItem = ({ name, itemColor, salary, id }: ListItemEditableProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const { t } = useTranslation()

    return (
        <Drawer.Dynamic
            open={isOpen}
            onOpenChange={setIsOpen}
            trigger={<ListItem name={name} itemColor={itemColor} />}
            // trigger={<p> test</p>}
        >
            <Drawer.Title withCenter>{t('appSettings.calendars.edit.label')}</Drawer.Title>
            <Drawer.Description>{t('appSettings.calendars.description')}</Drawer.Description>
            <CalendarForm
                setIsOpen={setIsOpen}
                variant={FormVariant.EDIT}
                defaultValues={{
                    name,
                    color: itemColor,
                    salary,
                }}
                id={id}
            />
        </Drawer.Dynamic>
    )
}

const ListItemRadioItem = ({ name, itemColor, value }: ListItemRadioItemProps) => (
    <FieldLabel
        className='border-border hover:bg-secondary/20 flex w-full items-center gap-x-2 rounded-md border px-4 py-2 cursor-pointer has-data-checked:bg-primary/10 has-data-checked:border-primary transition-colors justify-between'
        htmlFor={value}
    >
        <div className='flex items-center gap-x-2'>
            <div className='size-3 rounded-full' style={{ backgroundColor: `#${itemColor}` }} />
            {name}
        </div>
        <RadioGroupItem value={value} id={value} />
    </FieldLabel>
)

ListItem.Editable = EditableListItem
ListItem.RadioItem = ListItemRadioItem
export default ListItem
