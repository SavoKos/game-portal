import Router from 'next/router';
import styled from 'styled-components';

function NavItems({ active }) {
  return (
    <>
      <S.NavItem active={active === 'home'} onClick={() => Router.push('/')}>
        Home
      </S.NavItem>
      <S.NavItem active={active === 'game'}>Game</S.NavItem>
      <S.NavItem active={active === 'services'}>Services</S.NavItem>
      <S.NavItem active={active === 'shop'}>Shop</S.NavItem>
    </>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.NavItem = styled.a`
  color: ${({ active, theme }) => (active ? theme.colors.seaBlue : '#fff')};
`;

export default NavItems;
