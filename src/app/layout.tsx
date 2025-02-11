import type { Metadata } from 'next'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Form builder',
    description: 'Generated by Form builder',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ClerkProvider>
            <html lang='en'>
                <body className={inter.className}>
                    <main> {children}</main>
                    <Toaster />
                </body>
            </html>
        </ClerkProvider>
    )
}
