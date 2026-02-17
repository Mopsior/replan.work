import { InferSelectModel, Table } from 'drizzle-orm'

export type DrizzleResponse<T extends Table> = Array<InferSelectModel<T>>
