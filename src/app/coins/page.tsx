"use client";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getCoin } from "@zoralabs/coins-sdk";
import { base, baseSepolia } from "viem/chains";


const registryAbi = [
  "function getAllCoins() view returns (address[])"
];

const registryAddresses: { [chainId: number]: string } = {
  8453: "0x5e441621808217AcAEeb41E780a59abF9a855206",      
  84532: "0xEa55482C44Ced3f082Ab335fbBF4BcB179963f3c",     
};


const rpcUrls: { [chainId: number]: string } = {
  8453: "https://mainnet.base.org",
  84532: "https://sepolia.base.org",
};


const chainConfigs: { [chainId: number]: { id: number } } = {
  8453: base,
  84532: baseSepolia,
};

export default function MyPlatformCoins() {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [chainId, setChainId] = useState<number>(8453); 

 
  const handleNetworkChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChainId(Number(e.target.value));
  };

  useEffect(() => {
    const fetchCoins = async () => {
      setLoading(true);
      try {
        const registryAddress = registryAddresses[chainId];
        const rpcUrl = rpcUrls[chainId];
        const chainConfig = chainConfigs[chainId];
        if (!registryAddress || !rpcUrl || !chainConfig) {
          setCoins([]);
          setLoading(false);
          return;
        }

        
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const registry = new ethers.Contract(registryAddress, registryAbi, provider);
        const addresses: string[] = await registry.getAllCoins();

        
        const coinData = await Promise.all(
          addresses.map(async (address) => {
            const resp = await getCoin({ address, chain: chainConfig.id });
            return resp.data?.zora20Token
              ? { ...resp.data.zora20Token, address }
              : { address };
          })
        );
        setCoins(coinData);
      } catch (e) {
        setCoins([]);
      }
      setLoading(false);
    };
    fetchCoins();
  }, [chainId]);

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-black text-white border-4 border-black p-8 transform -rotate-1 shadow-2xl relative mb-12">
          <div className="absolute -top-4 -left-4 bg-white text-black px-4 py-2 font-black text-lg border-2 border-black">
            ZORA-CHAN
          </div>
          <h1 className="text-4xl font-black uppercase pt-4 text-center">
            Coins Minted on Zora-chan
          </h1>
        </div>
  
        {/* Network Selection */}
        <div className="bg-white border-4 border-black p-6 transform rotate-1 shadow-xl mb-8 relative">
          <div className="absolute -top-3 -right-3 bg-black text-white px-3 py-1 font-black text-sm border-2 border-black">
            NETWORK
          </div>
          <div className="pt-2">
            <label className="block text-lg font-black mb-4 uppercase">Select Network:</label>
            <select 
              value={chainId} 
              onChange={handleNetworkChange} 
              className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none bg-white"
            >
              <option value={8453}>Base Mainnet</option>
              <option value={84532}>Base Sepolia (Testnet)</option>
            </select>
          </div>
        </div>
  
        {/* Loading State */}
        {loading && (
          <div className="bg-black text-white border-4 border-black p-8 transform -rotate-1 shadow-xl text-center">
            <div className="text-2xl font-black uppercase">Loading...</div>
            <div className="mt-4 text-6xl">⚡</div>
          </div>
        )}
  
        {/* No Coins State */}
        {!loading && coins.length === 0 && (
          <div className="bg-white border-4 border-black p-8 transform rotate-1 shadow-xl text-center relative">
            <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 font-black text-lg border-2 border-black">
              EMPTY
            </div>
            <div className="pt-4 text-xl font-bold text-gray-600">No coins registered yet.</div>
            <div className="mt-4 text-4xl">💭</div>
          </div>
        )}
  
        {/* Coins Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coins.map((coin, idx) => (
            <div 
              key={coin.address || idx} 
              className={`bg-white border-4 border-black p-6 shadow-2xl relative transform ${
                idx % 3 === 0 ? 'rotate-1' : idx % 3 === 1 ? '-rotate-1' : 'rotate-2'
              } hover:scale-105 transition-transform duration-300`}
            >
              {/* Coin Badge */}
              <div className="absolute -top-4 -left-4 bg-black text-white px-3 py-1 font-black text-sm border-2 border-black">
                COIN #{idx + 1}
              </div>
  
              <div className="pt-6">
                {/* Coin Name */}
                <h3 className="text-2xl font-black uppercase mb-2 break-words">
                  {coin.name || "Unknown Coin"}
                  {coin.symbol ? ` (${coin.symbol})` : ""}
                </h3>
  
                {/* Address */}
                <div className="bg-gray-100 border-2 border-black p-2 mb-4">
                  <div className="text-xs font-bold text-gray-600 uppercase mb-1">Address:</div>
                  <div className="text-xs font-mono break-all">{coin.address}</div>
                </div>
  
               
                {/* Stats */}
                <div className="bg-black text-white p-4 border-2 border-black mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Market Cap:</span>
                      <span className="font-black">{coin.marketCap ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">24h Volume:</span>
                      <span className="font-black">{coin.volume24h ?? "N/A"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold">Total Supply:</span>
                      <span className="font-black">{coin.totalSupply ?? "N/A"}</span>
                    </div>
                  </div>
                </div>
  
                
                <a
                  href={`/coin/${coin.address}`}
                  className="block w-full text-center py-3 px-6 bg-white text-black border-4 border-black font-black text-lg uppercase hover:bg-black hover:text-white transition-colors transform hover:rotate-1"
                >
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
  
        
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
