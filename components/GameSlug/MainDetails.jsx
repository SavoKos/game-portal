import styled from 'styled-components';
import StoresIcons from '@components/StoresIcons';
import Image from 'next/image';
import Overlay from '@components/UI/Overlay';
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { useState } from 'react';
import Icon from '@components/UI/Icon';
import Spinner from '@components/UI/Spinner';

function MainDetails({ screenshots, slugDetails, stores }) {
  const [sliderActive, setSliderActive] = useState(false);

  const carouselItems = screenshots?.map((screenshot, i) => {
    const imageWidth =
      screenshot.width < window.innerWidth + 100
        ? screenshot.width
        : window.innerWidth + 100;

    return (
      <S.ScreenshotSlide>
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_${imageWidth},q_65/${screenshot.image}`}
          alt={`${slugDetails?.name_original} image ${i + 1}`}
          className="screenshot"
          objectFit="cover"
          layout="intrinsic"
          width={1499}
          height={815}
          loading={sliderActive ? 'eager' : 'lazy'}
        />
        <Spinner />
      </S.ScreenshotSlide>
    );
  });

  return (
    <S.MainDetailsContainer sliderActive={sliderActive}>
      {screenshots && (
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_1200/${
            screenshots[0]?.image || slugDetails?.background_image
          }`}
          alt={`${slugDetails?.name_original} image`}
          className="bg-img"
          objectFit="cover"
          layout="fill"
          objectPosition="top"
        />
      )}
      <S.MainDetails active={sliderActive}>
        <S.StoresContainer>
          <StoresIcons storesArray={stores} />
        </S.StoresContainer>
        <S.ScreenshotsContainer>
          <S.Screenshot onClick={() => setSliderActive(true)}>
            {screenshots && (
              <Image
                src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_800/${screenshots[0]?.image}`}
                alt={`${slugDetails?.name_original} screenshot 1`}
                objectFit="cover"
                layout="fill"
              />
            )}
          </S.Screenshot>
          {screenshots?.slice(1, 3).map((screenshot, i) => (
            <S.Screenshot
              key={screenshot.id}
              onClick={() => setSliderActive(true)}
            >
              <Image
                src={`https://res.cloudinary.com/demo/image/fetch/c_fill,w_500/${screenshot?.image}`}
                alt={`${slugDetails?.name_original} screenshot ${i + 1}`}
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
        >
          <Icon
            type="icon-searchclose"
            className="close-slider"
            onClick={() => setSliderActive(false)}
          />
        </Overlay>
        <AliceCarousel
          mouseTracking
          items={carouselItems}
          keyboardNavigation
          renderPrevButton={() => (
            <Icon
              type="icon-youluPC_common_arrow_th"
              className="carousel-nav-btn"
            />
          )}
          renderNextButton={() => (
            <Icon
              type="icon-youluPC_common_arrow_th1"
              className="carousel-nav-btn"
            />
          )}
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
  min-height: 100vh;
  width: 100%;
  padding-top: 10rem;
  z-index: ${({ sliderActive }) => (sliderActive ? '60' : 'auto')};
  padding-bottom: 15rem;

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to top, rgba(255, 0, 0, 0) 0%, #070426 100%);
  }

  @media (min-width: 850px) {
    padding-bottom: 20rem;
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
    position: fixed;
    width: 100%;
    visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
    opacity: ${({ active }) => (active ? '100' : '0')};
    z-index: 56;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    transition: all ease 0.3s;

    @media (min-width: 1200px) {
      width: 60%;
      height: 60%;
      top: 40%;
      transform: translate(-50%, -40%);
    }

    .alice-carousel__next-btn,
    .alice-carousel__prev-btn {
      position: absolute;
      top: 1rem;
      background: ${({ theme }) => theme.colors.primaryLight + 'd1'};
    }

    .alice-carousel__prev-btn {
      left: 1rem;
      width: unset !important;
      border-radius: 50%;
    }

    .alice-carousel__next-btn {
      border-radius: 50%;
      right: 1rem;
    }

    .carousel-nav-btn {
      color: ${({ theme }) => theme.colors.seaBlue};
      font-size: 2rem;
      border-radius: 50%;
      padding: 0.5rem;
      cursor: pointer;

      &:hover {
        color: #fff;
      }
    }

    .alice-carousel__dots-item {
      background-color: #fff;

      &.__active {
        background-color: ${({ theme }) => theme.colors.seaBlue};
      }
    }
  }

  .overlay {
    background-color: #000;

    .close-slider {
      position: absolute;
      top: 2%;
      right: 2%;
      color: ${({ theme }) => theme.colors.seaBlue};
      font-size: 2rem;
      background-color: ${({ theme }) => theme.colors.primaryLight};
      border-radius: 50%;
      padding: 0.5rem;
      transition: all ease 0.3s;

      &:hover {
        color: #fff;
      }
    }
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
    color: #fff;
  }

  .anticon {
    font-size: 2rem;
    color: #fff;
  }

  &:nth-of-type(1) {
    width: 100%;
  }
`;

S.ScreenshotSlide = styled.div`
  position: relative;
  height: 100%;
  width: 100%;

  .screenshot {
    height: 100% !important;
    z-index: 2;
  }

  .spinner {
    position: absolute;
    top: 50%;
    z-index: 1;
    left: 50%;
    transform: translate(-50%, -50%);
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
