import Icon from '@components/UI/Icon';
import styled from 'styled-components';
import AdvancedOptions from './AdvancedOptions';

function AdvancedOptionsSidebar({ sidebarActive, setSidebarActive }) {
  const advancedOptionsStyle = {
    display: sidebarActive ? 'block' : 'none',
    position: 'absolute',
    width: '100%',
  };

  return (
    <>
      <S.AdvancedOptionsSidebar className={sidebarActive ? 'active' : ''}>
        <AdvancedOptions style={advancedOptionsStyle} />
        <Icon
          type="icon--arrowleft"
          className="close-slider"
          onClick={() => setSidebarActive(false)}
        />
      </S.AdvancedOptionsSidebar>
    </>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.AdvancedOptionsSidebar = styled.div`
  position: fixed;
  height: 100%;
  width: 80%;
  z-index: 60;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.primaryOpacity90};
  overflow-y: auto;
  overflow-x: hidden;
  transition: all ease 0.5s;
  transform: translateX(-130%);

  &.active {
    transform: translateX(0);
  }

  .close-slider {
    position: absolute;
    right: 0rem;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    background-color: ${({ theme }) => theme.colors.seaBlue};
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.3rem;
  }
`;

export default AdvancedOptionsSidebar;
