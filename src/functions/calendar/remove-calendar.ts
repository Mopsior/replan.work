import { auth } from '@clerk/tanstack-react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { and, eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { calendars } from '@/db/schema'
import { catchError } from '@/utils/catch-error'

const calendarSchema = z.object({
    id: z.uuid(),
    userId: z.string(),
})

export const removeCalendarFn = createServerFn({ method: 'POST' })
    .inputValidator(calendarSchema)
    .handler(async ({ data }) => {
        const { isAuthenticated, userId } = await auth()
        if (!isAuthenticated || userId !== data.userId) {
            throw new Error('Unauthorized')
        }

        const [error] = await catchError(
            db
                .delete(calendars)
                .where(and(eq(calendars.id, data.id), eq(calendars.userId, userId))),
        )

        if (error) {
            throw new Error('Failed to remove calendar')
        }

        return { success: true }
    })
