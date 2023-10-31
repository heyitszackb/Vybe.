// Styles
import './globals.css'

// Utils
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Clerk } from '@clerk/nextjs/server'

// Components
import { ModalProvider } from '@/components/ui/modal-provider'
import { ToasterProvider } from '@/components/toaster-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vybe.',
  description: 'Capture your Moment, Create your Vybe.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModalProvider />
          <ToasterProvider />
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
