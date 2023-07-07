import PlatformsIcons from '@components/PlatformsIcons';
import styled from 'styled-components';
import Link from 'next/link';

function SearchResult({ game }) {
  const platformIconsSlugs = (platforms) =>
    platforms?.map((platform) => platform?.platform?.slug);

  if (!game?.background_image) return '';
  return (
    <Link href={'/games/' + game.slug || ''}>
      <S.SearchResult>
        <img src={game?.background_image} />
        <S.GameDetails>
          <S.PlatformsIcons>
            <PlatformsIcons
              platformsArray={platformIconsSlugs(game?.parent_platforms)}
            />
          </S.PlatformsIcons>
          <h5>{game.name}</h5>
        </S.GameDetails>
      </S.SearchResult>
    </Link>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.SearchResult = styled.div`
  width: 100%;
  display: flex;
  color: #ffffffcf;
  transition: all ease 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

S.GameDetails = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;

  .anticon {
    margin: 0 0.2rem;
    cursor: pointer;
  }

  img {
    margin-right: 1rem;
  }

  h5 {
    font-weight: 700;
    font-size: 1rem;
  }
`;

S.PlatformsIcons = styled.div``;

export default SearchResult;
