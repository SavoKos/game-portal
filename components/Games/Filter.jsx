import Icon from '@components/UI/Icon';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SecondaryMenu from './SecondaryMenu';
import PrimaryMenu from './PrimaryMenu';

function Filter(props) {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);

  useEffect(() => {
    return setDropdownOpened(false);
  }, [props.options]);

  const calcHeight = e => {
    const height = e.offsetHeight;
    setMenuHeight(height);
  };

  const filterName = (
    <span style={{ fontWeight: '600' }}>{props.currentFilter?.name || ''}</span>
  );
  return (
    <S.Filter>
      <S.FilterName onClick={() => setDropdownOpened(!dropdownOpened)}>
        <p>
          {props.title}: {filterName}
        </p>
        <Icon type="icon-iov-arrow-down" />
      </S.FilterName>

      {dropdownOpened && (
        <S.DropdownContainer style={{ height: menuHeight }}>
          <PrimaryMenu
            {...props}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            calcHeight={calcHeight}
          />
          <SecondaryMenu
            {...props}
            menuName="PlayStation"
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            calcHeight={calcHeight}
          />

          <SecondaryMenu
            {...props}
            menuName="Xbox"
            setActiveMenu={setActiveMenu}
            activeMenu={activeMenu}
            calcHeight={calcHeight}
            menuHeight={menuHeight}
          />
        </S.DropdownContainer>
      )}
    </S.Filter>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Filter = styled.div`
  position: relative;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  color: #fff;
  cursor: pointer;
  width: 50%;
  z-index: 10;

  &:nth-of-type(1) {
    margin-right: 0.5rem;
  }
`;

S.FilterName = styled.div`
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (min-width: 400px) {
    padding: 0.5rem 1rem;
  }

  @media (min-width: 900px) {
    padding: 1rem 2rem;
  }

  p {
    font-size: 0.8rem;
    width: 100%;

    @media (min-width: 500px) {
      font-size: 1.05rem;
    }
  }
`;

S.DropdownContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border-radius: 0.3rem;
  top: 4rem;
  left: 0;
  width: 100%;
  overflow: hidden;
  transition: all ease 500ms;
`;

export default Filter;
