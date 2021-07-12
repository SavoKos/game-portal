import styled from 'styled-components';
import StoresIcons from '@components/StoresIcons';
import Image from 'next/image';
import Overlay from '@components/UI/Overlay';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useState } from 'react';
import Icon from '@components/UI/Icon';

function MainDetails({ screenshots, gameDetails, stores }) {
  const [sliderActive, setSliderActive] = useState(false);

  const carouselItems = screenshots.map((screenshot, i) => (
    <S.ScreenshotSlide>
      <Image
        src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_1500/${screenshot.image}`}
        alt={`${gameDetails?.name_original} image ${i}`}
        className="screenshot"
        objectFit="cover"
        layout="fill"
      />
    </S.ScreenshotSlide>
  ));

  return (
    <S.MainDetailsContainer sliderActive={sliderActive}>
      <Image
        src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_800/${
          screenshots[0]?.image || gameDetails?.background_image
        }`}
        alt={`${gameDetails?.name_original} image`}
        className="bg-img"
        objectFit="cover"
        layout="fill"
        objectPosition="top"
      />
      <S.MainDetails>
        <S.StoresContainer>
          <StoresIcons storesArray={stores} />
        </S.StoresContainer>
        <S.ScreenshotsContainer>
          <S.Screenshot onClick={() => setSliderActive(true)}>
            <Image
              src={`https://res.cloudinary.com/demo/image/fetch/c_scale,w_1200/${screenshots[0]?.image}`}
              alt={`${gameDetails?.name_original} screenshot 1`}
              objectFit="cover"
              layout="fill"
            />
          </S.Screenshot>
          {screenshots.slice(1, 3).map((screenshot, i) => (
            <S.Screenshot
              key={screenshot.id}
              onClick={() => setSliderActive(true)}
            >
              <Image
                src={`https://res.cloudinary.com/demo/image/fetch/c_scale,w_800/${screenshot?.image}`}
                alt={`${gameDetails?.name_original} screenshot ${i}`}
                objectFit="cover"
                layout="fill"
              />
            </S.Screenshot>
          ))}
          <S.Screenshot onClick={() => setSliderActive(true)}>
            <Icon type="icon-moreread" />
            <h5>View More</h5>
          </S.Screenshot>
        </S.ScreenshotsContainer>
        <Overlay
          onClick={() => setSliderActive(false)}
          active={sliderActive}
          className="overlay"
        />
        <AliceCarousel
          mouseTracking
          items={carouselItems}
          // disableDotsControls={true}
          // renderPrevButton={() => (
          //   <Icon type="icon-arrow-left" className="carousel-nav-btn" />
          // )}
          // renderNextButton={() => (
          //   <Icon type="icon-arrow" className="carousel-nav-btn" />
          // )}
        />
      </S.MainDetails>
    </S.MainDetailsContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.MainDetailsContainer = styled.div`
  display: flex;
  position: relative;
  min-height: 80vh;
  width: 100%;
  padding-top: 7rem;
  z-index: ${({ sliderActive }) => (sliderActive ? '60' : 'auto')};

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to top, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }
`;

S.MainDetails = styled.div`
  padding: 0 5%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  @media (min-width: 850px) {
    height: unset;
    max-height: 50vh;
    flex-direction: row;
  }

  @media (min-width: 500px) {
    padding: 0 10%;
  }

  .alice-carousel {
    height: 80vh;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
`;

S.StoresContainer = styled.div`
  display: grid;
  place-items: center;
  max-width: 100%;
  width: 100%;
  margin-bottom: 3rem;

  @media (min-width: 850px) {
    margin-bottom: 0;
    max-width: 40%;
  }

  h1 {
    color: #fff;
    margin-bottom: 5rem;
  }
`;

S.ScreenshotsContainer = styled.div`
  flex-wrap: wrap;
  width: 100%;
  display: flex;
  height: 100%;

  @media (min-width: 850px) {
    width: 57%;
  }
`;

S.Screenshot = styled.div`
  flex: 1 1 auto;
  width: 32%;
  border-radius: 0.5rem;
  overflow: hidden;
  margin: 0.1rem;
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  transition: all ease 0.3s;
  height: 10rem;

  @media (min-width: 850px) {
    height: unset;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary + 'bf'};

    h5,
    .anticon {
      color: #fff;
    }
  }

  h5 {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }

  .anticon {
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:nth-of-type(1) {
    width: 100%;
  }
`;

S.ScreenshotSlide = styled.div`
  position: relative;
  height: 100%;
  height: 80vh;
  width: 100%;

  .screenshot {
    height: 100%;
  }
`;

S.ScreenshotsSlider = styled.div`
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 60;
`;

export default MainDetails;
