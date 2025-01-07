import PageClient from '@/app/(admin)/edit-form/_components/page-client'
import { FormProvider } from '@/app/(admin)/edit-form/provider/form-context'
import { GetFormById } from '@/lib/API/Database/forms/queries'
import { type Form } from '@/lib/types'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    const form: Form = await GetFormById(formId).then((res) => {
        return ({ id: res.id, jsonform: JSON.parse(res.jsonform) })
    })
    return (
        <>
            <FormProvider initialData={{ form }}>
                <PageClient />
            </FormProvider>
        </>
    )
}

export default EditForm
