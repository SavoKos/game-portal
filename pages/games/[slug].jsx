import Spinner from '@components/UI/Spinner';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

function Game({ game, errorCode }) {
  const [loading, setLoading] = useState(true);
  const isError = errorCode >= 200 && errorCode <= 226 ? false : true;

  useEffect(() => {
    console.log(errorCode);
    if (isError) Router.push('/error');
    setLoading(false);
  }, []);

  if (loading || isError)
    return (
      <S.Error>
        <Spinner />
      </S.Error>
    );

  return <h1>{game?.name_original}</h1>;
}

Game.getInitialProps = async ({ query: { slug } }) => {
  const res = await fetch(
    encodeURI(
      `https://api.rawg.io/api/games/${slug}?key=ffc0c5b2524a475993fa130a0f55334c`
    )
  );
  const isError = res.status >= 200 && res.status <= 226 ? false : true;
  if (isError) return { errorCode: res.status };

  const data = await res.json();
  return {
    game: data,
    errorCode: res.status,
  };
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Error = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Game;
