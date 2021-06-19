import Router from 'next/router';
import Image from 'next/image';
import Icon from './UI/Icon';
import { useEffect, useState } from 'react';
import NavItems from './NavItems';
import styled from 'styled-components';

function Navigation({ className = '', active }) {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => scrollHandler(), []);

  const scrollHandler = e => {
    const callback = (entries, _) => {
      entries.forEach(ent => {
        if (!ent.isIntersecting) setIsScrolled(true);
        if (ent.isIntersecting) setIsScrolled(false);
      });
    };

    const observer = new IntersectionObserver(callback, options);
    const target = document.querySelector('#hero');
    if (!target) return;

    let options = {
      root: null,
      threshold: 0.1,
    };

    observer.observe(target);
  };

  return (
    <S.NavContainer className={className} isScrolled={isScrolled}>
      <S.Nav>
        <Image
          src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
          className="logo"
          width={110}
          height={87}
          onClick={() => Router.push('/')}
        />
        <S.NavItems className="space-x-10">
          <NavItems active={active} />
        </S.NavItems>
        <S.RightSideNav>
          <input type="search" placeholder="Search" />
          <Icon
            type="icon-menu"
            className="menu"
            onClick={() => setSidebarActive(true)}
          />
          <Icon type="icon-loupe" className="loupe" />
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
  background-color: ${({ theme, isScrolled }) =>
    isScrolled ? theme.colors.primary : 'transparent'};
`;

S.Nav = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  max-width: 1024px;
  width: 100%;
  padding: 0 1.75rem;

  .logo {
    cursor: pointer;
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
    padding: 0.5rem 2rem;
    width: 20rem;
    outline: none;
    padding-left: 2.5rem;
    font-weight: 600;
  }

  @media (min-width: 1024px) {
    input {
      display: block;
      margin-left: -1.75rem;
    }

    .anticon.loupe {
      font-size: 1rem;
      line-height: 1.5rem;
    }

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
