import Router from 'next/router';
import Image from 'next/image';
import Icon from './UI/Icon';
import { useEffect, useState } from 'react';
import NavItems from './NavItems';
import styled from 'styled-components';

function Navigation({ className = '', active }) {
  const [sidebarActive, setSidebarActive] = useState(false);

  return (
    <S.NavContainer className={className}>
      <S.Nav>
        <Image
          src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
          className="logo"
          width={110}
          height={87}
          onClick={() => Router.push('/')}
        />
        <S.NavItems>
          <NavItems active={active} />
        </S.NavItems>
        <S.RightSideNav>
          <Icon
            type="icon-menu"
            className="menu"
            onClick={() => setSidebarActive(true)}
          />
        </S.RightSideNav>
      </S.Nav>

      {/* Overlay */}
      <S.Overlay
        sidebarActive={sidebarActive}
        onClick={() => setSidebarActive(false)}
      >
        {/* Sidebar */}
        <S.Sidebar className={sidebarActive ? 'sidebarActive' : ''}>
          <S.SidebarNavItems>
            <NavItems active={active} />
          </S.SidebarNavItems>
          <Icon
            type="icon-searchclose"
            className="close-sidebar"
            onClick={() => setSidebarActive(false)}
          />
        </S.Sidebar>
      </S.Overlay>
    </S.NavContainer>
  );
}
const S = {};

// -------------------------------------------------- styling ----------------------------------------------
S.NavContainer = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  justify-content: center;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.primary + 'f2'};
`;

S.Nav = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  max-width: 1024px;
  width: 100%;
  padding: 0 0.5rem;

  .logo {
    cursor: pointer;
  }

  @media (min-width: 768px) {
    padding: 0 1.75rem;
  }
`;

S.NavItems = styled.div`
  color: #fff;
  align-items: center;
  font-weight: 600;
  display: none;

  a:not(:first-of-type) {
    margin-left: 40px;
  }

  @media (min-width: 768px) {
    display: flex;
  }
`;

S.RightSideNav = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  .anticon {
    color: #fff;
    cursor: pointer;
    font-size: 1.5rem;
    line-height: 2rem;

    &.menu {
      display: block;
      margin-left: 1.25rem;
    }
  }

  input {
    border-radius: 100px;
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: #fff;
    display: none;
    padding: 0.7rem 2rem;
    border: 0;
    font-size: 16px;
    width: 20rem;
    outline: none;
    padding-left: 2.5rem;
    font-weight: 600;
    transition: all ease 0.3s;
  }

  @media (min-width: 1024px) {
    .anticon.menu {
      display: none;
    }
  }
`;

S.SidebarNavItems = styled.div`
  color: #fff;
  align-items: center;
  font-size: 1.875rem;
  line-height: 2.25rem;
  display: flex;
  flex-direction: column;
  height: 40%;
  justify-content: space-between;
`;

S.Sidebar = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryOpacity90};
  height: 100vh;
  width: 75%;
  position: fixed;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.3s;
  transform: translateX(100%);

  .anticon.close-sidebar {
    position: absolute;
    left: 1rem;
    top: 1rem;
    font-size: 3rem;
    line-height: 1;
    color: #fff;
    cursor: pointer;
  }

  &.sidebarActive {
    transform: translateX(0%);
    transition: all ease 0.3s;
  }
`;

S.Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  inset: 0;
  visibility: ${({ sidebarActive }) => !sidebarActive && 'hidden'};
`;

export default Navigation;
