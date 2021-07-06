import styled from 'styled-components';

const { default: Navigation } = require('@components/Navigation');

function Games() {
  return (
    <S.PageContainer>
      <Navigation active="games" />
      <h1>This is games page</h1>
    </S.PageContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  min-height: 100vh;
`;

export default Games;
