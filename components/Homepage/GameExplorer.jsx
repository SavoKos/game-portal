import Icon from '@components/UI/Icon';

import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GameExplorerItem from './GameExplorerItem';

function GameExplorer({ games, customGamesData }) {
  const [isCarouselIntersecting, setIsCarouselIntersecting] = useState(false);

  const carouselIntersectingHandler = () => {
    const callback = (entries, _) => {
      entries.forEach(ent => {
        console.log(ent.isIntersecting);
        if (ent.isIntersecting) return setIsCarouselIntersecting(true);
        setIsCarouselIntersecting(false);
      });
    };

    const screenWidth =
      window.innerWidth || document.querySelector('body').clientWidth;
    const threshold = screenWidth > 1000 ? 0.5 : 0.2;

    const options = {
      root: null,
      threshold: threshold,
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('.alice-carousel');
    if (!target) return;

    observer.observe(target);
  };
  useEffect(() => carouselIntersectingHandler);

  const carouselItems = [
    <GameExplorerItem
      customGameData={customGamesData.farcry6}
      games={games?.slice(7, 14)}
    />,
    <GameExplorerItem
      customGameData={customGamesData.reddeadredemption2}
      games={games?.slice(14, 21)}
    />,
    <GameExplorerItem
      customGameData={customGamesData.horizonzerodawn}
      games={games?.slice(21, 28)}
    />,
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
    color: #d9d9d9;
    cursor: pointer;
    border: 2px solid #d9d9d9;
    background-color: transparent;
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

export default GameExplorer;
