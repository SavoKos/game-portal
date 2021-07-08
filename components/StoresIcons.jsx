import Icon from '@components/UI/Icon';
import Router from 'next/router';
import styled from 'styled-components';

// takes one store e.g. steam and converts it into icon sutable name like icon-steam
// 1. ID - Steam
// 2. ID - Xbox Store
// 3. ID - Playstation
// 4. ID - App store - iOS
// 5. ID - Gog
// 6. ID - Nintendo
// 7. ID - Xbox 360 store
// 8. ID - Play Store - Android
// 9. ID - itch.io
// 11. ID - Epic Games

function StoresIcons({ storesArray = null }) {
  if (!storesArray) return '';

  const stores = storesArray.map(store => {
    switch (store.store_id) {
      case 1:
        return { icon: 'icon-steam', name: 'Steam', url: store.url };
      case 2:
        return { icon: 'icon-xbox', name: 'Xbox Store', url: store.url };
      case 3:
        return {
          icon: 'icon-playstation',
          name: 'Playstation Store',
          url: store.url,
        };
      case 4:
        return {
          icon: 'icon-AppStore16',
          name: 'App Store - iOS',
          url: store.url,
        };
      case 5:
        return {
          icon: 'icon-gog',
          name: 'Gog',
          url: store.url,
        };
      case 6:
        return {
          icon: 'icon-nintendo-switch',
          name: 'Nintendo Store',
          url: store.url,
        };
      case 7:
        return {
          icon: 'icon-xbox',
          name: 'Xbox 360 Store',
          url: store.url,
        };
      case 8:
        return {
          icon: 'icon-GooglePlaylogo',
          name: 'Google Play',
          url: store.url,
        };
      case 9:
        return {
          icon: 'icon-itch-io',
          name: 'itch.io',
          url: store.url,
        };
      case 11:
        return {
          icon: 'icon-cib-epic-games',
          name: 'Epic Games',
          url: store.url,
        };
    }
  });

  return (
    <S.Stores>
      {stores.map(store => (
        <S.StoreItem onClick={() => Router.push(store.url)}>
          <Icon type={store.icon} key={store.name} />
          <h3>{store.name}</h3>
        </S.StoreItem>
      ))}
    </S.Stores>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};

S.Stores = styled.div`
  flex-wrap: wrap;
  width: 100%;
  display: flex;
`;

S.StoreItem = styled.div`
  padding: 1rem 2rem;
  display: grid;
  place-items: center;
  background-color: #070426bf;
  border-radius: 0.5rem;
  transition: ease all 0.3s;
  cursor: pointer;
  width: fit-content;
  color: #fff;
  width: fit-content;
  margin: 0.1rem;
  flex: 1 1 auto;
  text-align: center;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.seaBlue};
  }

  .anticon {
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }
`;

export default StoresIcons;
