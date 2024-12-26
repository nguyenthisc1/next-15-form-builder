import PageClient from '@/app/(admin)/edit-form/_components/page-client'
import { GetFormById } from '@/lib/API/Database/forms/queries'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    const jsonForms = await GetFormById(formId)

    return (
        <>
            <PageClient jsonForms={jsonForms} />
        </>
    )
}

export default EditForm
