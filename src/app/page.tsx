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
}