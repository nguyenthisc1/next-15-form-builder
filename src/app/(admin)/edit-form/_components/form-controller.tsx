import { ActionTypes, useFormContext } from '@/app/(admin)/edit-form/provider/form-context'
import backgroundForm from '@/app/_data/background-form'
import * as themes from '@/app/_data/themes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
const FormController = () => {

    const { state, dispatch } = useFormContext()

    const { controller } = state

    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <h3>Themes</h3>
                <Select defaultValue={controller.theme} onValueChange={(value: string) => dispatch({
                    type: ActionTypes.UPDATE_FORM_CONTROLLER,
                    payload: { ...controller, theme: value }
                })}>
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
                <Select defaultValue={controller.background} onValueChange={(value: string) => dispatch({
                    type: ActionTypes.UPDATE_FORM_CONTROLLER,
                    payload: { ...controller, background: value }
                })}>
                    <SelectTrigger>
                        <SelectValue placeholder="Background" />
                    </SelectTrigger>
                    <SelectContent>
                        {backgroundForm.map((background, index) => (
                            <SelectItem value={background.name} key={index}>
                                <div className='flex gap-3'>
                                    <div className='min-w-20'>{background.name}</div>
                                    <div className='h-5 min-w-full ' style={{ background: background.gradient }}></div>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div >
    )
}

export default FormController
