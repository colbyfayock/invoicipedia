import { pgTable, serial, text, timestamp, integer, pgEnum } from 'drizzle-orm/pg-core';

export const status = ['open', 'paid', 'void', 'uncollectible'] as const;
export type Status = typeof status[number];
export const statusEnum = pgEnum('status', status);

export const Invoices = pgTable('invoices', {
  id: serial('id').primaryKey().notNull(),
  create_ts: timestamp('create_ts').defaultNow().notNull(),
  organization_id: text('organization_id'),
  user_id: text('user_id').notNull(),
  customer_id: integer('customer_id').notNull().references(() => Customers.id),
  description: text('description').notNull(),
  status: statusEnum('status').notNull(),
  value: integer('value').notNull(),
});

export const Customers = pgTable('customers', {
  id: serial('id').primaryKey().notNull(),
  create_ts: timestamp('create_ts').defaultNow().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  user_id: text('user_id'),
  organization_id: text('organization_id'),
});
