![image](https://github.com/user-attachments/assets/4e4ab5c8-36d8-43e3-895a-2522cb2f5189)# 🥷 Zora-chan: The Manga-Inspired Coin Creation & Community Platform

![generated-image(2)](https://github.com/user-attachments/assets/0af1138c-bbc2-4744-b8b9-93b574b68995)


**Zora-chan** is a playful, decentralized platform for minting, trading, and interacting with custom coins on the Zora protocol. It’s designed for creators, manga fans, and Web3 explorers who want to launch their own coins, build communities, and engage through polls and trading—all in a manga-inspired interface.

---

## 🚀 Features

- **Mint Your Own Coin:** Instantly create a custom CoinV4 token with artwork, metadata, and story—all from the UI.
- **On-Chain Registry:** Every coin minted via Zora-chan is registered on-chain for full decentralization and discovery.
- **Explore Platform Coins:** Browse all coins minted on Zora-chan, with live stats, images, and links to trade or view.
- **Trade Coins:** Buy and sell any CoinV4 token (with Uniswap V4 liquidity) directly from the platform.
- **Coin Holder Polls:** Exclusive polls for coin holders—only those who own a coin can vote in its community polls.
- **Manga-Style UI:** Enjoy a playful, manga-inspired design that makes Web3 accessible and fun!
- **No Backend Needed:** All coin tracking and gating is on-chain—no centralized database required.

---

## 🌟 Main Feature: Create Your Own Coin

- Fill out your character’s details: name, symbol, description, story arc, stats, and links.
- Upload artwork: drag-and-drop your manga character art (stored on IPFS).
- Set payout and initial liquidity: choose who receives payouts and how much ETH to seed the pool with.
- Mint on-chain: your coin is created on the Zora protocol, with a Uniswap V4 pool initialized for trading.
- Automatic registry: the coin’s address is saved in Zora-chan’s on-chain registry, making it discoverable to all.

---

## 🗂️ On-Chain Coin Registry

- Every coin minted via Zora-chan is registered in an on-chain registry contract (separate for each network).
- This registry is the source of truth for all Zora-chan coins—no backend or centralized database required.
- The registry supports both Base Mainnet and Base Sepolia (testnet).

![Screenshot from 2025-07-09 12-40-39](https://github.com/user-attachments/assets/df6f4999-75dd-4c0f-a54b-9ffc8a44bed0)



---

## 🔍 Explore & Discover Coins

- **Explore Coins Page:** See all coins minted from Zora-chan, with images, names, stats, and links.
- **Network Selector:** Instantly switch between Base Mainnet and Sepolia to view coins on either network.
- **Live Stats:** Each coin card shows market cap, 24h volume, supply, and more (via Zora SDK).

---

## 💱 Trade Coins Instantly

- **Trade UI:** Buy or sell any CoinV4 token (with liquidity) right from the platform.
- **Wallet Integration:** Connect your wallet to execute trades securely.
- **Network-aware:** Trading is only enabled on supported networks (Base Mainnet for production).

![Screenshot from 2025-07-09 12-41-45](https://github.com/user-attachments/assets/1bf40371-7f4c-495a-bb9a-ef9c18077334)


---

## 🗳️ Coin Holder-Only Polls

- **Gated Voting:** Only users who own a coin (checked on-chain) can see and vote in its polls.
- **Frontend-Only Storage:** Votes are stored in localStorage for demo purposes (no backend required).
- **Easy to Extend:** Add or update polls for any coin in the code.

---

## 🎨 Funky Manga-Inspired UI

- Custom logo and character mascot: playful, manga-style branding for a fun community feel.
- Responsive design: works on desktop and mobile.
- Accessible: clear forms, big buttons, and helpful prompts.

---

## 🛠️ Technical Stack

- **Frontend:** React, Next.js, wagmi, ethers.js, viem
- **Zora SDK:** For minting, trading, and querying CoinV4 tokens and metadata
- **IPFS (Pinata):** For storing character artwork and metadata
- **On-chain Registry:** Solidity contract for coin tracking (one per network)
- **No backend database required!**

---

## 📝 How It Works

1. User mints a coin: all details and artwork are uploaded to IPFS; coin is created on Zora.
2. Coin is registered: the coin’s address is saved in the on-chain registry.
3. Discovery: anyone can browse all Zora-chan coins via the Explore page.
4. Trading: users can buy/sell coins if liquidity is available.
5. Community: coin holders can participate in exclusive polls for each coin.

---

## 🛡️ Security & Limitations

- All coin ownership checks and registry are on-chain.
- Voting is frontend-only (localStorage); for trustless voting, deploy a poll contract.
- Trades require liquidity and are only supported on Base Mainnet.

---

## 📚 Documentation & References

- [Zora Coins SDK Docs](https://docs.zora.co/coins/sdk/)
- [Zora Protocol](https://zora.co/)
- [Base Network](https://base.org/)
- [IPFS](https://ipfs.io/)

---

## 🏆 Why Zora-chan?

- Mint coins, not just NFTs!
- No backend required—everything is on-chain and decentralized.
- Manga-inspired, fun, and easy for everyone.
- Perfect for creators, DAOs, and Web3 communities.

---

**Start minting your manga universe today—only on Zora-chan!**
