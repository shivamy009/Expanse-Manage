import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './utils/schema.jsx',
  dbCredentials: {
    host: "", // Neon host
    user: "", // Neon user
    password: "", // Neon password
    database: "", // Neon database name
    ssl: true, // Enable SSL for secure connections
  },
})

console.log("first")
