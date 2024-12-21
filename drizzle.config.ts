import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/configs/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: 'postgresql://neondb_owner:4bigsFamML2O@ep-broad-forest-a4kt3s8t.us-east-1.aws.neon.tech/neondb?sslmode=require',
    },
})
