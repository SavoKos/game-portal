import Image from 'next/image';

function Hero() {
  return (
    <div className="h-screen w-full overflow-hidden pointer-events-none z-10 relative">
      <Image src="/home-hero.png" layout="fill" objectFit="cover" />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
        <h3 className="font-bold">GAME PORTAL</h3>
        <div className="triangle"></div>
      </div>
    </div>
  );
}

export default Hero;
