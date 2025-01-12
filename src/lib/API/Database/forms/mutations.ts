import { db } from '@/configs/drizzle';
import { DrizzleError, eq } from 'drizzle-orm';
import { JsonForms } from './../../../../configs/schema';

export const UpdateFormById = async (id: number, payload: { column: string; value: any }) => {
    console.log("🚀 ~ UpdateFormById ~ payload:", payload)
    try {
        const form = await db
            .update(JsonForms)
            .set({
                [payload.column]: payload.value,
            })
            .where(eq(JsonForms.id, id))
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
