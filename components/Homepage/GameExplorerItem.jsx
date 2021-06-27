import Icon from '@components/UI/Icon';
import Image from 'next/image';
import styled from 'styled-components';
import Stars from './Stars';

function GameExplorerItem({ games, customGameData }) {
  // returns label "NEW" if game is 10 months old or younger
  const newGameCheck = (date = 1000) => {
    // 1 month has 2629743 sec
    const isGame5MonthOld = +new Date() - date < 2629743 * 10;
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

    const uniquePlatforms = [...new Set(platforms)].filter(
      platform => platform
    );

    return (
      <S.PlatformContainer>
        {uniquePlatforms.map(platform => (
          <Icon type={platform} key={platform} />
        ))}
      </S.PlatformContainer>
    );
  };

  return (
    <S.GameExplorerItem>
      <S.FeaturedGame
        className="shadow-white"
        style={{
          backgroundImage: `url(${`https://res.cloudinary.com/dicynt7ms/image/upload/b_rgb:05021b,o_29,f_webp/v1623090955/game-portal/${customGameData?.background}`})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <S.RatingContainer>
          <h2>RATING</h2>
          <S.RatingCircle>
            <h3>{customGameData?.rating}</h3>
          </S.RatingCircle>
          <div>
            <Stars rating={+Math.trunc(customGameData?.rating)} />
          </div>
        </S.RatingContainer>
        <S.GameInfo>
          <h4>{customGameData?.released?.slice(0, 4)}</h4>
          <h2>{customGameData?.name_original}</h2>
          <p className="description">{customGameData?.description_raw}</p>
          <S.TagsContainer>
            {customGameData?.tags?.slice(0, 5).map(tag => (
              <S.Tag key={tag.id}>{tag.name}</S.Tag>
            ))}
          </S.TagsContainer>
          <S.MoreInfoBtn className="shadow-white">More Info</S.MoreInfoBtn>
        </S.GameInfo>
        <S.HoverImage className="explorer-gradient shadow-white">
          <Image
            src={`https://res.cloudinary.com/dicynt7ms/image/upload/c_scale,c_limit,q_100/v1623091234/game-portal/${customGameData?.cover}`}
            layout="fill"
            objectFit="cover"
          />
        </S.HoverImage>
      </S.FeaturedGame>
      {/* List of featured games */}
      {games?.map(game => (
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
    </S.GameExplorerItem>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.GameExplorerItem = styled.div`
  flex-wrap: wrap;
  padding-bottom: 11rem;
  justify-content: center;
  margin-top: 10rem;
  display: flex;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

S.FeaturedGame = styled.div`
  width: 100%;
  height: 440px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  position: relative;

  @media (min-width: 1280px) {
    width: 60%;
  }
`;

S.RatingContainer = styled.div`
  position: absolute;
  top: -6rem;
  left: 0;
  display: flex;
  align-items: center;

  @media (min-width: 1024px) {
    left: 50%;
  }

  h2 {
    color: #374151;
    font-size: 1.5rem;
    line-height: 2rem;

    @media (min-width: 768px) {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
`;

S.RatingCircle = styled.div`
  background-color: ${({ theme }) => theme.colors.seaBlue};
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  margin: 0 1.25rem;

  h3 {
    color: #fff;
    font-weight: 700;
  }
`;

S.GameInfo = styled.div`
  color: #fff;
  position: absolute;
  right: 0;
  width: 100%;
  top: 0.75rem;
  display: grid;
  place-items: center;

  @media (min-width: 1024px) {
    width: 50%;
    display: block;
  }

  h4 {
    font-weight: 600;
    color: rgba(156, 163, 175);
  }

  h2 {
    font-weight: 700;
    font-size: 1.875rem;
    line-height: 2.25rem;
    text-transform: uppercase;
    margin: 1.25rem 0;
  }

  .description {
    width: 90%;
    @media (min-width: 768px) {
      width: 24rem;
    }
  }
`;

S.TagsContainer = styled.div`
  display: flex;
  max-width: 400px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-weight: 300;
`;

S.Tag = styled.p`
  flex: 1 1 auto;
  width: 33.333333%;
  margin: 0.25rem;
  border-radius: 1.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  text-align: center;
  padding: 0.5rem;
  font-weight: 400;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.seaBlue};
  }
`;

// className="max-w-[400px] h-[510px] hidden lg:block relative -top-1/4 shadow-white -left-3 bg-primaryLight"

S.MoreInfoBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.seaBlue};
  outline: 0;
  padding: 0.5rem 1.75rem;
  font-weight: 600;
  border-radius: 1.5rem;
  margin-top: 1.25rem;
`;

S.HoverImage = styled.div`
  max-width: 400px;
  height: 510px;
  display: none;
  position: relative;
  top: -25%;
  left: -0.75rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};

  @media (min-width: 1024px) {
    display: block;
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

export default GameExplorerItem;