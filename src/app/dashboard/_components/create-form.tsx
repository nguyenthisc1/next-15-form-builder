'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { AIChatSession } from '@/configs/gemini'
import { Plus } from 'lucide-react'
import { useState } from 'react'

const CreateForm = () => {

    const [input, setInput] = useState<string>('')
    const PROM = ', on the basis of description please give form in json format with form title, sub heading, form field, form name, placeholder name and form label in json format'

    const [loading, setLoading] = useState<boolean>(false)

    const onCreateForm = async () => {
        setLoading(true)
        try {
            const result = await AIChatSession.sendMessage(`Description: ${input}${PROM}`)
            console.log(result.response.text())
        } catch (error) {
            console.error('Error creating form:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create Form
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Form</DialogTitle>
                    <DialogDescription>
                        <Textarea onChange={(e) => setInput(e.target.value)} className='outline-none mt-4' placeholder='Write description of your form' />
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button disabled={loading} type="submit" onClick={() => onCreateForm()}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateForm
