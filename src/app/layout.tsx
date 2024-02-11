import type { Metadata } from 'next'

import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { GeistSans } from 'geist/font/sans'
import { cn } from '@/lib/utils'

import './globals.css'

export const metadata: Metadata = {
  title: 'Type Generator'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(GeistSans.className, 'dark:bg-neutral-950')}>
        <ThemeProvider
          disableTransitionOnChange
          defaultTheme="system"
          attribute="class"
          enableSystem
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
