"use client"
import React, { useState, useEffect } from 'react';
import { Star, Zap, Trophy, Users, ArrowRight, Sparkles, Heart } from 'lucide-react';

const ZoraChanLanding = () => {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [isReading, setIsReading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPanel((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <div className="relative">
        
        {/* Hero Section - Enhanced Manga Style */}
        <div className="min-h-screen bg-white relative overflow-hidden">
          
          {/* Manga Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, black 2px, transparent 2px),
                radial-gradient(circle at 80% 80%, black 1px, transparent 1px),
                radial-gradient(circle at 40% 60%, black 1.5px, transparent 1.5px)
              `,
              backgroundSize: '60px 60px, 40px 40px, 80px 80px'
            }} />
          </div>
          
          {/* Speed Lines */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-black opacity-20"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${i % 2 === 0 ? '3px' : '2px'}`,
                  height: `${150 + i * 25}px`,
                  transformOrigin: 'center bottom',
                  transform: `translate(-50%, -50%) rotate(${i * 9}deg)`,
                  animation: 'none'
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
            <div className="text-center">
              
              {/* Logo Integration */}
              <div className="relative mb-8">
                <div className="bg-white border-8 border-black p-4 transform rotate-3 shadow-2xl mx-auto w-fit">
                  <img 
                    src="/logo.png" 
                    alt="ZoraChan Logo" 
                    className="w-32 h-32 object-contain mx-auto"
                    
                  />
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-black text-2xl hidden">
                    ZC
                  </div>
                </div>
                
                {/* Manga Sound Effects around Logo */}
                <div className="absolute -top-6 -right-6 bg-yellow-300 border-4 border-black px-4 py-2 font-black text-lg transform rotate-12 shadow-xl">
                  BOOM!
                </div>
                <div className="absolute -bottom-4 -left-8 bg-red-400 border-4 border-black px-3 py-1 font-black text-sm transform -rotate-12 shadow-xl">
                  NEW!
                </div>
              </div>

              {/* Enhanced Title Panel - FIXED FLICKERING */}
              <div className="relative mb-12 bg-white border-8 border-black p-12 transform -rotate-1 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
                <div className="absolute -top-6 -left-6 bg-black text-white px-6 py-3 font-black text-2xl transform rotate-3">
                  CHAPTER 1
                </div>
                
                {/* Manga Action Lines behind title */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-black opacity-5"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: '4px',
                        height: '200px',
                        transformOrigin: 'center',
                        transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
                      }}
                    />
                  ))}
                </div>
                
                <h1 className="relative text-8xl md:text-9xl font-black mb-4 leading-none">
                  <span 
                    className="block relative"
                    style={{
                      fontFamily: 'Impact, "Franklin Gothic Bold", "Arial Black", sans-serif',
                      textShadow: '8px 8px 0px #000, 4px 4px 0px #ff6b6b',
                      WebkitTextStroke: '4px #000',
                      color: 'white',
                      filter: 'drop-shadow(2px 2px 0px #ff6b6b)'
                    }}
                  >
                    ZORA
                  </span>
                  <span 
                    className="block -mt-6 relative"
                    style={{
                      fontFamily: 'Impact, "Franklin Gothic Bold", "Arial Black", sans-serif',
                      textShadow: '8px 8px 0px #000, 4px 4px 0px #4ecdc4',
                      WebkitTextStroke: '4px #000',
                      color: 'white',
                      filter: 'drop-shadow(2px 2px 0px #4ecdc4)'
                    }}
                  >
                    CHAN
                  </span>
                </h1>
                
                <div className="text-3xl font-black uppercase tracking-widest text-gray-800 mb-4">
                  THE MANGA REVOLUTION
                </div>
                
                <div className="text-xl font-bold text-gray-600">
                  マンガの革命が始まる！
                </div>
              </div>

              {/* Enhanced Speech Bubble */}
              <div className="relative mb-12 mx-auto w-fit">
                <div className="bg-white border-6 border-black px-16 py-8 relative font-black text-3xl shadow-2xl transform rotate-1">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-orange-100 opacity-50" />
                  <div className="relative">
                    "LET'S BEGIN THE STORY!"
                    <div className="text-lg mt-2 text-gray-600">物語を始めよう!</div>
                  </div>
                  
                  {/* Enhanced Speech Bubble Tail */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-12 border-r-12 border-t-20 border-transparent border-t-black"></div>
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-white absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <button 
                  className="relative bg-gradient-to-r from-red-500 to-red-600 text-white px-16 py-8 border-6 border-black font-black text-3xl uppercase transform hover:scale-110 transition-all duration-300 shadow-2xl"
                  style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                  onClick={() => setIsReading(true)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-50" />
                  <div className="relative">
                    READ NOW!
                    <div className="text-lg">読む！</div>
                  </div>
                  
                  {/* Explosion Effect */}
                  <div className="absolute -top-4 -right-4 bg-yellow-400 text-black px-4 py-2 text-lg font-black border-4 border-black transform rotate-12">
                    BAM!
                  </div>
                </button>
                
                <button className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white px-12 py-6 border-6 border-black font-black text-2xl uppercase transform hover:scale-110 transition-all duration-300 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-50" />
                  <div className="relative">
                    CONNECT WALLET
                    <div className="text-sm">ウォレット接続</div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Corner Effects */}
          <div className="absolute top-8 right-8 text-8xl font-black transform rotate-12 opacity-20">
            ⚡
          </div>
          <div className="absolute bottom-8 left-8 text-6xl font-black transform -rotate-12 opacity-20">
            POW!
          </div>
          <div className="absolute top-1/3 left-8 text-4xl font-black transform rotate-45 opacity-15">
            BOOM!
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-8 border-t-8 border-black">
          <div className="max-w-7xl mx-auto">
            
            {/* Enhanced Section Header */}
            <div className="text-center mb-20">
              <div className="relative bg-white border-8 border-black p-12 transform rotate-2 shadow-2xl mx-auto w-fit">
                <div className="absolute -top-6 -left-6 bg-red-500 text-white px-6 py-3 font-black text-xl transform -rotate-3">
                  FEATURES
                </div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `repeating-linear-gradient(
                      45deg,
                      black,
                      black 2px,
                      transparent 2px,
                      transparent 20px
                    )`
                  }} />
                </div>
                
                <h2 className="relative text-6xl md:text-7xl font-black uppercase mb-4">
                  <span 
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      textShadow: '6px 6px 0px #000, 3px 3px 0px #ff6b6b',
                      WebkitTextStroke: '3px #000',
                      color: 'white'
                    }}
                  >
                    FEATURES
                  </span>
                </h2>
                <div className="text-2xl font-black text-gray-700">機能</div>
              </div>
            </div>

            {/* Enhanced Panel Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  title: "CHARACTER TRADING",
                  japanese: "キャラクター取引",
                  desc: "Trade character stocks! Watch your portfolio grow as characters gain popularity in the story!",
                  effect: "TRADE!",
                  panel: "01",
                  color: "from-green-400 to-green-500"
                },
                {
                  title: "STORY VOTING",
                  japanese: "ストーリー投票",
                  desc: "Vote on plot twists and character development! Your choices shape the manga world!",
                  effect: "VOTE!",
                  panel: "02",
                  color: "from-blue-400 to-blue-500"
                },
                {
                  title: "LIVE EVOLUTION",
                  japanese: "リアルタイム進化",
                  desc: "Characters evolve based on community actions! Witness real-time changes!",
                  effect: "EVOLVE!",
                  panel: "03",
                  color: "from-purple-400 to-purple-500"
                },
                {
                  title: "BATTLE EVENTS",
                  japanese: "バトルイベント",
                  desc: "Epic crossover battles between different manga series! Who will emerge victorious?",
                  effect: "FIGHT!",
                  panel: "04",
                  color: "from-red-400 to-red-500"
                },
                {
                  title: "SECRET CHAPTERS",
                  japanese: "秘密の章",
                  desc: "Unlock hidden storylines and exclusive content! Discover the deepest manga lore!",
                  effect: "UNLOCK!",
                  panel: "05",
                  color: "from-yellow-400 to-yellow-500"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`relative bg-white border-6 border-black p-8 transform ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'} hover:rotate-0 transition-all duration-300 shadow-2xl`}
                >
                  {/* Panel Number */}
                  <div className="absolute -top-6 -left-6 bg-black text-white px-4 py-2 font-black text-xl transform rotate-3">
                    {feature.panel}
                  </div>
                  
                  {/* Enhanced Sound Effect */}
                  <div className={`absolute -top-4 -right-4 bg-gradient-to-r ${feature.color} border-4 border-black px-4 py-2 font-black text-lg transform rotate-12 shadow-xl`}>
                    {feature.effect}
                  </div>
                  
                  {/* Manga Screen Tone Effect */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
                      backgroundSize: '6px 6px'
                    }} />
                  </div>
                  
                  <div className="pt-6 relative">
                    <h3 className="text-2xl font-black mb-3 text-gray-800" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                      {feature.title}
                    </h3>
                    <div className="text-lg text-gray-600 mb-4 font-bold uppercase">{feature.japanese}</div>
                    <p className="text-gray-800 font-medium leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Community Section */}
        <div className="bg-white py-20 px-8 border-t-8 border-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              
              {/* Main Community Panel */}
              <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-blue-50 border-8 border-black p-12 transform -rotate-1 shadow-2xl relative">
                <div className="absolute -top-6 -left-6 bg-purple-500 text-white px-6 py-3 font-black text-2xl transform rotate-3">
                  GUILD
                </div>
                
                {/* Background manga pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      repeating-linear-gradient(
                        0deg,
                        black,
                        black 1px,
                        transparent 1px,
                        transparent 15px
                      ),
                      repeating-linear-gradient(
                        90deg,
                        black,
                        black 1px,
                        transparent 1px,
                        transparent 15px
                      )
                    `
                  }} />
                </div>
                
                <h2 className="relative text-5xl md:text-6xl font-black mb-8 uppercase">
                  <span 
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      textShadow: '4px 4px 0px #000, 2px 2px 0px #8b5cf6',
                      WebkitTextStroke: '2px #000',
                      color: 'white'
                    }}
                  >
                    JOIN THE COMMUNITY
                  </span>
                </h2>
                
                <div className="text-2xl text-gray-600 mb-8 font-bold">コミュニティ参加</div>
                
                <p className="text-xl font-medium mb-10 leading-relaxed text-gray-800">
                  Connect with fellow manga enthusiasts! Share theories, create fan art, and participate in epic storyline discussions. The manga revolution needs you!
                </p>
                
                <div className="flex flex-wrap gap-6">
                  <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-10 py-6 border-6 border-black font-black text-2xl uppercase transform hover:scale-105 transition-all duration-300 shadow-xl">
                    JOIN NOW
                  </button>
                  <button className="bg-white text-black px-10 py-6 border-6 border-black font-black text-2xl uppercase transform hover:scale-105 transition-all duration-300 shadow-xl">
                    RANKINGS
                  </button>
                </div>
              </div>
              
              {/* Enhanced Side Panels */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-6 border-black p-8 transform rotate-3 shadow-2xl relative">
                  <div className="absolute -top-4 -right-4 bg-yellow-400 border-4 border-black px-3 py-1 font-black text-sm transform -rotate-12">
                    HOT!
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 uppercase text-gray-800">LEADERBOARD</h3>
                  <div className="space-y-4 text-lg font-bold">
                    <div className="flex justify-between items-center">
                      <span>🥇 MangaMaster</span>
                      <span className="text-2xl font-black">9999</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>🥈 OtakuKing</span>
                      <span className="text-2xl font-black">8888</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>🥉 AnimeQueen</span>
                      <span className="text-2xl font-black">7777</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-blue-50 border-6 border-black p-8 transform -rotate-2 shadow-2xl relative">
                  <div className="absolute -top-4 -left-4 bg-green-400 border-4 border-black px-3 py-1 font-black text-sm transform rotate-12">
                    LIVE
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 uppercase text-gray-800">CURRENTLY ACTIVE</h3>
                  <div className="text-center">
                    <div className="text-5xl font-black text-green-600 mb-2">2,847</div>
                    <div className="text-lg font-bold text-gray-600">PLAYERS ONLINE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="bg-black text-white py-16 px-8 border-t-8 border-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white text-black border-8 border-white p-12 transform rotate-2 shadow-2xl mx-auto w-fit mb-12 relative">
              <div className="absolute -top-6 -right-6 bg-red-500 text-white px-4 py-2 font-black text-lg transform -rotate-12">
                END
              </div>
              
              <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">
                <span 
                  style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    textShadow: '4px 4px 0px #000',
                    WebkitTextStroke: '2px #000',
                    color: 'white'
                  }}
                >
                  TO BE CONTINUED...
                </span>
              </h3>
              <div className="text-2xl font-bold">つづく...</div>
            </div>
            
            <div className="flex justify-center gap-16 text-2xl font-black">
              <span className="transform rotate-3">AWESOME!</span>
              <span className="transform -rotate-2">AMAZING!</span>
              <span className="transform rotate-1">EPIC!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Reading Mode Overlay */}
      {isReading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-8xl font-black mb-12 animate-pulse">
              <span 
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  textShadow: '6px 6px 0px #000, 3px 3px 0px #ff6b6b',
                  WebkitTextStroke: '3px #000',
                  color: 'white'
                }}
              >
                LOADING...
              </span>
            </div>
            <div className="text-3xl font-bold mb-8 text-gray-600">読み込み中...</div>
            <button 
              onClick={() => setIsReading(false)}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-12 py-6 border-6 border-black font-black text-2xl uppercase transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              CLOSE / 閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoraChanLanding;