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
        </div>
      </div>
    </div>
  )
}