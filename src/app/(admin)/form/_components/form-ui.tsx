import FieldEdit from '@/app/(admin)/form/_components/field-edit'
import { useFormState } from '@/app/(admin)/form/provider/form-context'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useSidebar } from '@/components/ui/sidebar'
import { Textarea } from '@/components/ui/textarea'

const FormUI = () => {
    const { state } = useFormState()
    const { form, controller } = state
    const { jsonform } = form
    // console.log("🚀 ~ FormUI ~ jsonform:", jsonform)
    const { preview } = useSidebar()

    return (
        <div className='flex w-full items-center justify-center rounded-lg border border-border p-4' style={{ background: controller.background }}>
            <div className='mx-auto inline-block min-w-[480px] space-y-8 border p-4' data-theme={controller!.theme}>
                <div className='space-y-2'>
                    <div className='relative'>
                        <h2 className='text-center text-2xl font-bold'>{jsonform?.title}</h2>
                        {!preview && (
                            <div className='absolute right-0 top-0 cursor-pointer'>
                                <FieldEdit defaultValues={{ key: 'title', field: { label: jsonform.title } }} />
                            </div>
                        )}
                    </div>
                    <div className='relative'>
                        <h3 className='m-auto max-w-[80%] text-center text-sm text-gray-400'>{jsonform?.subHeading}</h3>
                        {!preview && (
                            <div className='absolute right-0 top-0 cursor-pointer'>
                                <FieldEdit defaultValues={{ key: 'subHeading', field: { label: jsonform.subHeading } }} />
                            </div>
                        )}
                    </div>
                </div>

                <form className='space-y-5'>
                    {jsonform?.fields?.map((field: any, index: number) => (
                        <div key={index} className='relative'>
                            <div className='form-field space-y-1'>
                                {field.type === 'select' && (
                                    <>
                                        <Label className='text-sm text-gray-500' htmlFor={field.name}>
                                            {field.label}
                                        </Label>
                                        <Select name={field.name}>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map((option: string, index: number) => (
                                                    <SelectItem key={index} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </>
                                )}

                                {field.type === 'radio' && (
                                    <>
                                        <Label className='text-sm text-gray-500' htmlFor={field.name}>
                                            {field.label}
                                        </Label>
                                        <RadioGroup name={field.name}>
                                            {field.options?.map((option: any, index: number) => (
                                                <div key={index} className='flex items-center space-x-2'>
                                                    <RadioGroupItem value={option.label} id={option.label} />
                                                    <Label htmlFor={option.label}>{option.label}</Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    </>
                                )}

                                {field.type === 'checkbox' && (
                                    <>
                                        {field.options && (
                                            <>
                                                {field.options?.map((item: any, index: number) => (
                                                    <div key={index} className='flex items-center space-x-2'>
                                                        <Checkbox name={item.name} id={item.name} />
                                                        <label htmlFor={item.name} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                            {item.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </>
                                        )}

                                        {!field.options && (
                                            <div className='flex items-center space-x-2'>
                                                <Checkbox name={field.name} id={field.name} />
                                                <label htmlFor={field.name} className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                                                    {field.label}
                                                </label>
                                            </div>
                                        )}
                                    </>
                                )}

                                {field.type === 'email' && (
                                    <>
                                        <label className='text-sm text-gray-500' htmlFor={field.name}>
                                            {field.label}
                                        </label>
                                        <Input type={field.type} placeholder={field.placeholder} name={field.name} />
                                    </>
                                )}

                                {field.type === 'text' && (
                                    <>
                                        <label className='text-sm text-gray-500' htmlFor={field.name}>
                                            {field.label}
                                        </label>
                                        <Input type={field.type} placeholder={field.placeholder} name={field.name} />
                                    </>
                                )}

                                {field.type === 'textarea' && (
                                    <>
                                        <label className='text-sm text-gray-500' htmlFor={field.name}>
                                            {field.label}
                                        </label>
                                        <Textarea placeholder={field.placeholder} name={field.name}></Textarea>
                                    </>
                                )}

                                {field.type === 'submit' && <Button name={field.name}>{field.label}</Button>}
                            </div>

                            {!preview && (
                                <div className='absolute right-0 top-0 cursor-pointer'>
                                    <FieldEdit defaultValues={{ key: 'field', field, index }} />
                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    )
}

export default FormUI
