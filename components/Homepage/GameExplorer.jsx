import Icon from '@components/UI/Icon';
import Image from 'next/image';
import Stars from './Stars';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function GameExplorer({ games, gta }) {
  const [isCarouselIntersecting, setIsCarouselIntersecting] = useState(false);

  const carouselIntersectingHandler = () => {
    const callback = (entries, _) => {
      entries.forEach(ent => {
        console.log(ent.isIntersecting);
        if (ent.isIntersecting) return setIsCarouselIntersecting(true);
        setIsCarouselIntersecting(false);
      });
    };

    const options = {
      root: null,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('.alice-carousel');
    if (!target) return;

    observer.observe(target);
  };

  useEffect(() => carouselIntersectingHandler);

  // returns label "NEW" if game is 5 months old or younger
  const newGameCheck = (date = 1000) => {
    // 1 month has 2629743 sec
    const isGame5MonthOld = +new Date() - date < 2629743 * 5;
    if (!isGame5MonthOld) return '';

    return (
      <S.NewLabel>
        <h6>NEW</h6>
      </S.NewLabel>
    );
  };

  // convert platform names to icon suitable names e.g. playstation5 => icon-playstation
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
      <S.PlatformContainer>
        {uniquePlatforms.map(platform => (
          <Icon type={platform} key={platform} />
        ))}
      </S.PlatformContainer>
    );
  };

  const carouselItems = [
    <div className="flex-wrap pb-44 flex justify-center mt-40 md:justify-start">
      {/* GTA V */}
      <div
        className="w-full xl:w-60% h-[440px] shadow-white bg-primaryLight relative"
        style={{
          backgroundImage: `url(${'https://res.cloudinary.com/dicynt7ms/image/upload/b_rgb:05021b,o_29,f_webp/v1623090955/game-portal/5f5a38a222252d996b18962806eed707_zqouax.jpg'})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute -top-24 lg:left-1/2 left-0 flex items-center">
          <h2 className="text-gray-700 text-2xl md:text-3xl">RATING</h2>
          <div className="bg-seaBlue w-16 h-16 rounded-[50%] grid place-items-center mx-5">
            <h3 className="text-white font-bold">{gta?.rating}</h3>
          </div>
          <div>
            <Stars rating={+Math.trunc(gta?.rating)} />
          </div>
        </div>
        <div className="text-white absolute right-0 w-full lg:w-1/2 top-3 lg:block grid place-items-center">
          <h4 className="font-semibold text-gray-400">
            {gta?.released?.slice(0, 4)}
          </h4>
          <h2 className="font-bold text-3xl uppercase my-5">{gta?.name}</h2>
          <p className="description w-11/12 md:w-96">{gta?.description_raw}</p>
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
        <div className="max-w-[400px] h-[510px] hidden lg:block relative -top-1/4 shadow-white -left-3 bg-primaryLight explorer-gradient ">
          <Image
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
    </div>,
    <div className="flex-wrap pb-44 flex justify-center mt-40 md:justify-star ">
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
          <h2 className="text-gray-700 text-2xl md:text-3xl">RATING</h2>
          <div className="bg-seaBlue w-16 h-16 rounded-[50%] grid place-items-center mx-5">
            <h3 className="text-white font-bold">{gta?.rating}</h3>
          </div>
          <div>
            <Stars rating={+Math.trunc(gta?.rating)} />
          </div>
        </div>
        <div className="text-white absolute right-0 w-full lg:w-1/2 top-3 lg:block grid place-items-center">
          <h4 className="font-semibold text-gray-400">
            {gta?.released?.slice(0, 4)}
          </h4>
          <h2 className="font-bold text-3xl uppercase my-5">{gta?.name}</h2>
          <p className="description w-11/12 md:w-96">{gta?.description_raw}</p>
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
        <div className="max-w-[400px] h-[510px] hidden lg:block relative -top-1/4 shadow-white -left-3 bg-primaryLight explorer-gradient ">
          <Image
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
            src={`https://res.cloudinary.com/demo/image/fetch/c_limit,w_700/${game.background_image}`}
            layout="fill"
            objectFit="cover"
            className="primary-photo"
          />
          <h5 className="absolute bottom-5 left-5 z-10 md:text-xl text-white font-bold text-xl font-poppins ">
            {game.name}
          </h5>
          {newGameCheck(+new Date(game.released))}
        </div>
      ))}
    </div>,
  ];

  return (
    <S.GameExplorerContainer isIntersecting={isCarouselIntersecting}>
      <S.TitleContainer>
        <h1>
          <span>G</span>AME EXPLORER
        </h1>
      </S.TitleContainer>
      <AliceCarousel
        mouseTracking
        items={carouselItems}
        disableDotsControls={true}
        renderPrevButton={() => (
          <Icon type="icon-arrow-left" className="carousel-nav-btn" />
        )}
        renderNextButton={() => (
          <Icon type="icon-arrow" className="carousel-nav-btn" />
        )}
      />
    </S.GameExplorerContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.GameExplorerContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 1536px;
  margin: auto;

  .alice-carousel__next-btn,
  .alice-carousel__prev-btn {
    position: ${({ isIntersecting }) =>
      isIntersecting ? 'fixed' : 'absolute'};
    top: 50%;
    padding: 0 !important;
  }

  .alice-carousel__prev-btn {
    width: 0 !important;
    left: 20px;
  }

  .alice-carousel__next-btn {
    width: 50px !important;
    right: 20px;
  }

  .carousel-nav-btn {
    color: #fff;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.seaBlue + 'd1'};
    padding: 0.75rem;
    border-radius: 50%;
    font-size: 1.5rem;
  }

  @media (min-width: 1536px) {
    .alice-carousel__prev-btn {
      left: 100px;
    }

    .alice-carousel__next-btn {
      right: 100px;
    }
  }
`;

S.TitleContainer = styled.div`
  width: 100%;
  margin: auto;
  margin-top: 22rem;

  h1 {
    color: #fff;
    margin-top: 0;

    span {
      color: ${({ theme }) => theme.colors.seaBlue};
    }
  }

  @media (min-width: 768px) {
    margin-top: 7rem;
  }
`;

S.NewLabel = styled.div`
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  background-color: rgba(5, 150, 105);
  z-index: 10;
  border-radius: 1.5rem;
  padding: 0.5rem 1.5rem;
  color: #fff;
  font-weight: 600;
  display: block;
`;

S.PlatformContainer = styled.div`
  position: absolute;
  left: 1.25rem;
  top: 1.25rem;
  background-color: rgba(17, 24, 39, 0.5);
  z-index: 10;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  color: #fff;
  font-weight: 600;

  .anticon {
    margin-right: 0.25rem;
    margin-left: 0.25rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
`;

export default GameExplorer;
