"use client";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getProfileBalances, getCoin } from "@/lib/zora";
import { base } from "viem/chains";

interface CoinBalanceNode {
  coin: {
    address: string;
    name: string;
    symbol: string;
    mediaContent?: { previewImage?: string };
    marketCap?: string;
    volume24h?: string;
    image?: string; 
  };
  balance: string;
  valueUsd: string;
}

export default function CoinProfilePage() {
  const { address, isConnected } = useAccount();
  const [balances, setBalances] = useState<CoinBalanceNode[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const loadBalances = async () => {
    if (!mounted || !isConnected || !address) return;
    setLoading(true);

    try {
      
      const resp: any = await getProfileBalances({
        identifier: address,
        count: 20,
        after: cursor,
      });

      console.log("Profile response:", resp); 

      const profile = resp?.data?.profile;
      const edges = profile?.coinBalances?.edges || [];
      const nextCursor = profile?.coinBalances?.pageInfo?.endCursor;

      // 2. Extract nodes
      const nodes: CoinBalanceNode[] = edges.map((edge: any) => edge.node);

      console.log("Extracted nodes:", nodes); 

      // 3. Fetch extended token data
      const detailed = await Promise.all(
        nodes.map(async (node: CoinBalanceNode) => {
          try {
            const coinResp: any = await getCoin({
              address: node.coin.address,
              chain: base.id,
            });

            console.log(`Coin response for ${node.coin.address}:`, coinResp); 

            const zora = coinResp?.data?.zora20Token;
            
            
            const imageUrl = zora?.mediaContent?.previewImage || 
                           node.coin.mediaContent?.previewImage ||
                           zora?.image || 
                           node.coin.image;

            console.log(`Image URL for ${node.coin.name}:`, imageUrl); 

            return {
              coin: {
                ...node.coin,
                name: zora?.name || node.coin.name,
                symbol: zora?.symbol || node.coin.symbol,
                mediaContent: {
                  previewImage: imageUrl,
                },
                marketCap: zora?.marketCap,
                volume24h: zora?.volume24h,
              },
              balance: node.balance,
              valueUsd: node.valueUsd,
            } as CoinBalanceNode;
          } catch (error) {
            console.error(`Error fetching coin data for ${node.coin.address}:`, error);
            return node; 
          }
        })
      );

      console.log("Detailed balances:", detailed);

      setBalances(prev => [...prev, ...detailed]);
      setCursor(nextCursor);
    } catch (error) {
      console.error("Error loading balances:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && isConnected && address) {
      setBalances([]); 
      setCursor(undefined);
      loadBalances();
    }
  }, [mounted, isConnected, address]);

 
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image failed to load:", e.currentTarget.src);
    e.currentTarget.style.display = 'none';
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log("Image loaded successfully:", e.currentTarget.src);
  };

  
  if (!mounted) {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-black text-white border-4 border-black p-8 transform -rotate-1 shadow-2xl relative mb-12">
            <div className="absolute -top-4 -left-4 bg-white text-black px-4 py-2 font-black text-lg border-2 border-black">
              PORTFOLIO
            </div>
            <h1 className="text-4xl font-black uppercase pt-4 text-center">
              My Coin Portfolio
            </h1>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black uppercase">Loading...</div>
            <div className="mt-4 text-6xl">⚡</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="bg-black text-white border-4 border-black p-8 transform -rotate-1 shadow-2xl relative mb-12">
          <div className="absolute -top-4 -left-4 bg-white text-black px-4 py-2 font-black text-lg border-2 border-black">
            PORTFOLIO
          </div>
          <h1 className="text-4xl font-black uppercase pt-4 text-center">
            My Coin Portfolio
          </h1>
        </div>

        {/* Wallet Connection Warning */}
        {!isConnected && (
          <div className="bg-white border-4 border-black p-6 transform rotate-1 shadow-xl mb-8 relative">
            <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 font-black text-sm border-2 border-black">
              WARNING
            </div>
            <div className="pt-2 text-center">
              <div className="text-2xl font-black uppercase text-red-600">
                ⚠️ Please connect your wallet
              </div>
            </div>
          </div>
        )}

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {balances.map((b, idx) => (
            <div 
              key={b.coin.address} 
              className={`bg-white border-4 border-black p-6 shadow-2xl relative transform ${
                idx % 3 === 0 ? 'rotate-1' : idx % 3 === 1 ? '-rotate-1' : 'rotate-2'
              } hover:scale-105 transition-transform duration-300`}
            >
              {/* Coin Badge */}
              <div className="absolute -top-4 -left-4 bg-black text-white px-3 py-1 font-black text-sm border-2 border-black">
                HOLDING #{idx + 1}
              </div>

              <div className="pt-6">
                {/* Coin Image with enhanced debugging */}

                {/* Coin Name */}
                <h2 className="text-2xl font-black uppercase mb-4 break-words">
                  {String(b.coin.name)} ({String(b.coin.symbol)})
                </h2>

                {/* Holdings Section */}
                

                {/* Value Section */}
                <div className="bg-black text-white p-4 border-2 border-black mb-4">
                  <div className="text-lg font-black uppercase mb-2">USD Value</div>
                  <div className="text-2xl font-black">
                    ${parseFloat(String(b.valueUsd || "0")).toFixed(2).toLocaleString()}
                  </div>
                </div>

                {/* Market Stats */}
                <div className="bg-white border-2 border-black p-4 mb-4">
                  <div className="text-sm font-black uppercase mb-2 text-gray-600">Market Stats</div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-bold">Market Cap:</span>
                      <span className="font-black">${String(b.coin.marketCap ?? "N/A")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">24h Volume:</span>
                      <span className="font-black">${String(b.coin.volume24h ?? "N/A")}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={`/coins/${b.coin.address}`}
                  className="block w-full text-center py-3 px-6 bg-white text-black border-4 border-black font-black text-lg uppercase hover:bg-black hover:text-white transition-colors transform hover:rotate-1"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8 bg-black text-white border-4 border-black p-8 transform -rotate-1 shadow-xl text-center">
            <div className="text-2xl font-black uppercase">Loading...</div>
            <div className="mt-4 text-6xl">⚡</div>
          </div>
        )}

        {/* Load More Button */}
        {!loading && cursor && (
          <div className="mt-8 text-center">
            <button
              onClick={loadBalances}
              className="px-8 py-4 bg-white text-black border-4 border-black font-black text-xl uppercase hover:bg-black hover:text-white transition-colors transform hover:scale-110 shadow-2xl rotate-1"
            >
              Load More Holdings
            </button>
          </div>
        )}

        {/* Decorative Elements */}
        <div className="fixed top-10 right-10 text-6xl transform rotate-12 animate-pulse">
          💥
        </div>
        <div className="fixed bottom-10 left-10 text-4xl transform -rotate-12 animate-bounce">
          ⚡
        </div>
      </div>
    </div>
  );
}