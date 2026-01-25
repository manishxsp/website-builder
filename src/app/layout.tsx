import type { Metadata } from 'next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Website Builder SaaS',
  description: 'Build beautiful websites easily',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
