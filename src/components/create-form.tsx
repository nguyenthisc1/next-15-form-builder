'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { Textarea } from '@/components/ui/textarea'
import { db } from '@/configs/drizzle'
import { AIChatSession } from '@/configs/gemini'
import { JsonForms } from '@/configs/schema'
import { useUser } from '@clerk/nextjs'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const CreateForm = () => {
    const router = useRouter()

    const [input, setInput] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const { user } = useUser()

    const PROM = `, on the basis of description please give form in json format with form title, form heading, form field, form name, form type, placeholder name and form label. Form title key is title, form heading key is subHeading, form field key is fields it is array have keys name, type, label, placeholder, generate with json format`

    const onCreateForm = async () => {
        setLoading(true)
        try {
            const result = await AIChatSession.sendMessage(`Description: ${input}${PROM}`)
            const resultText = result.response
                .text()
                .trim()
                .replace(/^```json|```$/g, '')

            if (resultText) {
                const response = await db
                    .insert(JsonForms)
                    .values({
                        jsonform: resultText,
                        createdBy: user?.primaryEmailAddress?.emailAddress ?? user?.id ?? '',
                    })
                    .returning({ id: JsonForms.id })

                console.log('NEW FORM ID:', response)

                const id = response[0].id

                if (id) {
                    toast.success('Form created successfully')
                    router.push(`/edit-form/${id}`)
                }
            }
        } catch (error) {
            toast.error('Failed to create form')
            console.error('Error creating form:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full'>
                    <Plus />
                    Create Form
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create New Form</DialogTitle>
                    <DialogDescription>
                        <Textarea disabled={loading} onChange={(e) => setInput(e.target.value)} className='mt-4 outline-none' placeholder='Write description of your form' />
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type='button' variant='secondary'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={loading} type='submit' onClick={() => onCreateForm()}>
                        {loading && <LoadingSpinner />}
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateForm
