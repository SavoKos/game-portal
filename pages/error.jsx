import Navigation from '@components/Navigation';
import Image from 'next/image';
import Router from 'next/router';

function error({ errorCode = '404' }) {
  const displayErrorCode = () => {
    const errorCodeArray = errorCode.split('');
    console.log(errorCodeArray);
    return errorCodeArray.map((digit, i) => {
      return (
        <h1
          key={i}
          className={`font-poppins text-12rem lg:text-21rem font-semibold  relative ${
            i === 0 && 'z-0'
          }  ${i === 1 && 'text-seaBlue z-20'} ${i === 2 && 'z-20'}`}
        >
          {digit}
        </h1>
      );
    });
  };

  return (
    <div className="bg-primary h-screen error-bg relative flex items-center justify-center">
      <Navigation className=" self-start" />
      <div
        className="relative flex lg:w-32rem h-3/5 items-center text-white justify-center"
        style={{ minWidth: '24rem' }}
      >
        <Image
          src="https://res.cloudinary.com/dicynt7ms/image/upload/v1623853800/game-portal/pngkit_assassin-png_503045_gbeww0.png"
          layout="fill"
          objectFit="cover"
          className="z-10"
        />
        {displayErrorCode()}
        <div className="absolute -right-10 top-4 text-right tracking-wider">
          <h1 className="font-normal">Oops!</h1>
          <h5 className="text-gray-400 font-bold tracking-wider">Error</h5>
        </div>
        <button
          className="absolute -bottom-10 text-lg border border-white px-8 py-2 rounded-full cursor-pointer"
          onClick={() => Router.push('/')}
        >
          Home page
        </button>
      </div>
    </div>
  );
}

export default error;
