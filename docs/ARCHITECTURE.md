# Zora-chan Architecture Documentation

## Overview
Zora-chan is a high-performance decentralized application (dApp) built on the Next.js framework, integrating Zora's minting protocols and Pinata's Web3 storage.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Lucide React
- **Web3 Interface**: Wagmi, Viem, RainbowKit, Ethers.js
- **SDKs**: Zoralabs Coins SDK, Pinata Web3 SDK
- **UI Components**: Radix UI, Tailwind Merge

## Key Workflows
1. **Wallet Connection**: Managed via RainbowKit and Wagmi.
2. **Media Storage**: IPFS uploads handled through Pinata.
3. **Minting Logic**: Direct interaction with Zora's smart contracts via the Coins SDK.
4. **Theming**: Adaptive dark/light mode using next-themes.

## CI/CD Implementation
The project uses GitHub Actions to automate linting and production builds, ensuring code quality across all development branches.
