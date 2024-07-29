import { defineConfig } from 'drizzle-kit'
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL not found in environment');

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});