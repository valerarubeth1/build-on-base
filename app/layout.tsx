import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Build on Base — Mint NFT',
  description: 'Support builders on Base. Mint a unique NFT by valerarub.base.eth',
  other: {
    // ✅ Твой base:app_id — уже вставлен!
    'base:app_id': '69ff8e719ee68cd142d1af9a',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
