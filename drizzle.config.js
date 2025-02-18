import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'postgresql', // 'mysql' | 'sqlite' | 'turso'
  schema: './utils/schema.jsx',
  dbCredentials: {
    host: "ep-billowing-feather-a5vgqz4r-pooler.us-east-2.aws.neon.tech", // Neon host
    user: "neondb_owner", // Neon user
    password: "npg_3kLecivfPY5z", // Neon password
    database: "Expanse-tracker", // Neon database name
    ssl: true, // Enable SSL for secure connections
  },
})

console.log("first")
// export default {
//     schema: "./huy/schema.jsx", // Path to your schema file
//     driver: "pg", // Driver for PostgreSQL
//     dialect: "postgresql", // Specify the dialect
//     dbCredentials: {
//       connectionString: "postgresql://neondb_owner:npg_3kLecivfPY5z@ep-billowing-feather-a5vgqz4r.us-east-2.aws.neon.tech/neondb?sslmode=require" // Replace with your actual connection string
//     },
//   };