'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Edit, Trash } from 'lucide-react'
import { useState } from 'react'

type Props = {
    defaultValue: any
    onUpdate: (values: any) => void
}

const FieldEdit = ({ defaultValue, onUpdate }: Props) => {

    const [values, setvalues] = useState({ ...defaultValue })

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
                                <Input type='text' defaultValue={defaultValue.label} onChange={(e) => setvalues({
                                    ...values,
                                    label: e.target.value
                                })} />
                            </div>

                            <div className='space-y-1'>
                                <label className='text-sm text-gray-500'>
                                    Placeholder name
                                </label>
                                <Input type='text' defaultValue={defaultValue.placeholder} onChange={(e) => setvalues({
                                    ...values,
                                    placeholder: e.target.value
                                })} />
                            </div>
                            
                            <Button
                                onClick={() => onUpdate(values)}>
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

export default FieldEdit
