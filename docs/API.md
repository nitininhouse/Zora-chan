# 🔌 API Documentation

This document describes the API endpoints, data structures, and integration patterns for Zora-chan.

## 📋 Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
- [Data Models](#data-models)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [SDK Integration](#sdk-integration)
- [Examples](#examples)

## 🌐 Overview

Zora-chan is built on top of the Zora Protocol and provides a simplified interface for:

- Minting custom coins
- Trading coins on Uniswap V4
- Managing coin registries
- IPFS metadata storage

### Base URLs

- **Development**: `http://localhost:3000`
- **Staging**: `https://zora-chan-staging.vercel.app`
- **Production**: `https://zora-chan.vercel.app`

## 🔐 Authentication

Zora-chan uses wallet-based authentication through Web3 providers:

### Supported Wallets

- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow Wallet

### Authentication Flow

1. User connects wallet
2. Wallet signature is requested
3. User signs a message
4. Session is established

```typescript
// Example authentication
import { useAccount, useConnect } from 'wagmi';

function ConnectWallet() {
  const { connect, connectors } = useConnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return <div>Connected: {address}</div>;
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  );
}
```

## 🛠️ API Endpoints

### 1. Pinata API Key Endpoint

**GET** `/api/key`

Returns the public Pinata API key for client-side IPFS operations.

#### Response

```json
{
  "apiKey": "your_pinata_api_key"
}
```

#### Example

```typescript
const response = await fetch('/api/key');
const { apiKey } = await response.json();
```

### 2. IPFS Upload

**POST** `/api/upload` (Internal)

Handles file uploads to IPFS via Pinata.

#### Request Body

```typescript
interface UploadRequest {
  file: File;
  metadata?: {
    name: string;
    description?: string;
  };
}
```

#### Response

```typescript
interface UploadResponse {
  hash: string;
  url: string;
  size: number;
}
```

## 📊 Data Models

### Coin Data Structure

```typescript
interface CoinData {
  // Basic Information
  name: string;
  symbol: string;
  description: string;

  // Metadata
  story: string;
  stats: {
    strength: number;
    intelligence: number;
    speed: number;
    charisma: number;
  };

  // Links
  links: {
    website?: string;
    twitter?: string;
    discord?: string;
  };

  // Artwork
  artwork: {
    file: File;
    name: string;
    size: number;
  };

  // Financial
  payoutRecipient: string;
  initialPurchaseAmount: string;

  // On-chain Data
  coinAddress?: string;
  transactionHash?: string;
  metadataUri?: string;
}
```

### Registry Entry

```typescript
interface RegistryEntry {
  coinAddress: string;
  name: string;
  symbol: string;
  metadataUri: string;
  creator: string;
  timestamp: number;
  network: 'base' | 'base-sepolia';
}
```

### Trade Data

```typescript
interface TradeData {
  coinAddress: string;
  amount: string;
  price: string;
  type: 'buy' | 'sell';
  userAddress: string;
  transactionHash: string;
  timestamp: number;
}
```

### Poll Data

```typescript
interface PollData {
  id: string;
  coinAddress: string;
  question: string;
  options: string[];
  votes: Record<string, number>;
  creator: string;
  startTime: number;
  endTime: number;
  isActive: boolean;
}
```

## ❌ Error Handling

### Error Response Format

```typescript
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  requestId: string;
}
```

### Common Error Codes

| Code                   | Description                    | HTTP Status |
| ---------------------- | ------------------------------ | ----------- |
| `WALLET_NOT_CONNECTED` | User wallet not connected      | 400         |
| `INSUFFICIENT_FUNDS`   | Not enough ETH for transaction | 400         |
| `INVALID_NETWORK`      | Wrong network selected         | 400         |
| `UPLOAD_FAILED`        | IPFS upload failed             | 500         |
| `MINT_FAILED`          | Coin minting failed            | 500         |
| `TRADE_FAILED`         | Trading operation failed       | 500         |
| `UNAUTHORIZED`         | User not authorized for action | 401         |
| `NOT_FOUND`            | Resource not found             | 404         |

### Error Handling Example

```typescript
try {
  const result = await mintCoin(coinData);
  console.log('Coin minted:', result);
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    showError('Not enough ETH to complete this transaction');
  } else if (error.code === 'MINT_FAILED') {
    showError('Failed to mint coin. Please try again.');
  } else {
    showError('An unexpected error occurred');
  }
}
```

## 🚦 Rate Limiting

### IPFS Upload Limits

- **Rate**: 10 uploads per minute per IP
- **File Size**: 100MB maximum
- **File Types**: Images (PNG, JPG, GIF, SVG)

### Trading Limits

- **Rate**: 5 trades per minute per wallet
- **Amount**: 0.001 ETH minimum, 10 ETH maximum per trade

## 🔧 SDK Integration

### Zora SDK Integration

```typescript
import { createCoin, getCoin } from '@zoralabs/coins-sdk';
import { base } from 'viem/chains';

// Create a new coin
const coinParams = {
  name: 'My Coin',
  symbol: 'MYC',
  uri: 'ipfs://Qm...',
  payoutRecipient: '0x...',
  chainId: base.id,
  currency: DeployCurrency.ETH,
  version: 'v4',
  initialPurchaseWei: parseEther('0.01'),
};

const { address, hash } = await createCoin(
  coinParams,
  walletClient,
  publicClient
);
```

### Wagmi Integration

```typescript
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useReadContract, useWriteContract } from 'wagmi';

// Read contract data
const { data: balance } = useReadContract({
  address: coinAddress,
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [userAddress],
});

// Write contract data
const { writeContract } = useWriteContract();

const buyCoin = () => {
  writeContract({
    address: coinAddress,
    abi: uniswapV4Abi,
    functionName: 'swap',
    args: [amount, minAmountOut],
  });
};
```

## 📝 Examples

### Complete Coin Minting Flow

```typescript
import { createCoin } from '@zoralabs/coins-sdk';
import { uploadToIPFS } from '@/utils/pinata/upload';

async function mintCoin(coinData: CoinData) {
  try {
    const artworkHash = await uploadToIPFS(coinData.artwork);

    const metadata = {
      name: coinData.name,
      symbol: coinData.symbol,
      description: coinData.description,
      image: `ipfs://${artworkHash}`,
      attributes: [
        { trait_type: 'Strength', value: coinData.stats.strength },
        { trait_type: 'Intelligence', value: coinData.stats.intelligence },
        { trait_type: 'Speed', value: coinData.stats.speed },
        { trait_type: 'Charisma', value: coinData.stats.charisma },
      ],
    };

    const metadataHash = await uploadToIPFS(
      new File([JSON.stringify(metadata)], 'metadata.json')
    );

    const coinParams = {
      name: coinData.name,
      symbol: coinData.symbol,
      uri: `ipfs://${metadataHash}`,
      payoutRecipient: coinData.payoutRecipient,
      chainId: base.id,
      currency: DeployCurrency.ETH,
      version: 'v4',
      initialPurchaseWei: parseEther(coinData.initialPurchaseAmount),
    };

    const { address: coinAddress, hash: transactionHash } = await createCoin(
      coinParams,
      walletClient,
      publicClient
    );

    await registerCoin(coinAddress);

    return {
      coinAddress,
      transactionHash,
      metadataUri: `ipfs://${metadataHash}`,
    };
  } catch (error) {
    throw new Error(`Minting failed: ${error.message}`);
  }
}
```

### Trading Example

```typescript
import { useReadContract, useWriteContract } from 'wagmi';

