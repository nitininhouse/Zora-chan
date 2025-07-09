"use client";
import React, { useState } from "react";
import { tradeCoin } from "@/lib/zora";
import { useWalletClient, usePublicClient } from "wagmi";
import { parseEther, parseUnits } from "viem";

interface CoinTradeProps {
  defaultCoinAddress?: `0x${string}`;
  coinDecimals?: number;
}

const CoinTrade: React.FC<CoinTradeProps> = ({
  defaultCoinAddress = "",
  coinDecimals = 18,
}) => {
  const [coinAddress, setCoinAddress] = useState<string>(defaultCoinAddress);
  const [amount, setAmount] = useState<string>("0.01");
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [isTrading, setIsTrading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const parseToBigInt = (value: string, decimals: number): bigint => {
    try {
      return parseUnits(value, decimals);
    } catch {
      return BigInt(0);
    }
  };

  const handleTrade = async () => {
    if (!walletClient || !publicClient) {
      setError("Please connect your wallet");
      return;
    }
    if (!coinAddress || !coinAddress.startsWith("0x") || coinAddress.length !== 42) {
      setError("Please enter a valid contract address");
      return;
    }
    setIsTrading(true);
    setError(null);
    setTxHash(null);

    try {
      const addresses = await walletClient.getAddresses();
      const recipient = addresses[0];
      const params =
        tradeType === "buy"
          ? {
              direction: "buy" as const,
              target: coinAddress as `0x${string}`,
              args: {
                recipient,
                orderSize: parseEther(amount),
                minAmountOut: BigInt(0),
                tradeReferrer: "0x0000000000000000000000000000000000000000" as `0x${string}`,
              },
            }
          : {
              direction: "sell" as const,
              target: coinAddress as `0x${string}`,
              args: {
                recipient,
                orderSize: parseToBigInt(amount, coinDecimals),
                minAmountOut: BigInt(0),
                tradeReferrer: "0x0000000000000000000000000000000000000000" as `0x${string}`,
              },
            };

      const result = await tradeCoin(params, walletClient, publicClient);
      setTxHash(result.hash);
    } catch (e: any) {
      setError(e?.message || "Trade failed");
    } finally {
      setIsTrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-8">
      <div className="max-w-2xl mx-auto">
       
        <div className="bg-white border-4 border-black p-8 transform -rotate-1 shadow-2xl relative">
          
          <div className="absolute -top-4 -left-4 bg-red-500 text-white px-4 py-2 font-black text-lg border-2 border-black">
            TRADE COIN
          </div>
  
          <div className="pt-8 space-y-8">
            {/* Title */}
            <h2 className="text-3xl font-black uppercase text-center bg-yellow-300 border-4 border-black p-4 transform rotate-1 shadow-lg">
              Character Coin Trading
            </h2>
  
           
            <div className="bg-blue-100 border-4 border-black p-6 transform rotate-1 shadow-lg">
              <div className="absolute -top-3 -left-3 bg-blue-500 text-white px-3 py-1 font-black text-sm border-2 border-black">
                CONTRACT
              </div>
              <label className="block text-lg font-black mb-4 uppercase pt-2">
                Coin Contract Address
              </label>
              <input
                type="text"
                value={coinAddress}
                onChange={(e) => setCoinAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>
  
           
            <div className="bg-green-100 border-4 border-black p-6 transform -rotate-1 shadow-lg relative">
              <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 font-black text-sm border-2 border-black">
                AMOUNT
              </div>
              <label className="block text-lg font-black mb-4 uppercase pt-2">
                Amount ({tradeType === "buy" ? "ETH" : "Coin"})
              </label>
              <input
                type="number"
                step="0.001"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={tradeType === "buy" ? "ETH to spend" : "Coin to sell"}
                className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
              />
            </div>
  
            
            <div className="bg-purple-100 border-4 border-black p-6 transform rotate-1 shadow-lg relative">
              <div className="absolute -top-3 -left-3 bg-purple-500 text-white px-3 py-1 font-black text-sm border-2 border-black">
                ACTION
              </div>
              <div className="pt-4 grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTradeType("buy")}
                  className={`py-4 px-6 font-black text-xl uppercase border-4 border-black transition-all transform hover:scale-105 ${
                    tradeType === "buy"
                      ? "bg-green-500 text-white shadow-lg rotate-2"
                      : "bg-white text-black hover:bg-green-100"
                  }`}
                >
                  🚀 Buy
                </button>
                <button
                  type="button"
                  onClick={() => setTradeType("sell")}
                  className={`py-4 px-6 font-black text-xl uppercase border-4 border-black transition-all transform hover:scale-105 ${
                    tradeType === "sell"
                      ? "bg-red-500 text-white shadow-lg -rotate-2"
                      : "bg-white text-black hover:bg-red-100"
                  }`}
                >
                  💸 Sell
                </button>
              </div>
            </div>
  
            {/* Execute Trade Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleTrade}
                disabled={isTrading}
                className={`px-12 py-6 font-black text-2xl uppercase border-4 border-black transition-all transform hover:scale-110 shadow-2xl ${
                  isTrading
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : tradeType === "buy"
                    ? "bg-yellow-400 text-black hover:bg-yellow-500 rotate-1"
                    : "bg-orange-400 text-black hover:bg-orange-500 -rotate-1"
                }`}
              >
                {isTrading
                  ? tradeType === "buy"
                    ? "⚡ Buying..."
                    : "⚡ Selling..."
                  : tradeType === "buy"
                  ? "🎯 Execute Buy"
                  : "🎯 Execute Sell"}
              </button>
            </div>
          </div>
        </div>
  
        {/* Status Messages */}
        {error && (
          <div className="mt-8 bg-red-100 border-4 border-red-500 p-6 transform rotate-1 shadow-lg relative">
            <div className="absolute -top-3 -left-3 bg-red-500 text-white px-3 py-1 font-black text-sm border-2 border-black">
              ERROR
            </div>
            <p className="text-red-800 font-bold text-lg pt-2">⚠️ {error}</p>
          </div>
        )}
  
        {txHash && (
          <div className="mt-8 bg-green-100 border-4 border-green-500 p-6 transform -rotate-1 shadow-lg relative">
            <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 font-black text-sm border-2 border-black">
              SUCCESS
            </div>
            <div className="pt-2">
              <p className="text-green-800 font-bold text-lg mb-2">✅ Transaction Complete!</p>
              <p className="text-green-700 font-bold break-all">
                Tx Hash:{" "}
                <a
                  href={`https://basescan.org/tx/${txHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:bg-yellow-200 px-1 py-1 border-2 border-black inline-block transform hover:rotate-1 transition-all"
                >
                  {txHash}
                </a>
              </p>
            </div>
          </div>
        )}
  
        
        <div className="fixed top-10 right-10 text-6xl transform rotate-12 animate-pulse">
          💥
        </div>
        <div className="fixed bottom-10 left-10 text-4xl transform -rotate-12 animate-bounce">
          ⚡
        </div>
      </div>
    </div>
  );
};


export default function TradePage() {
  return <CoinTrade />;
}