import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LoanProvider } from '@/lib/LoanContext'
import { Navigation } from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loan State Ledger',
  description: 'Deterministic Loan State Prototype',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background-start text-white`}>
        <LoanProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <div className="flex-1 lg:pl-64">
              {children}
            </div>
          </div>
        </LoanProvider>
      </body>
    </html>
  )
}
