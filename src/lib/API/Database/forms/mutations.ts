import { db } from '@/configs/drizzle'
import { JsonForms } from '@/configs/schema'
import { DrizzleError, eq } from 'drizzle-orm'

export const UpdateFormById = async (id: string, payload: any) => {
    try {
        const form = await db
            .update(JsonForms)
            .set({
                jsonform: payload,
            })
            .where(eq(JsonForms.id, parseInt(id)))
            .returning({
                id: JsonForms.id,
            })

        return form
    } catch (error) {
        if (error instanceof Error) {
            throw new DrizzleError({ message: error.message, cause: error })
        } else {
            throw new DrizzleError({ message: 'Unknown error occurred', cause: error })
        }
    }
}