function TradeInterface({ coinAddress }: { coinAddress: string }) {
  const [amount, setAmount] = useState('');
  const [isBuying, setIsBuying] = useState(true);

  const { data: price } = useReadContract({
    address: coinAddress,
    abi: uniswapV4Abi,
    functionName: 'getPrice',
  });

  const { writeContract } = useWriteContract();

  const handleTrade = () => {
    if (isBuying) {
      writeContract({
        address: coinAddress,
        abi: uniswapV4Abi,
        functionName: 'buy',
        args: [parseEther(amount)],
        value: parseEther(amount).mul(price),
      });
    } else {
      writeContract({
        address: coinAddress,
        abi: uniswapV4Abi,
        functionName: 'sell',
        args: [parseEther(amount)],
      });
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={() => setIsBuying(!isBuying)}>
        {isBuying ? 'Buy' : 'Sell'}
      </button>
      <button onClick={handleTrade}>Execute Trade</button>
    </div>
  );
}
```

### Poll Creation Example

```typescript
function CreatePoll({ coinAddress }: { coinAddress: string }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['']);

  const createPoll = () => {
    const pollData: PollData = {
      id: crypto.randomUUID(),
      coinAddress,
      question,
      options: options.filter(opt => opt.trim()),
      votes: {},
      creator: userAddress,
      startTime: Date.now(),
      endTime: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      isActive: true,
    };

    const polls = JSON.parse(localStorage.getItem('polls') || '[]');
    polls.push(pollData);
    localStorage.setItem('polls', JSON.stringify(polls));
  };

  return (
    <form onSubmit={createPoll}>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Poll question"
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          value={option}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[index] = e.target.value;
            setOptions(newOptions);
          }}
          placeholder={`Option ${index + 1}`}
        />
      ))}
      <button type="button" onClick={() => setOptions([...options, ''])}>
        Add Option
      </button>
      <button type="submit">Create Poll</button>
    </form>
  );
}
```

## 🔗 External Integrations

### Pinata IPFS

- **Documentation**: [Pinata Docs](https://docs.pinata.cloud/)
- **Rate Limits**: 10 requests/minute
- **File Size**: 100MB max

### Zora Protocol

- **Documentation**: [Zora Docs](https://docs.zora.co/)
- **Networks**: Base, Zora
- **SDK**: `@zoralabs/coins-sdk`

### Uniswap V4

- **Documentation**: [Uniswap V4 Docs](https://docs.uniswap.org/)
- **Integration**: Via Zora SDK
- **Liquidity**: Automatic pool creation

---

## 📞 Support

For API support and questions:

- **GitHub Issues**: [Create an issue](https://github.com/your-username/zora-chan/issues)
- **Discord**: [Join our community](https://discord.gg/zora-chan)
- **Email**: support@zora-chan.com

---

**Last updated**: January 2025
