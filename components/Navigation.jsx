import Image from 'next/image';
import Icon from './UI/Icon';

function Navigation() {
  return (
    <div className="fixed flex w-full  justify-center bg-primary z-50">
      <nav className="justify-between items-center flex max-w-screen-2xl w-full">
        <Image
          src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623090690/game-portal/logo_pj7xg0.png"
          width={110}
          height={87}
        />
        <div className="text-white flex items-center font-semibold">
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
            type="icon-loupe"
            className="text-white text-2xl lg:text-base cursor-pointer"
          />
        </div>

        <div className="text-white flex items-center cursor-pointer">
          <p className="mr-2">Eng</p>
          <Icon type="icon-iov-arrow-down" />
        </div>
        <Icon
          type="icon-basket"
          className="text-white text-2xl cursor-pointer"
        />
      </nav>
    </div>
  );
}

export default Navigation;
