import PageClient from '@/app/(admin)/edit-form/_components/page-client'
import { FormProvider } from '@/app/(admin)/edit-form/provider/form-context'
import { GetFormById } from '@/lib/API/Database/forms/queries'
import { type Form } from '@/lib/types'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    const form: Form = await GetFormById(formId).then((res) => {
        return ({ id: res.id, jsonform: JSON.parse(res.jsonform), background: res.background, theme: res.theme, styles: res.styles })
    })
    console.log("🚀 ~ constform:Form=awaitGetFormById ~ form:", form)
    return (
        <>
            <FormProvider initialData={{
                form: {
                    id: form.id,
                    jsonform: form.jsonform
                },
                controller: {
                    background: form.background,
                    theme: form.theme,
                    styles: form.styles
                }
            }}>
                <PageClient />
            </FormProvider>
        </>
    )
}

export default EditForm
