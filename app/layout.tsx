import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Build on Base — Mint NFT',
  description: 'Support builders on Base. Mint a unique NFT by valerarub.base.eth',
  other: {
    'base:app_id': '69ff8e719ee68cd142d1af9a',
    'fc:frame': 'vNext',
    'fc:frame:image': 'https://build-on-base-khaki.vercel.app/frame-image.png',
    'fc:frame:button:1': 'Mint NFT 🔵',
    'fc:frame:button:1:action': 'link',
    'fc:frame:button:1:target': 'https://build-on-base-khaki.vercel.app',
    'og:image': 'https://build-on-base-khaki.vercel.app/frame-image.png',
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
