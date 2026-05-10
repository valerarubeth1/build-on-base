'use client'
import { useState, useEffect } from 'react'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from 'wagmi'
import { parseEther } from 'viem'
import { NFT_CONTRACT_ADDRESS, MINT_PRICE } from './config'
import { NFT_ABI } from './abi'

export default function Home() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [mintSuccess, setMintSuccess] = useState(false)

  const { data: totalSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'totalSupply',
  })

  const { data: maxSupply } = useReadContract({
    address: NFT_CONTRACT_ADDRESS,
    abi: NFT_ABI,
    functionName: 'maxSupply',
  })

  const { writeContract, isPending, data: hash } = useWriteContract()

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  // Убираем splash screen в Farcaster
  useEffect(() => {
    import('@farcaster/frame-sdk').then((mod) => {
      const sdk = mod.default || mod.sdk || mod
      if (sdk?.actions?.ready) {
        sdk.actions.ready()
      } else if (sdk?.ready) {
        sdk.ready()
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (isSuccess) {
      setMintSuccess(true)
    }
  }, [isSuccess])

  const handleMint = () => {
    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_ABI,
      functionName: 'mint',
      value: parseEther(MINT_PRICE),
    })
  }

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  const supply = totalSupply ? Number(totalSupply) : '—'
  const max = maxSupply ? Number(maxSupply) : 1000

  return (
    <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      {/* Header */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid rgba(0,82,255,0.15)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: '#0052FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>B</div>
          <span style={{ fontSize: '13px', letterSpacing: '0.1em', opacity: 0.7 }}>BUILD ON BASE</span>
        </div>
        {isConnected ? (
          <button
            onClick={() => disconnect()}
            style={{ fontSize: '11px', padding: '6px 12px', border: '1px solid rgba(0,82,255,0.3)', background: 'transparent', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', letterSpacing: '0.05em' }}
          >
            {shortAddress} ✕
          </button>
        ) : null}
      </div>

      {/* NFT Card */}
      <div className="animate-fadeInUp" style={{ maxWidth: '420px', width: '100%', textAlign: 'center' }}>
        {/* NFT Visual */}
        <div className="animate-float" style={{ marginBottom: '32px' }}>
          <div style={{
            width: '280px',
            height: '280px',
            margin: '0 auto',
            background: 'linear-gradient(135deg, #001a66 0%, #0052FF 50%, #3380ff 100%)',
            border: '1px solid rgba(0,82,255,0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }} />
            <div style={{ fontSize: '72px', fontWeight: 'bold', color: 'white', position: 'relative', zIndex: 1, textShadow: '0 0 40px rgba(255,255,255,0.5)' }}>⬡</div>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1, marginTop: '8px' }}>BUILD ON BASE</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', position: 'relative', zIndex: 1, marginTop: '4px' }}>valerarub.base.eth</div>
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,82,255,0.8)', fontSize: '9px', padding: '3px 7px', letterSpacing: '0.1em' }}>BASE</div>
          </div>
        </div>

        <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '0.05em', marginBottom: '8px' }}>
          BUILD ON BASE
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px', letterSpacing: '0.05em' }}>
          Support builders on Base. Own a piece of the chain.
        </p>

        <div style={{ fontSize: '11px', color: 'rgba(0,82,255,0.9)', marginBottom: '32px', letterSpacing: '0.1em' }}>
          {supply} / {max} MINTED
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', background: 'rgba(0,82,255,0.15)', border: '1px solid rgba(0,82,255,0.15)', marginBottom: '24px' }}>
          {[
            { label: 'PRICE', value: `${MINT_PRICE} ETH` },
            { label: 'NETWORK', value: 'BASE' },
            { label: 'TYPE', value: 'ERC-721' },
          ].map((stat) => (
            <div key={stat.label} style={{ background: 'rgba(0,0,20,0.8)', padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '4px' }}>{stat.label}</div>
              <div style={{ fontSize: '12px', color: 'white', fontWeight: 'bold' }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {mintSuccess ? (
          <div style={{ padding: '24px', border: '1px solid rgba(0,255,100,0.3)', background: 'rgba(0,255,100,0.05)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>✓</div>
            <div style={{ fontSize: '14px', color: '#00ff64', letterSpacing: '0.1em' }}>MINT SUCCESSFUL</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>Welcome to Base builders community</div>
            {hash && (
              <a
                href={`https://basescan.org/tx/${hash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '10px', color: '#0052FF', marginTop: '12px', display: 'block', textDecoration: 'underline' }}
              >
                View on Basescan →
              </a>
            )}
          </div>
        ) : !isConnected ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {connectors.slice(0, 2).map((connector) => (
              <button
                key={connector.uid}
                className="btn-base"
                onClick={() => connect({ connector })}
                style={{ width: '100%' }}
              >
                Connect {connector.name}
              </button>
            ))}
          </div>
        ) : (
          <button
            className="btn-base"
            onClick={handleMint}
            disabled={isPending || isConfirming}
            style={{ width: '100%' }}
          >
            {isPending ? 'CONFIRM IN WALLET...' : isConfirming ? 'MINTING...' : `MINT NFT — ${MINT_PRICE} ETH`}
          </button>
        )}

        <div style={{ marginTop: '32px', fontSize: '10px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
          BY VALERARUB.BASE.ETH ON BASE MAINNET
        </div>
      </div>
    </main>
  )
}
