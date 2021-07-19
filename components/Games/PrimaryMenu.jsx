import Icon from '@components/UI/Icon';
import useFilters from 'context/Filters';
import { CSSTransition } from 'react-transition-group';
import { v4 as uuid } from 'uuid';

function PrimaryMenu({
  activeMenu,
  options,
  setActiveMenu,
  calcHeight,
  setSubPlatforms,
  title,
}) {
  const { setOrder } = useFilters();

  const dropdownItemClicked = filter => {
    if (filter.subOptions) return setActiveMenu(filter.name);
    console.log(options, activeMenu);
    if (title !== 'Platforms') setOrder(filter);
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
