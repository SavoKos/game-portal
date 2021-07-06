import Navigation from '@components/Navigation';
import Image from 'next/image';
import Router from 'next/router';
import styled from 'styled-components';
import Head from 'next/head';

function error({ errorCode }) {
  const displayErrorCode = () => {
    const errorCodeArray = errorCode.split('');
    return errorCodeArray.map((digit, i) => {
      return (
        <S.ErrorDigit digitInx={i} key={i}>
          {digit}
        </S.ErrorDigit>
      );
    });
  };

  return (
    <>
      <Head>
        <title>{'Error - Game Portal'}</title>
      </Head>
      <S.ErrorPageContainer>
        <Navigation className="navigation" />
        <S.MainContent>
          <Image
            src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623853800/game-portal/pngkit_assassin-png_503045_gbeww0.png"
            layout="fill"
            objectFit="cover"
            className="hero-bg"
          />
          {displayErrorCode()}
          <S.ErrorText>
            <h1>Oops!</h1>
            <h5>Error</h5>
          </S.ErrorText>
          <button onClick={() => Router.push('/')}>Home page</button>
        </S.MainContent>
      </S.ErrorPageContainer>
    </>
  );
}

error.getInitialProps = ({ query: { errorCode } }) => {
  return {
    errorCode: errorCode || '404',
  };
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.ErrorPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  background-image: url('https://res.cloudinary.com/dicynt7ms/image/upload/v1623851827/game-portal/errorBg_lnrwfj.png');
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  .navigation {
    align-self: flex-start;
  }
`;

S.MainContent = styled.div`
  min-width: 24rem;
  position: relative;
  display: flex;
  height: 60%;
  align-items: center;
  color: #fff;
  justify-content: center;

  .hero-img {
    z-index: 10;
  }

  button {
    position: absolute;
    bottom: -2.5rem;
    font-size: 1.125rem;
    line-height: 1.75rem;
    border: 1px solid #fff;
    padding: 0.5rem 2rem;
    border-radius: 100px;
    cursor: pointer;
  }

  @media (min-width: 1024px) {
    width: 32rem;
  }
`;

S.ErrorText = styled.div`
  position: absolute;
  right: -2.5rem;
  top: 1rem;
  text-align: right;
  letter-spacing: 0.05em;

  h1 {
    font-weight: 400;
  }

  h5 {
    color: rgb(156, 163, 175);
    font-weight: 700;
    letter-spacing: 0.05em;
  }
`;

S.ErrorDigit = styled.h1`
  font-family: ${({ theme }) => theme.fontFamily.poppins};
  font-size: 12rem;
  font-weight: 600;
  position: relative;
  &::first-of-type {
    z-index: 0;
  }

  &:nth-of-type(2) {
    color: ${({ theme }) => theme.colors.seaBlue};
    z-index: 20;
  }

  &:nth-of-type(3) {
    z-index: 20;
  }

  @media (min-width: 1024px) {
    font-size: 21rem;
  }
`;

export default error;
