import { integer, numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Budget=pgTable('budget',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
})

export const Expanses=pgTable('expanses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budget.id),
    createdAt:varchar('createdAt').notNull()
})