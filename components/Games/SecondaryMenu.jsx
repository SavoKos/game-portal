import Icon from '@components/UI/Icon';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

function SecondaryMenu({
  menuName,
  setFilter,
  options,
  setActiveMenu,
  activeMenu,
  calcHeight,
  setSubPlatforms,
}) {
  const updateFilter = (mainPlatform, subPlatform) => {
    setSubPlatforms(subPlatform);
    setFilter(mainPlatform);
  };

  const filterObject = options.filter(option => option.name === menuName);
  console.log(filterObject);
  return (
    <CSSTransition
      in={activeMenu === menuName}
      unmountOnExit
      timeout={500}
      classNames="menu-secondary"
      onEnter={calcHeight}
    >
      <S.DropdownMenu className="dropdown-menu">
        <ul>
          <li className="back" onClick={() => setActiveMenu('main')}>
            Go Back
            <Icon type="icon--arrowleft" className="back-icon" />
          </li>
          {filterObject
            .flatMap(option => option.subOptions)
            .map(filter => (
              <li onClick={() => updateFilter('', filter)} key={uuid()}>
                {filter.name}
              </li>
            ))}
          <li
            className="select-all"
            onClick={() => updateFilter(filterObject[0], '')}
          >
            Select All
          </li>
        </ul>
      </S.DropdownMenu>
    </CSSTransition>
  );
}

const S = {};
S.DropdownMenu = styled.div`
  .anticon {
    all: unset;
    font-size: 19px;
    padding-right: 0.5rem;
  }

  ul li {
    &.back {
      display: flex;
      flex-direction: row-reverse;
      justify-content: flex-end;
    }

    &.select-all {
      background-color: ${({ theme }) => theme.colors.primaryLight};
      color: #fff;
      transition: all ease 0.3s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        border-radius: 0;
      }
    }
  }
`;

export default SecondaryMenu;
