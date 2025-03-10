import type {Config} from 'drizzle-kit';
export default {
  dialect: 'sqlite',
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'expo', // <--- very important
  dbCredentials: {
    url: 'sqlite.db',
  },
} satisfies Config;
