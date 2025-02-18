// import { drizzle } from 'drizzle-orm/postgres-js';
// const db = drizzle('postgresql://neondb_owner:npg_3kLecivfPY5z@ep-billowing-feather-a5vgqz4r.us-east-2.aws.neon.tech/Expanse-tracker?sslmode=require');
// const result = await db.execute('select 1');


import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
const sql = neon('postgresql://neondb_owner:npg_3kLecivfPY5z@ep-billowing-feather-a5vgqz4r.us-east-2.aws.neon.tech/Expanse-tracker?sslmode=require');
import * as schema from './schema'
export const db = drizzle({ client: sql },{schema});




