import { drizzle } from 'drizzle-orm/xata-http';

import { getXataClient } from '@/db/xata';
import { Invoices, Customers } from './schema';

const xata = getXataClient();

export const db = drizzle(xata, {
  schema: { Invoices, Customers }
});