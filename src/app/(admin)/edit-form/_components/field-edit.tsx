import { Popover, PopoverContent } from '@/components/ui/popover'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Edit, Trash } from 'lucide-react'

const FieldEdit = () => {
    return (
        <>
            <div className='flex gap-2'>
                <Popover>
                    <PopoverTrigger><Edit className='size-5 text-gray-400' /></PopoverTrigger>
                    <PopoverContent>
                        <h2>Edit Field</h2>
                        <div></div>
                    </PopoverContent>
                </Popover>
                <Trash className='size-5 text-red-400' />
            </div>


        </>
    )
}

export default FieldEdit
