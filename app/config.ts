import { createConfig, http } from 'wagmi'
import { base } from 'wagmi/chains'
import { coinbaseWallet, metaMask, injected } from 'wagmi/connectors'

// ⚠️  REPLACE with your Builder Code from base.dev → Settings → Builder Codes
// After you add your domain and get the code (looks like: bc_xxxxxxxx)
// For now transactions work without it, add it later for attribution
export const BUILDER_CODE = 'REPLACE_WITH_YOUR_BUILDER_CODE'

// NFT Contract on Base mainnet
// ⚠️  REPLACE with your deployed contract address
export const NFT_CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000' as `0x${string}`

export const MINT_PRICE = '0.00001' // ETH

export const config = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({ appName: 'Build on Base' }),
    metaMask(),
    injected(),
  ],
  transports: {
    [base.id]: http(),
  },
})
