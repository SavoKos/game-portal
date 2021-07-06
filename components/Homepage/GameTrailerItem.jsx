import styled from 'styled-components';
import Image from 'next/image';
import Icon from '@components/UI/Icon';
import Modal from '@components/UI/Modal';
import Stars from './Stars';
import Link from 'next/link';
import { useState } from 'react';

function GameTrailerItem({ game, changeSlide, currentSlide }) {
  const [isModalActive, setIsModalActive] = useState(false);

  const displayDetailsTitle = () => {
    if (!game?.name_original) return '';

    const fullTitle = game?.name_original;
    const splittedTitle = fullTitle?.slice(fullTitle?.lastIndexOf(' ') + 1);
    return (
      <Link href={'/games/' + game?.slug || ''}>
        <h2>
          {fullTitle?.slice(0, fullTitle?.indexOf(splittedTitle))}
          <span>{splittedTitle}</span>
        </h2>
      </Link>
    );
  };

  const prevSlideHandler = () => {
    if (currentSlide === 0) return;
    changeSlide(currSlide => currSlide - 1);
  };

  const nextSlideHandler = () => {
    changeSlide(currSlide => currSlide + 1);
  };

  const trailerThumbnailSrc = () =>
    'https://res.cloudinary.com/dicynt7ms/image/upload/c_fill,w_1200,h_700,q_100/v1624636050/game-portal/' +
    game?.trailer_thumbnail;

  return (
    <S.GameTrailerItem>
      <S.Image>
        {game?.trailer_thumbnail && (
          <Image src={trailerThumbnailSrc()} objectFit="cover" layout="fill" />
        )}
        <S.PlayBtn onClick={() => setIsModalActive(true)}>
          <Image
            src="https://res.cloudinary.com/dicynt7ms/image/upload/c_fill/v1624627114/game-portal/play-btn_dnzyqo.png"
            objectFit="cover"
            width={150}
            height={150}
            className="play-btn"
          />
        </S.PlayBtn>
        <h1>
          <span>W</span>atch the
          <br />
          Video
        </h1>
        <S.Controls>
          <Icon type="icon--arrowleft" onClick={prevSlideHandler} />
          <Icon type="icon-iov-arrow-right" onClick={nextSlideHandler} />
        </S.Controls>
      </S.Image>
      <Modal
        active={isModalActive}
        closeModal={() => setIsModalActive(false)}
        className="trailer"
      >
        <h1 className="loading">
          {game.trailer
            ? 'Loading...'
            : 'We could not find trailer for this game'}
        </h1>
        <iframe
          src={(isModalActive && game.trailer) || ''}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Modal>
      <S.Details>
        <h1>
          <span>V</span>IDEO GAME
        </h1>
        {displayDetailsTitle() || ''}
        <p className="description">{game?.description_raw}</p>
        <hr />
        <S.Tags>
          {game?.tags?.slice(0, 5).map(tag => (
            <p className="tag" key={tag.id}>
              {tag.name}
            </p>
          ))}
        </S.Tags>
        <S.Rating>
          <div className="rating-circle">
            <h3>{game?.rating}</h3>
          </div>
          <div>
            <Stars rating={+Math.trunc(game?.rating)} />
          </div>
        </S.Rating>
      </S.Details>
    </S.GameTrailerItem>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.GameTrailerItem = styled.div`
  display: flex;
  transition: all ease 0.3s;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

S.Image = styled.div`
  position: relative;
  width: 100%;
  min-height: 400px;

  @media (min-width: 1024px) {
    min-height: 650px;
    width: 60%;
  }

  &::after {
    position: absolute;
    content: '';
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background: linear-gradient(to bottom, #03002357 0%, #0300237d 100%);
  }

  h1 {
    width: fit-content;
    position: absolute;
    top: 70%;
    z-index: 10;
    left: 0%;
    font-size: 24px;
    transform: translate(-0%, -70%) rotate(-90deg);
    text-transform: uppercase;
    color: #fff;
    text-align: right;

    @media (min-width: 768px) {
      font-size: 44px;
    }

    span {
      color: ${({ theme }) => theme.colors.seaBlue};
    }
  }
`;

S.PlayBtn = styled.div`
  position: absolute;
  width: 80px;
  height: 80px;
  top: 50%;
  z-index: 10;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;

  @media (min-width: 768px) {
    height: 150px;
    width: 150px;
  }
`;

S.Controls = styled.div`
  display: flex;
  align-items: center;
  border-radius: 100px;
  border: 2px solid #fff;
  position: absolute;
  left: 95%;
  top: 95%;
  transform: translate(-95%, -95%);
  z-index: 10;

  .anticon {
    color: #fff;
    cursor: pointer;
    font-size: 18px;

    &:hover {
      color: ${({ theme }) => theme.colors.seaBlue};
    }
  }

  .anticon:nth-of-type(1) {
    padding: 3px 15px 3px 10px;
    border-right: 1px solid #b6b6b6;
  }

  .anticon:nth-of-type(2) {
    padding: 3px 10px 3px 15px;
  }
`;

S.Details = styled.div`
  padding: 3rem;
  width: 100%;
  color: #fff;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    min-height: 650px;
    width: 50%;
  }

  @media (min-width: 1400px) {
    padding: 100px;
    width: 40%;
  }

  hr {
    margin: 2rem 0;
    border: 1px solid #3a3a3a;
  }

  span {
    color: ${({ theme }) => theme.colors.seaBlue};
  }

  h2 {
    font-size: 35px;
    font-weight: 400;
    margin: 20px 0;
    cursor: pointer;
  }

  .description {
    margin-bottom: 1.5rem;
  }
`;

S.Tags = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-weight: 300;

  .tag {
    flex: 1 1 auto;
    width: 33.333333%;
    font-family: ${({ theme }) => theme.fontFamily.poppins};
    margin: 0.3rem;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    font-weight: 400;
    transition: all ease 0.3s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.seaBlue};
    }
  }
`;

S.Rating = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3rem;

  .rating-circle {
    background-color: ${({ theme }) => theme.colors.seaBlue};
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    display: grid;
    place-items: center;
    margin: 0 1.25rem;

    h3 {
      color: #fff;
      font-weight: 700;
    }
  }
`;

export default GameTrailerItem;
