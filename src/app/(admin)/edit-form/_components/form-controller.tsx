import { ActionTypes, useFormContext } from '@/app/(admin)/edit-form/provider/form-context'
import backgroundForm from '@/app/_data/background-form'
import * as themes from '@/app/_data/themes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Controller } from '@/lib/types'
import { cn } from '@/lib/utils'

const FormController = () => {

    const { state, dispatch } = useFormContext()

    const { controller } = state


    const handleUpdateForm = (payload: Controller) => {

        dispatch({
            type: ActionTypes.UPDATE_FORM_CONTROLLER,
            payload: payload
        })

    }

    return (
        <div className='rounded-lg bg-gray-50 p-4'>
            <div className='space-y-6'>
                <div className='space-y-2'>
                    <h3>Themes</h3>

                    <Select defaultValue={controller.theme} onValueChange={(value: string) => handleUpdateForm({ ...controller, theme: value })} >
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            {themes.default.map((theme: any, index: number) => (
                                <SelectItem value={theme.theme} key={index}>
                                    <div className='flex gap-3'>
                                        <div className='min-w-20'>{theme.theme}</div>
                                        <div className='flex'>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--p']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--s']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--sc']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--a']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--nc']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--b1']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--b2']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--b3']})` }}></div>
                                            <div className='size-5' style={{ backgroundColor: `oklch(${theme['--bc']})` }}></div>
                                        </div>
                                    </div>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className='space-y-2'>
                    <h3>Background</h3>

                    <div className='grid grid-cols-3 gap-6'>
                        {backgroundForm.map((background, index) => (
                            <div onClick={() => handleUpdateForm({ ...controller, background: background.gradient })} key={index} className={cn('cursor-pointer relative h-14 rounded-lg text-center text-xs text-white border-2 hover:border-primary',
                                controller.background === background.name && 'border-2 shadow-lg border-primary'
                            )} style={{ background: background.gradient }}>
                                <div className='min-w-20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-difference'>{background.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    )
}




export default FormController
