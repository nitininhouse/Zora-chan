"use client";

import { useState, useEffect } from "react";
import {
  getCoinsTopGainers,
  getCoinsTopVolume24h,
  getCoinsMostValuable,
  getCoinsNew,
  getCoinsLastTraded,
  getCoinsLastTradedUnique
} from "@zoralabs/coins-sdk";


const icons = {
  trendingUp: "📈",
  volume: "💹",
  crown: "👑",
  sparkles: "✨",
  activity: "🔥",
  users: "👥",
  refresh: "🔄",
  up: "⬆️",
  down: "⬇️"
};

interface Coin {
  id: string;
  name: string;
  symbol: string;
  address: string;
  totalSupply: string;
  totalVolume: string;
  volume24h: string;
  createdAt: string;
  creatorAddress: string;
  marketCap: string;
  marketCapDelta24h?: string;
  chainId: number;
  uniqueHolders: number;
}

const fetchCoinsData = async () => {
  const [
    topGainersRes,
    topVolumeRes,
    mostValuableRes,
    newCoinsRes,
    lastTradedRes,
    lastTradedUniqueRes
  ] = await Promise.all([
    getCoinsTopGainers({ count: 10 }),
    getCoinsTopVolume24h({ count: 10 }),
    getCoinsMostValuable({ count: 10 }),
    getCoinsNew({ count: 10 }),
    getCoinsLastTraded({ count: 10 }),
    getCoinsLastTradedUnique({ count: 10 })
  ]);

  const extract = (res: any) =>
    res?.data?.exploreList?.edges?.map((edge: any) => ({
      ...edge.node,
      createdAt: edge.node.createdAt ?? "",
      creatorAddress: edge.node.creatorAddress ?? ""
    })) || [];

  return {
    topGainers: extract(topGainersRes),
    topVolume: extract(topVolumeRes),
    mostValuable: extract(mostValuableRes),
    newCoins: extract(newCoinsRes),
    lastTraded: extract(lastTradedRes),
    lastTradedUnique: extract(lastTradedUniqueRes)
  };
};

function formatCurrency(value: string) {
  const num = parseFloat(value);
  if (isNaN(num)) return "-";
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(2)}K`;
  return num.toFixed(2);
}

function formatDate(dateString: string) {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString();
}

function getDeltaColor(delta?: string) {
  if (!delta) return "#888";
  const num = parseFloat(delta);
  return num >= 0 ? "#22c55e" : "#ef4444";
}

function getDeltaIcon(delta?: string) {
  if (!delta) return "";
  const num = parseFloat(delta);
  return num >= 0 ? icons.up : icons.down;
}

function CoinCard({ coin, showDelta }: { coin: Coin; showDelta?: boolean }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        background: "#fff",
        boxShadow: "0 2px 6px #0001"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{coin.name}</div>
          <div style={{ fontSize: 13, color: "#888" }}>{coin.symbol}</div>
        </div>
        {showDelta && coin.marketCapDelta24h && (
          <div
            style={{
              border: "1px solid #eee",
              borderRadius: 12,
              padding: "2px 8px",
              color: getDeltaColor(coin.marketCapDelta24h),
              fontWeight: 600,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              gap: 4
            }}
          >
            {getDeltaIcon(coin.marketCapDelta24h)}
            {parseFloat(coin.marketCapDelta24h).toFixed(2)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: 14, marginBottom: 6 }}>
        <strong>Market Cap:</strong> {formatCurrency(coin.marketCap)}<br />
        <strong>Volume 24h:</strong> {formatCurrency(coin.volume24h)}<br />
        <strong>Holders:</strong> {coin.uniqueHolders?.toLocaleString()}<br />
        <strong>Created:</strong> {formatDate(coin.createdAt)}<br />
        <strong>Creator:</strong> {coin.creatorAddress}
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <a
          href={`/coin/${coin.address}`}
          style={{
            display: "inline-block",
            padding: "8px 18px",
            borderRadius: 6,
            border: "1px solid #444",
            background: "#f5f5f5",
            color: "#222",
            fontWeight: 600,
            textDecoration: "none"
          }}
        >
          View details
        </a>
      </div>
    </div>
  );
}

function CoinsGrid({ coins, showDelta }: { coins: Coin[]; showDelta?: boolean }) {
  if (!coins.length) {
    return <div style={{ color: "#888", margin: "24px 0" }}>No coins found.</div>;
  }
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
      gap: 20
    }}>
      {coins.map((coin) => (
        <CoinCard key={coin.id} coin={coin} showDelta={showDelta} />
      ))}
    </div>
  );
}

export default function CoinsExplorer() {
  const [tab, setTab] = useState("top-gainers");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setErr(null);
    try {
      const d = await fetchCoinsData();
      setData(d);
    } catch (e: any) {
      setErr(e?.message || "Failed to load coins");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const tabList = [
    { key: "top-gainers", label: `${icons.trendingUp} Top Gainers` },
    { key: "top-volume", label: `${icons.volume} Volume` },
    { key: "most-valuable", label: `${icons.crown} Valuable` },
    { key: "new", label: `${icons.sparkles} New` },
    { key: "last-traded", label: `${icons.activity} Traded` },
    { key: "unique-traders", label: `${icons.users} Unique` }
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>Coins Explorer</div>
          <div style={{ color: "#888", marginTop: 4, fontSize: 15 }}>
            Discover and explore coins across different categories
          </div>
        </div>
        <button
          onClick={fetchAll}
          disabled={loading}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            background: "#eee",
            border: "1px solid #bbb",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer"
          }}
        >
          {icons.refresh} {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div style={{ marginBottom: 24 }}>
        <div style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap"
        }}>
          {tabList.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                padding: "10px 16px",
                borderRadius: 6,
                border: "1.5px solid",
                borderColor: tab === t.key ? "#222" : "#eee",
                background: tab === t.key ? "#fafafa" : "#fff",
                fontWeight: 600,
                color: tab === t.key ? "#222" : "#888",
                cursor: "pointer"
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {err && (
        <div style={{ margin: "24px 0", color: "#e11d48", fontWeight: 600 }}>
          Error loading coins data: {err}
        </div>
      )}
      <div style={{ marginTop: 12 }}>
        {tab === "top-gainers" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.trendingUp} Top Gainers (24h)
            </div>
            <CoinsGrid coins={data?.topGainers || []} showDelta />
          </div>
        )}
        {tab === "top-volume" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.volume} Highest Volume (24h)
            </div>
            <CoinsGrid coins={data?.topVolume || []} />
          </div>
        )}
        {tab === "most-valuable" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.crown} Most Valuable (Market Cap)
            </div>
            <CoinsGrid coins={data?.mostValuable || []} />
          </div>
        )}
        {tab === "new" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.sparkles} Recently Created
            </div>
            <CoinsGrid coins={data?.newCoins || []} />
          </div>
        )}
        {tab === "last-traded" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.activity} Recently Traded
            </div>
            <CoinsGrid coins={data?.lastTraded || []} />
          </div>
        )}
        {tab === "unique-traders" && (
          <div>
            <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 12 }}>
              {icons.users} Recently Traded (Unique Traders)
            </div>
            <CoinsGrid coins={data?.lastTradedUnique || []} />
          </div>
        )}
      </div>
    </div>
  );
}
