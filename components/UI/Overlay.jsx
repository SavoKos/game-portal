import styled from 'styled-components';

const Overlay = props => {
  return props.active && <S.Overlay onClick={props.onClick}></S.Overlay>;
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 55;
  background-color: #000000c0;
`;

export default Overlay;
