import Icon from '@components/UI/Icon';
import useFilters from 'context/Filters';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

function PrimaryMenu({
  activeMenu,
  options,
  setActiveMenu,
  calcHeight,
  title,
}) {
  const { setOrder, setParentPlatforms, setPlatforms, setPage, setGames } =
    useFilters();

  const dropdownItemClicked = filter => {
    if (filter.subOptions) return setActiveMenu(filter.name);
    setPage(1);
    setGames(null);
    if (title !== 'Platforms') return setOrder(filter);
    setParentPlatforms(filter);
    setPlatforms(null);
  };

  const dropdownItems = options.map(filter => (
    <li onClick={() => dropdownItemClicked(filter)} key={uuid()}>
      {filter.name}
      {filter.subOptions && <Icon type="icon-youluPC_common_arrow_th1" />}
    </li>
  ));

  return (
    <CSSTransition
      in={activeMenu === 'main'}
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
    >
      <div className="dropdown-menu">
        <ul>{dropdownItems}</ul>
      </div>
    </CSSTransition>
  );
}

export default PrimaryMenu;
