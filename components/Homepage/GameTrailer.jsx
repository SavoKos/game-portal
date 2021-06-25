import styled from 'styled-components';
import GameTrailerItem from './GameTrailerItem';

function GameTrailer({ customGameData: { gtav, cyberpunk, valhalla } }) {
  return (
    <S.VideoContainer>
      <GameTrailerItem game={cyberpunk} />
    </S.VideoContainer>
  );
}

export default GameTrailer;

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.VideoContainer = styled.div`
  padding: 5rem 0;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;

  .modal,
  iframe {
    width: 90vw;
    height: 95vh;
  }
`;
