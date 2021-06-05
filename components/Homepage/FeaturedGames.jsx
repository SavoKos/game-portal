import Image from 'next/image';

export default function FeaturedGames({ games }) {
  console.log(games);
  return (
    <div className="bg-black w-full -mt-36 flex items-center text-white relative z-0 h-56">
      {games.map(game => (
        <div className="h-56 w-96 relative cursor-pointer">
          <Image src={game.background_image} layout="fill" objectFit="cover" />
        </div>
      ))}
    </div>
  );
}
