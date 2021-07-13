import styled from 'styled-components';

const Overlay = ({ active, onClick, className, children }) => {
  return (
    <S.Overlay onClick={onClick} className={className} active={active}>
      {children}
    </S.Overlay>
  );
};

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Overlay = styled.div`
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  opacity: ${({ active }) => (active ? '100' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 55;
  background-color: #000000c0;
  transition: all ease 0.3s;
`;

export default Overlay;
