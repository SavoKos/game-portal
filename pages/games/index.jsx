import Navigation from '@components/Navigation';
import styled from 'styled-components';

function Games() {
  return (
    <S.PageContainer>
      <Navigation active="games" />
      <S.GamesContainer>
        <S.BackgroundImage />
        <h1>All Games</h1>
        <S.GamesContent>
          <S.Aside></S.Aside>
          <S.MainContent>
            <S.FiltersContainer></S.FiltersContainer>
          </S.MainContent>
        </S.GamesContent>
      </S.GamesContainer>
    </S.PageContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 100vh;
`;

S.BackgroundImage = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url('https://res.cloudinary.com/dicynt7ms/image/upload/v1626363456/game-portal/all-games-hero_clryn2.png');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;

S.GamesContainer = styled.div`
  padding: 0 10%;
  padding-top: 10rem;

  h1 {
    position: relative;
    color: #fff;
    z-index: 5;
  }
`;

S.GamesContent = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 5rem;
`;

S.Aside = styled.div`
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  width: 25%;
  border-radius: 5px;
`;

S.MainContent = styled.div`
  padding-left: 2rem;
  width: 100%;
`;

S.FiltersContainer = styled.div`
  border-radius: 5px;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
`;

export default Games;
