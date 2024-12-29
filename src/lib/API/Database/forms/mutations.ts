import { db } from '@/configs/drizzle'
import { DrizzleError, eq } from 'drizzle-orm'
import { JsonForms } from '@/configs/schema'

export const UpdateFormById = async (id: string, payload: any) => {
    try {
        const form = await db
            .update(JsonForms)
            .set(payload)
            .where(eq(JsonForms.id, parseInt(id)))
    } catch (error) {
        if (error instanceof Error) {
            throw new DrizzleError({ message: error.message, cause: error })
        } else {
            throw new DrizzleError({ message: 'Unknown error occurred', cause: error })
        }
    }
}
