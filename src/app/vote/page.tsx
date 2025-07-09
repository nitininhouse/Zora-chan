"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { getOnchainCoinDetails } from "@zoralabs/coins-sdk";
import { baseSepolia } from "viem/chains";
import { createPublicClient, http } from "viem";


const registryAbi = [
  "function getAllCoins() view returns (address[])"
];
const registryAddress = "0xEa55482C44Ced3f082Ab335fbBF4BcB179963f3c";
const rpcUrl = "https://sepolia.base.org";


const polls: Record<string, { question: string; options: string[] }> = {
  "0xa6b7814d982d073ea18aa68b82f55ae5379db010": {
    question: "Which manga genre should this character star in next?",
    options: ["Action", "Romance", "Comedy", "Mystery"]
  },
  "0x1234567890abcdef1234567890abcdef12345678": {
    question: "Should we add a new special ability to this coin's character?",
    options: ["Yes, add a new ability!", "No, keep it classic"]
  }

};

export default function CoinPolls() {
  const { address: userAddress } = useAccount();
  const [ownedCoins, setOwnedCoins] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOwnedCoins = async () => {
      if (!userAddress) return;
      setLoading(true);

     
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const registry = new ethers.Contract(registryAddress, registryAbi, provider);
      const allCoins: string[] = await registry.getAllCoins();

     
      const publicClient = createPublicClient({
        chain: baseSepolia,
        transport: http(rpcUrl),
      });

      const owned: string[] = [];
      for (const coin of allCoins) {
        try {
          const details = await getOnchainCoinDetails({
            coin: coin as `0x${string}`,
            user: userAddress as `0x${string}`,
            publicClient,
          });
          if (details.balance && BigInt(details.balance) > BigInt(0)) {
            owned.push(coin);
          }
        } catch (e) {
          
        }
      }
      setOwnedCoins(owned);
      setLoading(false);
    };
    fetchOwnedCoins();
  }, [userAddress]);

  
  const hasVoted = (coin: string) =>
    !!localStorage.getItem(`poll-voted-${coin}-${userAddress}`);
  const vote = (coin: string, option: string) => {
    localStorage.setItem(`poll-voted-${coin}-${userAddress}`, option);
    alert("Vote submitted!");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>
        Coin Holder Polls
      </h1>
      {loading && <p>Loading your coins...</p>}
      {!loading && ownedCoins.length === 0 && (
        <p>You don't own any eligible coins.</p>
      )}
      {ownedCoins.map((coin) => (
        <div key={coin} style={{ marginBottom: 32, border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Poll for {coin}</h2>
          <p>
            {polls[coin]?.question ||
              "No poll for this coin yet. (Add your poll data in the code.)"}
          </p>
          {polls[coin] && !hasVoted(coin) && (
            <div style={{ marginTop: 12 }}>
              {polls[coin].options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => vote(coin, opt)}
                  style={{
                    marginRight: 8,
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "1px solid #444",
                    background: "#f5f5f5",
                    color: "#222",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
          {polls[coin] && hasVoted(coin) && (
            <p style={{ color: "#22c55e", fontWeight: 600, marginTop: 8 }}>
              You have already voted:{" "}
              {localStorage.getItem(`poll-voted-${coin}-${userAddress}`)}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
