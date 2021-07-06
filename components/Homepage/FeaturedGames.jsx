import Image from 'next/image';
import styled from 'styled-components';
import Link from 'next/link';

export default function FeaturedGames({ games }) {
  return (
    <S.FeaturedContainer>
      {games?.slice(0, 5).map(game => (
        <Link key={game.id} href={'/games/' + game.slug}>
          <S.FeaturedGame>
            <Image
              src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_400,h_300,g_north/${game.background_image}`}
              layout="fill"
              objectFit="cover"
            />
            <h3>{game.name}</h3>
          </S.FeaturedGame>
        </Link>
      ))}
    </S.FeaturedContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.FeaturedContainer = styled.div`
  background-color: #000;
  width: 100%;
  margin-top: -9rem;
  display: flex;
  align-items: center;
  color: #fff;
  position: relative;
  z-index: 0;
  flex-wrap: wrap;
  height: 14rem;
`;

S.FeaturedGame = styled.div`
  height: 14rem;
  width: 50%;
  position: relative;
  cursor: pointer;
  flex: 1 1 auto;

  h3 {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    z-index: 10;
    font-size: 1rem;
    line-height: 1.5rem;
  }

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }

  @media (min-width: 768px) {
    width: 20%;

    h3 {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }
`;
