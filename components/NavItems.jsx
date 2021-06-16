import Router from 'next/router';

function NavItems({ active }) {
  return (
    <>
      <a
        className={(active === 'home' && 'text-[#35bfff]') || ''}
        onClick={() => Router.push('/')}
      >
        Home
      </a>
      <a className={(active === 'game' && 'text-[#35bfff]') || ''}>Game</a>
      <a className={(active === 'services' && 'text-[#35bfff]') || ''}>
        Services
      </a>
      <a className={(active === 'shop' && 'text-[#35bfff]') || ''}>Shop</a>
    </>
  );
}

export default NavItems;
