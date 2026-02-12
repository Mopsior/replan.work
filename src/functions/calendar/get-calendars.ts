import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { calendars as calendarsSchema } from '@/db/schema'

const GetCalendarSchema = z.object({
    userId: z.string(),
})

export const getCalendars = createServerFn({ method: 'GET' })
    .inputValidator(GetCalendarSchema)
    .handler(async ({ data }) => {
        const calendars = await db
            .select()
            .from(calendarsSchema)
            .where(eq(calendarsSchema.userId, data.userId))
            .orderBy(calendarsSchema.createdAt)

        return calendars
    })
