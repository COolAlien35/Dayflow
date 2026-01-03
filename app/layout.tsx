import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionSystemProvider } from "@/lib/motion/index"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dayflow HRMS — Every workday, perfectly aligned",
  description: "Premium enterprise Human Resource Management System for modern teams",
  generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#0D4A4A",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MotionSystemProvider>
            {children}
            <Toaster />
          </MotionSystemProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

