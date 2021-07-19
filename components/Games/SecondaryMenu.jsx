import Icon from '@components/UI/Icon';
import useFilters from 'context/Filters';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

function SecondaryMenu({
  menuName,
  options,
  setActiveMenu,
  activeMenu,
  calcHeight,
}) {
  const { setPlatforms, setParentPlatforms } = useFilters();

  const filterObject = options.filter(option => option.name === menuName);

  const backButton = (
    <li className="back" onClick={() => setActiveMenu('main')}>
      Go Back
      <Icon type="icon--arrowleft" className="back-icon" />
    </li>
  );

  const selectAllButton = (
    <li
      className="select-all"
      onClick={() => {
        setParentPlatforms(filterObject[0]);
        setPlatforms(null);
      }}
    >
      Select All
    </li>
  );

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
          {backButton}
          {filterObject
            .flatMap(option => option.subOptions)
            .map(filter => (
              <li
                onClick={() => {
                  setPlatforms(filter);
                  setParentPlatforms(null);
                }}
                key={uuid()}
              >
                {filter.name}
              </li>
            ))}
          {selectAllButton}
        </ul>
      </S.DropdownMenu>
    </CSSTransition>
  );
}

// -------------------------------------------------- styling ----------------------------------------------

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
