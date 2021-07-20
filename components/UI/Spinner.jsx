import styled from 'styled-components';

function Spinner({ className }) {
  return (
    <S.Spinner className={`spinner ${className}`}>
      <div></div>
      <div></div>
    </S.Spinner>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    position: absolute;
    border: 4px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: spinner 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;

    &:nth-child(2) {
      animation-delay: -0.5s;
    }
  }

  @keyframes spinner {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

export default Spinner;
