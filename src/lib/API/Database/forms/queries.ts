import { db } from '@/configs/drizzle'
import { JsonForms } from '@/configs/schema'
import { type Doc } from '@/lib/drizzle-types'
import { DrizzleError, eq } from 'drizzle-orm'
import { cache } from 'react'

export const GetFormById = cache(async (id: string): Promise<Doc<'JsonForms'>> => {
    try {
        const form = await db
            .select()
            .from(JsonForms)
            .where(eq(JsonForms.id, parseInt(id)))

        return form[0]
    } catch (error) {
        if (error instanceof Error) {
            throw new DrizzleError({ message: error.message, cause: error })
        } else {
            throw new DrizzleError({ message: 'Unknown error occurred', cause: error })
        }
    }
})
