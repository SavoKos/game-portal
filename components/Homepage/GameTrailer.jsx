import { useState } from 'react';
import styled from 'styled-components';
import GameTrailerItem from './GameTrailerItem';

function GameTrailer({ customGamesData: { gtav, cyberpunk, valhalla } }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  console.log(currentSlide);
  const carouselItems = [
    <GameTrailerItem
      game={gtav}
      changeSlide={setCurrentSlide}
      currentSlide={currentSlide}
    />,
    <GameTrailerItem
      game={cyberpunk}
      changeSlide={setCurrentSlide}
      currentSlide={currentSlide}
    />,
    <GameTrailerItem
      game={valhalla}
      changeSlide={setCurrentSlide}
      currentSlide={currentSlide}
    />,
  ];

  const displayCarouselItem = () => {
    if (currentSlide < carouselItems.length) return carouselItems[currentSlide];
    setCurrentSlide(carouselItems.length - 1);
  };

  return <S.VideoContainer>{displayCarouselItem()}</S.VideoContainer>;
}

export default GameTrailer;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.VideoContainer = styled.div`
  padding: 0;
  background-color: ${({ theme }) => theme.colors.primaryLighterBlue};
  display: flex;
  align-items: center;

  @media (min-width: 1024px) {
    padding: 5rem 0;
  }

  .modal,
  iframe {
    width: 90vw;
    height: 95vh;
  }
`;
