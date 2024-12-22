import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
config({ path: '.env.local' })

export default defineConfig({
    schema: './src/configs/schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG!,
    },
})
