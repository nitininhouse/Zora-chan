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
        
        <div className="min-h-screen bg-white relative overflow-hidden border-8 border-black">
          
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}
          />
          
          
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-black opacity-30"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '2px',
                  height: `${100 + i * 20}px`,
                  transformOrigin: 'center bottom',
                  transform: `translate(-50%, -50%) rotate(${i * 12}deg)`,
                }}
              />
            ))}
          </div>

         
          <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
            <div className="text-center">
             
              <div className="relative mb-12 bg-white border-4 border-black p-8 transform -rotate-2 shadow-2xl">
                <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 font-black text-lg">
                  CHAPTER 1
                </div>
                
                <h1 className="text-8xl md:text-9xl font-black mb-4 leading-none">
                  <span 
                    className="block"
                    style={{
                      fontFamily: 'Impact, "Franklin Gothic Bold", "Arial Black", sans-serif',
                      textShadow: '6px 6px 0px #000',
                      WebkitTextStroke: '3px #000',
                      color: 'white'
                    }}
                  >
                    ZORA
                  </span>
                  <span 
                    className="block -mt-4"
                    style={{
                      fontFamily: 'Impact, "Franklin Gothic Bold", "Arial Black", sans-serif',
                      textShadow: '6px 6px 0px #000',
                      WebkitTextStroke: '3px #000',
                      color: 'white'
                    }}
                  >
                    CHAN
                  </span>
                </h1>
                
                <div className="text-2xl font-black uppercase tracking-widest">
                  THE MANGA REVOLUTION
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="relative mb-12 mx-auto w-fit">
                <div className="bg-white border-4 border-black px-12 py-6 rounded-full relative font-black text-2xl shadow-xl">
                  "LET'S BEGIN THE STORY!"
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-16 border-transparent border-t-black"></div>
                    <div className="w-0 h-0 border-l-6 border-r-6 border-t-12 border-transparent border-t-white absolute top-0 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  className="relative bg-black text-white px-12 py-6 border-4 border-black font-black text-2xl uppercase transform hover:scale-105 transition-all duration-300 shadow-2xl"
                  style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}
                  onClick={() => setIsReading(true)}
                >
                  READ NOW!
                  <div className="absolute -top-2 -right-2 bg-white text-black px-3 py-1 text-sm font-black border-2 border-black">
                    NEW!
                  </div>
                </button>
                
                <button className="bg-white text-black px-10 py-5 border-4 border-black font-black text-xl uppercase transform hover:scale-105 transition-all duration-300 shadow-xl">
                  CONNECT WALLET
                </button>
              </div>
            </div>
          </div>

          {/* Corner Effects */}
          <div className="absolute top-8 right-8 text-6xl font-black transform rotate-12 opacity-30">
            ★
          </div>
          <div className="absolute bottom-8 left-8 text-4xl font-black transform -rotate-12 opacity-30">
            ドン！
          </div>
        </div>

        {/* Features Section - Comic Panel Layout */}
        <div className="bg-gray-100 py-16 px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="bg-white border-4 border-black p-8 transform rotate-1 shadow-2xl mx-auto w-fit">
                <h2 className="text-5xl md:text-6xl font-black uppercase">
                  <span 
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      textShadow: '4px 4px 0px #000',
                      WebkitTextStroke: '2px #000',
                      color: 'white'
                    }}
                  >
                    FEATURES
                  </span>
                </h2>
                <div className="text-xl font-black mt-2">機能紹介</div>
              </div>
            </div>

            {/* Panel Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "CHARACTER TRADING",
                  subtitle: "キャラクター取引",
                  desc: "Buy and sell character shares! Watch your portfolio grow as characters gain popularity in the story!",
                  effect: "TRADE!",
                  panel: "01"
                },
                {
                  title: "STORY VOTING",
                  subtitle: "ストーリー投票",
                  desc: "Vote on plot twists and character development! Your choices shape the manga universe!",
                  effect: "VOTE!",
                  panel: "02"
                },
                {
                  title: "LIVE EVOLUTION",
                  subtitle: "リアルタイム進化",
                  desc: "Characters evolve based on community actions! Witness real-time transformations!",
                  effect: "EVOLVE!",
                  panel: "03"
                },
                {
                  title: "BATTLE EVENTS",
                  subtitle: "バトルイベント",
                  desc: "Epic crossover battles between different manga series! Who will emerge victorious?",
                  effect: "FIGHT!",
                  panel: "04"
                },
                {
                  title: "SECRET CHAPTERS",
                  subtitle: "秘密の章",
                  desc: "Unlock hidden storylines and exclusive content! Discover the deepest manga lore!",
                  effect: "UNLOCK!",
                  panel: "05"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className={`relative bg-white border-4 border-black p-6 transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-all duration-300 shadow-xl`}
                >
                  {/* Panel Number */}
                  <div className="absolute -top-4 -left-4 bg-black text-white px-3 py-1 font-black text-sm">
                    {feature.panel}
                  </div>
                  
                  {/* Sound Effect */}
                  <div className="absolute -top-2 -right-2 bg-yellow-300 border-2 border-black px-2 py-1 font-black text-xs transform rotate-12">
                    {feature.effect}
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-2xl font-black mb-2 uppercase" style={{ fontFamily: 'Impact, "Arial Black", sans-serif' }}>
                      {feature.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-4 font-bold">{feature.subtitle}</div>
                    <p className="text-gray-800 font-medium leading-relaxed text-sm">
                      {feature.desc}
                    </p>
                  </div>
                  
                  {/* Halftone Effect */}
                  <div 
                    className="absolute bottom-2 right-2 w-8 h-8 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle, black 1px, transparent 1px)`,
                      backgroundSize: '4px 4px'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Section - Manga Page Layout */}
        <div className="bg-white py-16 px-8 border-t-8 border-black">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Panel */}
              <div className="md:col-span-2 bg-white border-4 border-black p-8 transform -rotate-1 shadow-2xl">
                <div className="absolute -top-4 -left-4 bg-black text-white px-4 py-2 font-black text-lg">
                  GUILD
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase">
                  <span 
                    style={{
                      fontFamily: 'Impact, "Arial Black", sans-serif',
                      textShadow: '3px 3px 0px #000',
                      WebkitTextStroke: '2px #000',
                      color: 'white'
                    }}
                  >
                    JOIN THE COMMUNITY
                  </span>
                </h2>
                
                <div className="text-xl text-gray-600 mb-6 font-bold">コミュニティに参加</div>
                
                <p className="text-lg font-medium mb-8 leading-relaxed">
                  Connect with fellow manga enthusiasts! Share theories, create fan art, and participate in epic storyline discussions. The manga revolution needs YOU!
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button className="bg-black text-white px-8 py-4 border-4 border-black font-black text-lg uppercase transform hover:scale-105 transition-all duration-300">
                    JOIN GUILD
                  </button>
                  <button className="bg-white text-black px-8 py-4 border-4 border-black font-black text-lg uppercase transform hover:scale-105 transition-all duration-300">
                    VIEW RANKINGS
                  </button>
                </div>
              </div>
              
              {/* Side Panels */}
              <div className="space-y-6">
                <div className="bg-white border-4 border-black p-6 transform rotate-2 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 uppercase">LEADERBOARD</h3>
                  <div className="space-y-2 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>🥇 MangaMaster</span>
                      <span>9999</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🥈 OtakuKing</span>
                      <span>8888</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🥉 AnimeQueen</span>
                      <span>7777</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border-4 border-black p-6 transform -rotate-1 shadow-xl">
                  <h3 className="text-2xl font-black mb-4 uppercase">ACTIVE NOW</h3>
                  <div className="text-3xl font-black text-center">
                    <span className="text-green-600">2,847</span>
                    <div className="text-sm text-gray-600">PLAYERS ONLINE</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Manga Style */}
        <div className="bg-black text-white py-12 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white text-black border-4 border-white p-8 transform rotate-1 shadow-2xl mx-auto w-fit mb-8">
              <h3 className="text-3xl md:text-4xl font-black uppercase">
                <span 
                  style={{
                    fontFamily: 'Impact, "Arial Black", sans-serif',
                    textShadow: '3px 3px 0px #fff',
                    WebkitTextStroke: '2px #fff',
                    color: 'black'
                  }}
                >
                  TO BE CONTINUED...
                </span>
              </h3>
              <div className="text-lg font-bold mt-2">続く...</div>
            </div>
            
            <div className="flex justify-center gap-12 text-lg font-black">
              <span>頑張って！</span>
              <span>やった！</span>
              <span>最高だ！</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reading Mode Overlay */}
      {isReading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-black mb-8 animate-pulse">
              <span 
                style={{
                  fontFamily: 'Impact, "Arial Black", sans-serif',
                  textShadow: '4px 4px 0px #000',
                  WebkitTextStroke: '2px #000',
                  color: 'white'
                }}
              >
                LOADING...
              </span>
            </div>
            <button 
              onClick={() => setIsReading(false)}
              className="bg-black text-white px-8 py-4 border-4 border-black font-black text-xl uppercase"
            >
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoraChanLanding;