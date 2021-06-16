import Router from 'next/router';
import Image from 'next/image';
import Icon from './UI/Icon';
import { useEffect, useState } from 'react';

function Navigation() {
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
    let options = {
      root: null,
      threshold: 0.1,
    };

    observer.observe(target);
  };

  return (
    <div
      className={`fixed flex w-full  justify-center bg-primary z-50 ${
        isScrolled ? 'bg-opacity-80' : 'bg-opacity-0'
      }`}
    >
      <nav className="justify-between items-center flex max-w-screen-lg w-full px-7">
        <Image
          src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
          className="cursor-pointer"
          width={110}
          height={87}
          onClick={() => Router.push('/')}
        />
        <div className="text-white items-center font-semibold hidden md:flex">
          <a className="mr-8 ml-8 text-[#35bfff]">Home</a>
          <a className="mr-8 ml-8">Game</a>
          <a className="mr-8 ml-8">Services</a>
          <a className="mr-8 ml-8">Shop</a>
        </div>
        <div className="relative flex items-center flex-row-reverse">
          <input
            type="search"
            placeholder="Search"
            className="rounded-full bg-primaryLight text-white hidden lg:block py-2 w-80 px-8 outline-none pl-10 font-semibold lg:-ml-7"
          />
          <Icon
            type="icon-menu"
            className="text-white block md:hidden text-2xl ml-5"
            onClick={() => setSidebarActive(true)}
          />
          <Icon
            type="icon-loupe"
            className="text-white text-2xl lg:text-base cursor-pointer"
          />
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`bg-black bg-opacity-75 fixed inset-0 ${
          !sidebarActive && 'invisible'
        }`}
      >
        {/* Sidebar */}
        <div
          className={`bg-primary bg-opacity-90 h-screen w-3/4 fixed right-0 flex items-center justify-center transition-all duration-300 transform translate-x-full ${
            sidebarActive && 'sidebarActive'
          }`}
        >
          <div className="text-white items-center text-3xl flex flex-col h-2/5 justify-between">
            <a className="text-[#35bfff]">Home</a>
            <a>Game</a>
            <a>Services</a>
            <a>Shop</a>
          </div>
          <Icon
            type="icon-searchclose"
            className="absolute left-4 top-4 text-5xl text-white cursor-pointer"
            onClick={() => setSidebarActive(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
