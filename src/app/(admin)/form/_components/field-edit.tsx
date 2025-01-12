'use client'

import { ActionTypes, useFormState } from '@/app/(admin)/form/provider/form-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { UpdateFormById } from '@/lib/API/Database/forms/mutations'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Edit, Trash } from 'lucide-react'
import { memo, useState } from 'react'
import { toast } from 'sonner'

type Props = {
    defaultValues: {
        key: string
        field?: any
        index?: number
    }
}

const FieldEdit = ({ defaultValues }: Props) => {
    const { dispatch, state } = useFormState()

    const [values, setvalues] = useState({ ...defaultValues })

    const handleUpdateField = async () => {
        const updated = dispatch({
            type: ActionTypes.UPDATE_FORM_FIELD,
            payload: { key: values.key, field: values.field, index: values.index },
        })

        const response = await UpdateFormById(state.form.id, { column: 'jsonform', value: updated.form.jsonform })
        console.log('🚀 ~ handleUpdateField ~ response:', response)

        if (response) {
            toast.success('Field updated successfully')
        } else {
            toast.error('Failed to update field', response)
        }
    }

    const handleDeleteField = async () => {
        const deleted = dispatch({
            type: ActionTypes.DELETE_FORM_FIELD,
            payload: {
                key: values.key,
                index: defaultValues.index,
            },
        })

        const response = await UpdateFormById(state.form.id, { column: 'jsonform', value: deleted.form.jsonform })
        if (response) {
            toast.success('Field deleted successfully')
        } else {
            toast.error('Failed to delete field')
        }
    }

    return (
        <>
            <div className='flex gap-2'>
                <Popover>
                    <PopoverTrigger>
                        <Edit className='size-5 text-gray-400' />
                    </PopoverTrigger>
                    <PopoverContent>
                        <h2>Edit Field</h2>

                        <div className='h-3'></div>
                        <div className='space-y-5'>
                            <div className='space-y-1'>
                                <label className='text-sm text-gray-500'>Label</label>
                                <Input
                                    type='text'
                                    defaultValue={defaultValues.field.label}
                                    onChange={(e) =>
                                        setvalues({
                                            ...values,
                                            field: {
                                                ...values.field,
                                                label: e.target.value,
                                            },
                                        })
                                    }
                                />
                            </div>

                            {defaultValues.field.placeholder && (
                                <div className='space-y-1'>
                                    <label className='text-sm text-gray-500'>Placeholder</label>
                                    <Input
                                        type='text'
                                        defaultValue={defaultValues.field.placeholder}
                                        onChange={(e) =>
                                            setvalues({
                                                ...values,
                                                field: {
                                                    ...values.field,
                                                    placeholder: e.target.value,
                                                },
                                            })
                                        }
                                    />
                                </div>
                            )}
                            <Button onClick={handleUpdateField}>Update</Button>
                        </div>
                    </PopoverContent>
                </Popover>
                {defaultValues.key === 'field' && defaultValues.field.type !== 'submit' && <Trash className='size-5 text-red-400' onClick={handleDeleteField} />}
            </div>
        </>
    )
}

export default memo(FieldEdit)
