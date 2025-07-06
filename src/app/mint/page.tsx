"use client"
import React, { useState, useRef } from 'react';
import { Upload, X, Plus, Zap, Star, Award, Heart, Shield, Sword, Eye, Sparkles } from 'lucide-react';
import { createCoin, DeployCurrency } from "@/lib/zora";
import { parseEther } from "viem";
import { useWalletClient, usePublicClient } from "wagmi";
import { base } from "viem/chains"; 
import type { Link } from "@/types/Link"; 
import type { Stat } from "@/types/Stat";
import type { FormData } from "@/types/FormData";
import type { Errors } from '@/types/Errors';
import { uploadToIPFS } from "@/utils/pinata/upload"; 
import MintHeader from '@/components/mint/MintHeader';
import TitlePanel from '@/components/mint/TitlePanel';
import Footer from '@/components/mint/Footer';

const MangaCharacterMint: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    symbol: '',
    description: '',
    storyArc: '',
    stats: [],
    links: [],
    payoutRecipient: '',
    platformReferrer: '',
    initialPurchaseAmount: '0.01'
  });
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [artwork, setArtwork] = useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [mintedTokenData, setMintedTokenData] = useState<{
    imageHash: string;
    metadataHash: string;
    metadataUri: string;
    coinAddress?: `0x${string}`;
    transactionHash?: `0x${string}`;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const statIcons: { [key: string]: React.ComponentType<{ size?: number }> } = {
    'Power Level': Zap,
    'Special Ability': Star,
    'Rank': Award,
    'Popularity': Heart,
    'Defense': Shield,
    'Attack': Sword,
    'Vision': Eye,
    'Magic': Sparkles
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        setErrors(prev => ({
          ...prev,
          artwork: 'File size must be less than 10MB'
        }));
        return;
      }
      setArtwork(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setArtworkPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (errors.artwork) {
        setErrors(prev => ({
          ...prev,
          artwork: null
        }));
      }
    }
  };


  const createCustomMetadata = async (): Promise<string> => {
    if (!artwork) throw new Error("Artwork is required");
    const imageUrl = await uploadToIPFS(artwork);
    const linksObject: Record<string, string> = {};
    formData.links.forEach(link => {
      if (link.platform && link.url) {
        linksObject[link.platform] = link.url;
      }
    });

    const metadata = {
      name: formData.name,
      symbol: formData.symbol,
      description: formData.description,
      image: imageUrl,
      type: "manga-character",
      links: linksObject,
      attributes: [
        {
          trait_type: "Asset Type",
          value: "Manga Character"
        },
        {
          trait_type: "Links Count",
          value: Object.keys(linksObject).length
        },
        ...formData.stats.map(stat => ({
          trait_type: stat.name,
          value: stat.value
        })),
        ...(formData.storyArc ? [{
          trait_type: 'Story Arc',
          value: formData.storyArc
        }] : []),
        {
          trait_type: 'Created',
          value: new Date().toISOString()
        }
      ],
      collection: {
        name: 'Manga Character Coins',
        description: 'Tradeable character coins from the manga universe'
      }
    };

    const metadataBlob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: 'application/json'
    });
    const metadataFile = new File([metadataBlob], 'metadata.json', {
      type: 'application/json'
    });

    const metadataUrl = await uploadToIPFS(metadataFile);
    return metadataUrl;
  };

  const addStat = (): void => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { name: '', value: '' }]
    }));
  };

  const updateStat = (index: number, field: keyof Stat, value: string): void => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    }));
  };

  const removeStat = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const addLink = (): void => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { platform: '', url: '' }]
    }));
  };

  const updateLink = (index: number, field: keyof Link, value: string): void => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      )
    }));
  };

  const removeLink = (index: number): void => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Character name is required';
    }

    if (!formData.symbol.trim()) {
      newErrors.symbol = 'Symbol is required';
    } else if (!/^[A-Z]{3,6}$/.test(formData.symbol)) {
      newErrors.symbol = 'Symbol must be 3-6 uppercase letters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Character description is required';
    }

    if (!formData.payoutRecipient.trim()) {
      newErrors.payoutRecipient = 'Payout recipient address is required';
    }

    if (!artwork) {
      newErrors.artwork = 'Character artwork is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleMint = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    if (!walletClient || !publicClient) {
      setErrors(prev => ({
        ...prev,
        general: "Please connect your wallet before minting."
      }));
      setIsUploading(false);
      return;
    }

    try {
      // Upload metadata to IPFS (your function)
      const metadataUri = await createCustomMetadata();

      // Prepare coin parameters for Zora SDK
      const coinParams = {
        name: formData.name,
        symbol: formData.symbol,
        uri: metadataUri,
        payoutRecipient: formData.payoutRecipient as `0x${string}`,
        chainId: base.id,
        currency: DeployCurrency.ETH, // Use .ETH for Base, .ZORA for Zora chain
        version: "v4",
        initialPurchaseWei: parseEther(formData.initialPurchaseAmount || "0.01"),
      };

      const { address: coinAddress, hash: transactionHash } = await createCoin(
        coinParams,
        walletClient,
        publicClient
      );

      setMintedTokenData({
        imageHash: artwork?.name || 'artwork',
        metadataHash: metadataUri.split('/').pop() || 'metadata',
        metadataUri,
        coinAddress,
        transactionHash,
      });

      setShowSuccess(true);
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : 'Minting failed. Please try again.'
      }));
    } finally {
      setIsUploading(false);
    }
  };



  const resetForm = (): void => {
    setFormData({
      name: '',
      symbol: '',
      description: '',
      storyArc: '',
      stats: [],
      links: [],
      payoutRecipient: '',
      platformReferrer: '',
      initialPurchaseAmount: '0.01'
    });
    setArtwork(null);
    setArtworkPreview(null);
    setShowSuccess(false);
    setMintedTokenData(null);

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* Header */}
      <MintHeader />
      {/* Error Display */}
      {errors.general && (
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="bg-red-100 border-4 border-red-500 p-4">
            <p className="text-red-700 font-bold">{errors.general}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title Panel */}
            <TitlePanel/>
            {/* Basic Info Panel */}
            <div className="bg-white border-4 border-black p-6 transform rotate-1 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-red-500 text-white px-3 py-1 font-black text-sm">
                BASIC INFO
              </div>

              <div className="pt-4 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-lg font-black mb-2 uppercase">Character Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 border-4 ${errors.name ? 'border-red-500' : 'border-black'} font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300`}
                      placeholder="e.g., Miyu Sakura"
                    />
                    {errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-lg font-black mb-2 uppercase">Symbol (Ticker)</label>
                    <input
                      type="text"
                      value={formData.symbol}
                      onChange={(e) => handleInputChange('symbol', e.target.value.toUpperCase())}
                      className={`w-full px-4 py-3 border-4 ${errors.symbol ? 'border-red-500' : 'border-black'} font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300`}
                      placeholder="e.g., MIYU"
                      maxLength={6}
                    />
                    {errors.symbol && <p className="text-red-500 text-sm font-bold mt-1">{errors.symbol}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-black mb-2 uppercase">Character Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className={`w-full px-4 py-3 border-4 ${errors.description ? 'border-red-500' : 'border-black'} font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 h-32`}
                    placeholder="Tell us about your character's background, personality, and role in the manga..."
                  />
                  {errors.description && <p className="text-red-500 text-sm font-bold mt-1">{errors.description}</p>}
                </div>
              </div>
            </div>

            {/* Zora Configuration Panel */}
            <div className="bg-white border-4 border-black p-6 transform -rotate-1 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-orange-500 text-white px-3 py-1 font-black text-sm">
                ZORA CONFIG
              </div>

              <div className="pt-4 space-y-6">
                <div>
                  <label className="block text-lg font-black mb-2 uppercase">Payout Recipient Address</label>
                  <input
                    type="text"
                    value={formData.payoutRecipient}
                    onChange={(e) => handleInputChange('payoutRecipient', e.target.value)}
                    className={`w-full px-4 py-3 border-4 ${errors.payoutRecipient ? 'border-red-500' : 'border-black'} font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300`}
                    placeholder="0x..."
                  />
                  {errors.payoutRecipient && <p className="text-red-500 text-sm font-bold mt-1">{errors.payoutRecipient}</p>}
                </div>

                <div>
                  <label className="block text-lg font-black mb-2 uppercase">Platform Referrer (Optional)</label>
                  <input
                    type="text"
                    value={formData.platformReferrer}
                    onChange={(e) => handleInputChange('platformReferrer', e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    placeholder="0x... (optional)"
                  />
                </div>

                <div>
                  <label className="block text-lg font-black mb-2 uppercase">Initial Purchase Amount (ETH)</label>
                  <input
                    type="number"
                    step="0.001"
                    value={formData.initialPurchaseAmount}
                    onChange={(e) => handleInputChange('initialPurchaseAmount', e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    placeholder="0.01"
                  />
                </div>
              </div>
            </div>

            {/* Artwork Panel */}
            <div className="bg-white border-4 border-black p-6 transform rotate-1 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-blue-500 text-white px-3 py-1 font-black text-sm">
                ARTWORK
              </div>

              <div className="pt-4">
                <label className="block text-lg font-black mb-4 uppercase">Character Artwork</label>

                <div
                  className={`border-4 ${errors.artwork ? 'border-red-500' : 'border-black'} border-dashed p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {artworkPreview ? (
                    <div className="relative">
                      <img
                        src={artworkPreview}
                        alt="Character artwork preview"
                        className="mx-auto max-h-64 border-4 border-black shadow-xl"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setArtwork(null);
                          setArtworkPreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full border-2 border-black hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload size={48} className="mx-auto text-gray-400" />
                      <div>
                        <p className="text-lg font-black">DROP YOUR CHARACTER ART HERE</p>
                        <p className="text-sm text-gray-600 font-bold">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {errors.artwork && <p className="text-red-500 text-sm font-bold mt-1">{errors.artwork}</p>}
              </div>
            </div>

            {/* Stats Panel */}
            <div className="bg-white border-4 border-black p-6 transform -rotate-1 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-green-500 text-white px-3 py-1 font-black text-sm">
                STATS
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-between mb-4">
                  <label className="text-lg font-black uppercase">Character Stats (Optional)</label>
                  <button
                    onClick={addStat}
                    className="bg-green-500 text-white px-4 py-2 border-2 border-black font-black text-sm hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>ADD STAT</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.stats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <select
                        value={stat.name}
                        onChange={(e) => updateStat(index, 'name', e.target.value)}
                        className="px-4 py-2 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300"
                      >
                        <option value="">Select Stat</option>
                        {Object.keys(statIcons).map(statName => (
                          <option key={statName} value={statName}>{statName}</option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => updateStat(index, 'value', e.target.value)}
                        className="flex-1 px-4 py-2 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300"
                        placeholder="Value"
                      />

                      <button
                        onClick={() => removeStat(index)}
                        className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info Panel */}
            <div className="bg-white border-4 border-black p-6 transform rotate-1 shadow-xl">
              <div className="absolute -top-4 -left-4 bg-purple-500 text-white px-3 py-1 font-black text-sm">
                EXTRA INFO
              </div>

              <div className="pt-4 space-y-6">
                <div>
                  <label className="block text-lg font-black mb-2 uppercase">Story Arc / First Appearance</label>
                  <input
                    type="text"
                    value={formData.storyArc}
                    onChange={(e) => handleInputChange('storyArc', e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black font-bold text-lg focus:outline-none focus:ring-4 focus:ring-yellow-300"
                    placeholder="e.g., Chapter 1: The Beginning"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="text-lg font-black uppercase">Social Links</label>
                    <button
                      onClick={addLink}
                      className="bg-purple-500 text-white px-4 py-2 border-2 border-black font-black text-sm hover:bg-purple-600 transition-colors flex items-center space-x-2"
                    >
                      <Plus size={16} />
                      <span>ADD LINK</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.links.map((link, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <select
                          value={link.platform}
                          onChange={(e) => updateLink(index, 'platform', e.target.value)}
                          className="px-4 py-2 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300"
                        >
                          <option value="">Platform</option>
                          <option value="Twitter">Twitter</option>
                          <option value="Discord">Discord</option>
                          <option value="Website">Website</option>
                          <option value="Portfolio">Portfolio</option>
                        </select>

                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateLink(index, 'url', e.target.value)}
                          className="flex-1 px-4 py-2 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300"
                          placeholder="URL"
                        />

                        <button
                          onClick={() => removeLink(index)}
                          className="bg-red-500 text-white p-2 border-2 border-black hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Preview Card */}
              <div className="bg-white border-4 border-black p-6 transform rotate-2 shadow-2xl">
                <div className="absolute -top-4 -left-4 bg-yellow-500 text-white px-3 py-1 font-black text-sm">
                  PREVIEW
                </div>

                <div className="pt-4">
                  <div className="bg-gray-100 border-4 border-black p-6 mb-6">
                    {artworkPreview ? (
                      <img
                        src={artworkPreview}
                        alt="Character preview"
                        className="w-full h-48 object-cover border-2 border-black"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 border-2 border-black flex items-center justify-center">
                        <span className="text-gray-500 font-bold">NO ARTWORK</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-black uppercase">
                        {formData.name || 'Character Name'}
                      </h3>
                      <div className="text-lg font-bold text-gray-600">
                        ${formData.symbol || 'SYMBOL'}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-800">
                      {formData.description || 'Character description will appear here...'}
                    </p>

                    {formData.stats.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-lg font-black uppercase">Stats</h4>
                        {formData.stats.map((stat, index) => {
                          const IconComponent = statIcons[stat.name] || Star;
                          return (
                            <div key={index} className="flex items-center space-x-2">
                              <IconComponent size={16} />
                              <span className="text-sm font-bold">{stat.name}: {stat.value}</span>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {formData.storyArc && (
                      <div>
                        <h4 className="text-lg font-black uppercase">Story Arc</h4>
                        <p className="text-sm font-medium text-gray-600">{formData.storyArc}</p>
                      </div>
                    )}

                    {formData.links.length > 0 && (
                      <div>
                        <h4 className="text-lg font-black uppercase">Links</h4>
                        <div className="space-y-1">
                          {formData.links.map((link, index) => (
                            <div key={index} className="text-sm font-medium text-blue-600">
                              {link.platform}: {link.url ? link.url.substring(0, 30) + '...' : 'URL'}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white border-4 border-black p-6 transform -rotate-1 shadow-xl">
                <div className="absolute -top-4 -left-4 bg-red-500 text-white px-3 py-1 font-black text-sm">
                  ACTIONS
                </div>

                <div className="pt-4 space-y-4">
                  {!showSuccess ? (
                    <button onClick={handleMint} disabled={isUploading} className="...">
                      {isUploading ? 'MINTING...' : 'MINT CHARACTER COIN'}
                    </button>
                  ) : (
                    <button onClick={resetForm} className="...">
                      CREATE ANOTHER
                    </button>
                  )}
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-600">
                      Initial Purchase: {formData.initialPurchaseAmount} ETH
                    </p>
                    <p className="text-xs text-gray-500">
                      Deployed on Base via Zora
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && mintedTokenData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-8 border-black p-8 max-w-md w-full transform rotate-1 shadow-2xl">
            <div className="absolute -top-6 -left-6 bg-green-500 text-white px-4 py-2 font-black text-lg">
              SUCCESS!
            </div>

            <div className="pt-4 text-center space-y-4">
              <div className="text-6xl">🎉</div>
              <h3 className="text-2xl font-black uppercase">Coin Prepared!</h3>
              <p className="text-lg font-bold">
                Your {formData.name} character coin is ready to deploy!
              </p>

              <div className="bg-gray-100 border-4 border-black p-4 text-left">
                <div className="space-y-2 text-sm font-mono">
                  <p><strong>Coin Address:</strong> {mintedTokenData.coinAddress}</p>
                  <p><strong>Tx Hash:</strong> {mintedTokenData.transactionHash}</p>
                  <p><strong>Metadata URI:</strong> {mintedTokenData.metadataUri}</p>
                  
                </div>
              </div>

              <div className="flex space-x-4">



                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-3 font-black text-lg bg-gray-200 border-4 border-black hover:bg-gray-300 transition-colors"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isUploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white border-8 border-black p-8 text-center transform rotate-2 shadow-2xl">
            <div className="absolute -top-6 -left-6 bg-blue-500 text-white px-4 py-2 font-black text-lg">
              PROCESSING
            </div>
            <div className="pt-4">
              <div className="text-6xl animate-spin">⚡</div>
              <p className="text-2xl font-black mt-4">MINTING YOUR CHARACTER...</p>
              <p className="text-lg text-gray-600 font-bold">Processing blockchain transaction</p>
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <Footer/>
    </div>
  );
};
export default MangaCharacterMint;