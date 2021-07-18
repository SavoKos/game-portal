import Icon from '@components/UI/Icon';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

function PrimaryMenu({
  activeMenu,
  options,
  setFilter,
  setActiveMenu,
  calcHeight,
  setSubPlatforms,
}) {
  const dropdownItemClicked = filter => {
    if (filter.subOptions) return setActiveMenu(filter.name);
    setFilter(filter);
    setSubPlatforms('');
  };

  return (
    <CSSTransition
      in={activeMenu === 'main'}
      unmountOnExit
      timeout={500}
      classNames="menu-primary"
      onEnter={calcHeight}
    >
      <div className="dropdown-menu">
        <ul>
          {options.map(filter => (
            <li onClick={() => dropdownItemClicked(filter)} key={uuid()}>
              {filter.name}
              {filter.subOptions && (
                <Icon type="icon-youluPC_common_arrow_th1" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </CSSTransition>
  );
}

export default PrimaryMenu;
