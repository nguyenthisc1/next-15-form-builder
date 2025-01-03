import PageClient from '@/app/(admin)/edit-form/_components/page-client'
import { FormProvider } from '@/app/(admin)/edit-form/provider/form-context'
import { GetFormById } from '@/lib/API/Database/forms/queries'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    const form = await GetFormById(formId).then((res) => {
        return ({ ...res, jsonform: JSON.parse(res.jsonform) })
    })
    console.log("🚀 ~ form ~ form:", form)
    return (
        <>
            <FormProvider initialData={{ form }}>
                <PageClient />
            </FormProvider>
        </>
    )
}

export default EditForm
