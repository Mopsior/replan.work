import { InferSelectModel, Table } from 'drizzle-orm'
import { FileRoutesByTo } from '@/routeTree.gen'

export type DrizzleResponse<T extends Table> = Array<InferSelectModel<T>>

export type TRoutes = keyof FileRoutesByTo
