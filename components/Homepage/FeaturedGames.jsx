import Image from 'next/image';

export default function FeaturedGames({ games }) {
  console.log(games);
  return (
    <div className="bg-black w-full -mt-36 flex items-center text-white relative z-0 h-56 flex-wrap">
      {games.map(game => (
        <div
          key={game.id}
          className="h-56 w-1/3 md:w-1/5 relative cursor-pointer flex-auto featured-gradient"
        >
          <Image src={game.background_image} layout="fill" objectFit="cover" />
          <h3 className="absolute bottom-3 left-3 z-10 text-base md:text-xl">
            {game.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
