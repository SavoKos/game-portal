import AdvancedOptions from '@components/Games/AdvancedOptions';
import Layout from '@components/Layout';
import Navigation from '@components/Navigation';
import Spinner from '@components/UI/Spinner';
import useFilters from 'context/Filters';
import styled from 'styled-components';
import Filters from '@components/Games/Filters';
import GamesList from '@components/Games/GamesList';
import { useState } from 'react';
import AdvancedOptionsSidebar from '@components/Games/AdvancedOptionsSidebar';

function Games() {
  const {
    games,
    setStores,
    setDevelopers,
    setPublishers,
    setGenres,
    setMetacritic,
    setPage,
    setTags,
    setParentPlatforms,
    setPlatforms,
    setOrder,
    setGames,
  } = useFilters();
  const [advancedSidebarActive, setAdvancedSidebarActive] = useState(false);

  const clearFilters = () => {
    setGames('');
    setPage(1);
    setStores('');
    setDevelopers('');
    setPublishers('');
    setGenres('');
    setMetacritic([1, 100]);
    setTags('');
    setOrder('');
    setPlatforms('');
    setParentPlatforms('');
  };

  if (!games)
    return (
      <S.PageContainer>
        <Navigation active="games" />
        <Spinner />
      </S.PageContainer>
    );

  return (
    <Layout
      title="All Games - Game Portal"
      url="https://gameportal.savokos.com/games"
      decription="Search, filter and find your favorite game among others"
      image="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
    >
      <S.PageContainer>
        <Navigation active="games" />
        <AdvancedOptionsSidebar
          sidebarActive={advancedSidebarActive}
          setSidebarActive={setAdvancedSidebarActive}
        />
        <S.GamesContainer>
          <S.BackgroundImage />
          <h1>All Games</h1>
          <S.GamesContent>
            {!advancedSidebarActive && <AdvancedOptions />}
            <S.MainContent>
              <S.TopBarContainer>
                <input type="search" placeholder="Search..." />
                <Filters
                  sidebarActive={advancedSidebarActive}
                  setSidebarActive={setAdvancedSidebarActive}
                />
                <S.Buttons>
                  <h5
                    className="advanced-options"
                    onClick={() =>
                      setAdvancedSidebarActive(!advancedSidebarActive)
                    }
                  >
                    Advanced options
                  </h5>
                  <h5 className="clear" onClick={clearFilters}>
                    Clear
                  </h5>
                </S.Buttons>
              </S.TopBarContainer>
              <GamesList />
            </S.MainContent>
          </S.GamesContent>
        </S.GamesContainer>
      </S.PageContainer>
    </Layout>
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
  height: 150vh;
  background-image: url('https://res.cloudinary.com/dicynt7ms/image/upload/v1626363456/game-portal/all-games-hero_clryn2.png');
  background-position: top center;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  @media (min-width: 600px) {
    height: 100vh;
  }
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

S.MainContent = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    padding-left: 2rem;
  }
`;

S.TopBarContainer = styled.div`
  border-radius: 5px;
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0.5rem;
  flex-direction: column;

  p::selection,
  span::selection,
  li::selection,
  ul::selection {
    background: transparent;
  }

  input[type='search'] {
    background-color: ${({ theme }) => theme.colors.primaryLight};
    border: 0;
    border-radius: 0.3rem;
    outline: 0;
    font-size: 1.2rem;
    color: #fff;
    margin-bottom: 0.5rem;
    padding: 0.5rem 1rem;

    @media (min-width: 900px) {
      margin-bottom: 1rem;
      padding: 1rem 2rem;
    }
  }
`;

S.Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h5.advanced-options {
    color: ${({ theme }) => theme.colors.seaBlue};
    cursor: pointer;
    padding: 0.5rem;
    padding-top: 1rem;
    display: block;
    width: fit-content;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  h5.clear {
    width: fit-content;
    color: red;
    cursor: pointer;
    padding: 0.5rem;
    padding-top: 1rem;
  }
`;

export default Games;
