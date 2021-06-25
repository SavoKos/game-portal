import styled from 'styled-components';
import Image from 'next/image';
import Icon from '@components/UI/Icon';
import Modal from '@components/UI/Modal';
import Stars from './Stars';
import { useState } from 'react';

function GameTrailerItem({ game }) {
  const [isModalActive, setIsModalActive] = useState(false);

  const displayDetailsTitle = () => {
    if (!game?.name_original) return '';

    const fullTitle = game?.name_original;
    const splittedTitle = fullTitle?.slice(fullTitle?.lastIndexOf(' ') + 1);
    console.log(splittedTitle);
    return (
      <h2>
        {fullTitle?.slice(0, fullTitle?.indexOf(splittedTitle))}
        <span>{splittedTitle}</span>
      </h2>
    );
  };

  return (
    <>
      <S.Image>
        {game?.trailer_thumbnail && (
          <Image
            src={game?.trailer_thumbnail}
            objectFit="cover"
            layout="fill"
          />
        )}
        <S.PlayBtn onClick={() => setIsModalActive(true)}>
          <Image
            src="https://res.cloudinary.com/dicynt7ms/image/upload/v1624627114/game-portal/play-btn_dnzyqo.png"
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
          <Icon type="icon--arrowleft" />
          <Icon type="icon-iov-arrow-right" />
        </S.Controls>
      </S.Image>
      <Modal active={isModalActive} closeModal={() => setIsModalActive(false)}>
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
    </>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Image = styled.div`
  position: relative;
  min-height: 650px;
  width: 60%;

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
    transform: translate(-0%, -70%) rotate(-90deg);
    text-transform: uppercase;
    color: #fff;
    text-align: right;

    span {
      color: ${({ theme }) => theme.colors.seaBlue};
    }
  }
`;

S.PlayBtn = styled.div`
  position: absolute;
  height: 150px;
  width: 150px;
  top: 50%;
  z-index: 10;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
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
  padding: 100px;
  width: 40%;
  color: #fff;

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
  }

  .description {
    height: 66px;
    overflow: hidden;
    text-overflow: ellipsis;
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
