import PageClient from '@/app/(admin)/edit-form/_components/page-client'
import { db } from '@/configs/drizzle'
import { JsonForms } from '@/configs/schema'
import { eq } from 'drizzle-orm'

const EditForm = async ({ params }: { params: Promise<{ formId: string }> }) => {
    const formId = (await params).formId

    const jsonForms = await db
    .select()
    .from(JsonForms)
    .where(eq(JsonForms.id, parseInt(formId)))


    return (
        <>
            <PageClient jsonForms={jsonForms} />
        </>
    )
}

export default EditForm
