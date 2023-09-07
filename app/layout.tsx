import './globals.css'

import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from '@/components/provider/theme-provider';
import { cn } from '@/lib/utils';

const openSans =  Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Just Discord Clone',
  description: 'Just Discord Clone | Your Place to Talk & Hang Out',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(openSans.className, "bg-white dark:bg-[#313338]")}>
          <ThemeProvider 
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="discord-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
