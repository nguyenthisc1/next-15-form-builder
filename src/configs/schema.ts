import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const JsonForms = pgTable('jsonForms', {
    id: serial('id').primaryKey(),
    jsonform: text('jsonform').notNull(),
    theme: varchar('theme').notNull(),
    background: text('background').notNull(),
    styles: text('styles').notNull(),
    createdBy: varchar('created_by').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
})
