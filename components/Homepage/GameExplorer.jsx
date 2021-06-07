import Image from 'next/image';

function GameExplorer({ games }) {
  const background =
    'https://res.cloudinary.com/demo/image/fetch/e_brightness:-50/e_grayscale,o_100/' +
    games[0].short_screenshots[1].image;
  return (
    <div className="bg-primary w-full flex justify-center flex-col max-w-screen-2xl m-auto">
      <div className="w-full m-auto mt-28">
        <h1 className="text-white mb-36 mt-60 md:mt-0">
          <span className="text-capitalletter">G</span>AME EXPLORER
        </h1>
      </div>
      <div className="flex-wrap pb-44 flex justify-center md:justify-start">
        <div
          className="w-60% h-[440px] shadow-white bg-primaryLight relative"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="text-white absolute right-0">
            <h4 className="font-semibold text-gray-700">2020</h4>
          </div>
          <div className="max-w-[400px] h-[510px] hidden md:block relative -top-1/4 shadow-white -left-3 bg-primaryLight explorer-gradient">
            <Image
              src={games[0].background_image}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        {games.splice(1, 7).map(game => (
          <div
            key={game.id}
            className="w-5/12 md:w-1/5 h-[440px] bg-primaryLight relative flex-wrap transform scale-1 md:scale-90 shadow-white explorer-gradient flex-auto cursor-pointer"
          >
            <Image
              src={game.background_image}
              layout="fill"
              objectFit="cover"
            />
            <h5 className="absolute bottom-3 left-3 z-10 md:text-xl text-white font-bold text-xl font-poppins">
              {game.name}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameExplorer;
