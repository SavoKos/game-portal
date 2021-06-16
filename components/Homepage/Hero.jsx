import Image from 'next/image';
import { useState } from 'react';

function Hero() {
  return (
    <div
      className="min-h-screen w-full overflow-hidden z-10 relative"
      id="hero"
    >
      <div className="absolute top-60% left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <h3 className="font-bold text-center">GAME PORTAL</h3>
        <div className="triangle mb-32"></div>
        <h4>Place to find your favorite games</h4>
      </div>
    </div>
  );
}

export default Hero;
