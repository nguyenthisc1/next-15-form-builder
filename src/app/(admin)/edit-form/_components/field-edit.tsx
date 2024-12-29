'use client'

import { ActionTypes, useFormContext } from '@/app/(admin)/edit-form/provider/form-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Edit, Trash } from 'lucide-react'
import { memo, useEffect, useState } from 'react'

type Props = {
    defaultValues: any
}

const FieldEdit = ({ defaultValues }: Props) => {

    const { dispatch } = useFormContext();

    const [values, setvalues] = useState({ ...defaultValues })

    const handleUpdateField = () => {
        dispatch({
            type: ActionTypes.UPDATE_FORM_FIELD,
            payload: { field: values.field, index: values.index },
        })
    }

    // useEffect(() => {

    //     if (defaultValue) setvalues({ ...defaultValue })

    // }, [defaultValue])

    return (
        <>
            <div className='flex gap-2'>
                <Popover>
                    <PopoverTrigger>
                        <Edit className='size-5 text-gray-400' />
                    </PopoverTrigger>
                    <PopoverContent>

                        <h2>Edit Field</h2>

                        <div className="h-3"></div>
                        <div className='space-y-5'>
                            <div className='space-y-1'>
                                <label className='text-sm text-gray-500'>
                                    Label name
                                </label>
                                <Input type='text' defaultValue={defaultValues.field.label} onChange={(e) => setvalues({
                                    ...values,
                                    field: {
                                        ...values.field,
                                        label: e.target.value
                                    }
                                })} />
                            </div>

                            <div className='space-y-1'>
                                <label className='text-sm text-gray-500'>
                                    Placeholder name
                                </label>
                                <Input type='text' defaultValue={defaultValues.field.placeholder} onChange={(e) => setvalues({
                                    ...values,
                                    field: {
                                        ...values.field,
                                        placeholder: e.target.value
                                    }
                                })} />
                            </div>

                            <Button
                                onClick={handleUpdateField}>
                                Update
                            </Button>
                        </div>

                    </PopoverContent>
                </Popover>
                <Trash className='size-5 text-red-400' />
            </div>
        </>
    )
}

export default memo(FieldEdit)
