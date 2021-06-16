import Icon from '@components/UI/Icon';
import Image from 'next/image';
import Stars from './Stars';

function GameExplorer({ games, gta }) {
  console.log(games);

  const newGameCheck = (date = 1000) => {
    // 1 month has 2629743 sec
    const isGame5MonthOld = +new Date() - date < 2629743 * 5;
    if (!isGame5MonthOld) return '';

    // returns label "NEW" if game is 5 months old or younger
    return (
      <div className="absolute right-5 top-5 bg-green-600 z-10 rounded-3xl py-2 px-6 text-white font-semibold hidden xl:block">
        <h6>NEW</h6>
      </div>
    );
  };

  const gamePlatforms = (platformsArray = null) => {
    if (!platformsArray) return '';

    const platforms = platformsArray
      .map(platform => platform.platform.slug)
      .map(platform => {
        if (platform === 'playstation5' || platform === 'playstation4')
          return 'icon-playstation';
        if (
          platform === 'xbox-series-x' ||
          platform === 'xbox-series-s' ||
          platform === 'xbox-one'
        )
          return 'icon-xbox';
        if (platform === 'nintendo-switch') return 'icon-nintendo-switch';
        if (platform === 'pc') return 'icon-socialwindows';
        if (platform === 'android') return 'icon-socialandroid';
        if (platform === 'ios' || platform === 'apple')
          return 'icon-socialapple';
      });

    const uniquePlatforms = [...new Set(platforms)];

    return (
      <div className="absolute left-5 top-5 bg-gray-900 bg-opacity-50 z-10 rounded-3xl flex items-center justify-center px-4 py-1 text-white font-semibold">
        {uniquePlatforms.map(platform => (
          <Icon type={platform} key={platform} className="mx-1 text-lg" />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-primary w-full flex justify-center flex-col max-w-screen-2xl m-auto">
      <div className="w-full m-auto mt-28">
        <h1 className="text-white mb-36 mt-60 md:mt-0">
          <span className="text-seaBlue">G</span>AME EXPLORER
        </h1>
      </div>
      <div className="flex-wrap pb-44 flex justify-center md:justify-start">
        {/* GTA V */}
        <div
          className="w-full xl:w-60% h-[440px] shadow-white bg-primaryLight relative"
          style={{
            backgroundImage: `url(${'https://res.cloudinary.com/dicynt7ms/image/upload/b_rgb:05021b,o_29,f_webp/v1623090955/game-portal/5f5a38a222252d996b18962806eed707_zqouax.jpg'})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute -top-24 md:left-1/2 left-0 flex items-center">
            <h2 className="text-gray-700">RATING</h2>
            <div className="bg-seaBlue w-16 h-16 rounded-[50%] grid place-items-center mx-5">
              <h3 className="text-white font-bold">{gta?.rating}</h3>
            </div>
            <div>
              <Stars rating={+Math.trunc(gta?.rating)} />
            </div>
          </div>
          <div className="text-white absolute right-0 w-full md:w-1/2 top-3 md:block grid place-items-center">
            <h4 className="font-semibold text-gray-400">
              {gta?.released?.slice(0, 4)}
            </h4>
            <h2 className="font-bold text-3xl uppercase my-5">{gta?.name}</h2>
            <p className="description">{gta?.description_raw}</p>
            <div className="flex max-w-[400px] flex-wrap items-center justify-center mt-4 font-poppins font-light">
              {gta?.tags?.slice(0, 5).map(tag => (
                <p
                  key={tag.id}
                  className="flex-auto w-1/3 m-1 rounded-3xl bg-white text-center bg-opacity-10 p-2 font-normal font-poppins cursor-pointer hover:bg-seaBlue transition-all duration-300"
                >
                  {tag.name}
                </p>
              ))}
            </div>
            <button className="bg-seaBlue outline-none py-2 px-7 font-semibold rounded-3xl mt-5 shadow-white">
              More Info
            </button>
          </div>
          <div className="max-w-[400px] h-[510px] hidden md:block relative -top-1/4 shadow-white -left-3 bg-primaryLight explorer-gradient ">
            <Image
              placeholder="blur"
              src="https://res.cloudinary.com/dicynt7ms/image/upload/c_scale,w_800,c_limit,q_100/v1623091234/game-portal/84da2ac3fdfc6507807a1808595afb12_l0zxa0.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        {/* List of featured games */}
        {games?.slice(7, 14).map(game => (
          <div
            key={game.id}
            className="w-5/12 lg:w-1/5 h-[440px] bg-primaryLight relative flex-wrap transform hover:scale-100 lg:scale-90 lg:hover:scale-101 shadow-white explorer-gradient flex-auto cursor-pointer  transition-all duration-300 game-item"
          >
            {gamePlatforms(game.platforms)}
            <Image
              placeholder="blur"
              src={`https://res.cloudinary.com/demo/image/fetch/c_limit,w_700/${
                game.short_screenshots[1]?.image ||
                game.short_screenshots[0]?.image
              }`}
              className="hover-photo"
              layout="fill"
              loading="eager"
              objectFit="cover"
            />
            <Image
              placeholder="blur"
              src={`https://res.cloudinary.com/demo/image/fetch/c_limit,w_700/${game.background_image}`}
              layout="fill"
              objectFit="cover"
              className="primary-photo"
            />
            <h5 className="absolute bottom-5 left-5 z-10 md:text-xl text-white font-bold text-xl font-poppins">
              {game.name}
            </h5>
            {newGameCheck(+new Date(game.released))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameExplorer;
