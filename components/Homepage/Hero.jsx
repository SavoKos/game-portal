import Image from 'next/image';

function Hero() {
  return (
    <div className="h-screen w-full overflow-hidden pointer-events-none z-10 relative">
      <Image src="/home-hero.png" layout="fill" objectFit="cover" />
    </div>
  );
}

export default Hero;
