import Image from 'next/image';
import styled from 'styled-components';
import PlatformsIcons from '@components/PlatformsIcons';
import Link from 'next/link';

function GameSingleItem({ game }) {
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

  const platformIconsSlugs = platforms =>
    platforms?.map(platform => platform.platform.slug);

  return (
    <Link href={'/games/' + game.slug || ''}>
      <S.GameExplorerItem className="shadow-white explorer-gradient game-item">
        <S.LabelsContainer>
          <S.PlatformContainer>
            <PlatformsIcons
              platformsArray={platformIconsSlugs(game.parent_platforms)}
              limited
            />
          </S.PlatformContainer>
          {newGameCheck(+new Date(game.released))}
        </S.LabelsContainer>
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_300,h_400,q_100/${game.background_image}`}
          layout="fill"
          objectFit="cover"
          className="primary-photo"
        />
        <h3 className="game-name">{game.name}</h3>
      </S.GameExplorerItem>
    </Link>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.GameExplorerItem = styled.div`
  width: 50%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  position: relative;
  flex-wrap: wrap;
  flex: 1 1 auto;
  cursor: pointer;
  transition: all ease 0.3s;
  max-width: 400px;
  border-radius: 0.5rem;
  overflow: hidden;

  .primary-photo {
    transition: all ease 0.3s;
  }

  &:hover .primary-photo {
    transform: scale(1.5);
  }

  @media (min-width: 600px) {
    width: 23%;
  }

  @media (min-width: 1024px) {
    height: 440px;
    transform: scale(0.975);
  }

  @media (min-width: 1280px) {
    width: 15%;
  }

  .game-name {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    z-index: 10;
    color: #fff;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }
`;

S.LabelsContainer = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  z-index: 10;

  @media (min-width: 500px) {
    left: 1.25rem;
    top: 1.25rem;
  }
`;

S.NewLabel = styled.div`
  background-color: rgba(5, 150, 105);
  border-radius: 1.5rem;
  padding: 0.5rem 1.5rem;
  width: fit-content;
  margin-top: 0.5rem;
  color: #fff;
  font-weight: 600;
  display: block;
`;

S.PlatformContainer = styled.div`
  background-color: rgba(17, 24, 39, 0.5);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 1rem;
  color: #fff;
  font-weight: 600;

  .anticon {
    margin: 0.25rem;
    font-size: 1rem;
    line-height: 0;

    @media (min-width: 500px) {
      font-size: 1.125rem;
    }
  }
`;

export default GameSingleItem;
