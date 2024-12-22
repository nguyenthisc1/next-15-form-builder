import PageClient from '@/app/(admin)/edit-form/_components/page-client'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    return (
        <>
            <PageClient formId={formId} />
        </>
    )
}

export default EditForm
