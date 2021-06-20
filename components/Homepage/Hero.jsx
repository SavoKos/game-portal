import styled from 'styled-components';

function Hero() {
  return (
    <S.HeroContainer id="hero">
      <S.Hero>
        <h3>GAME PORTAL</h3>
        <S.Triangle />
        <h4>Place to find your favorite games</h4>
      </S.Hero>
    </S.HeroContainer>
  );
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.HeroContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  z-index: 10;
  position: relative;
  background-image: url('https://res.cloudinary.com/dicynt7ms/image/upload/f_webp/v1623090716/game-portal/home-hero_zdjvsv.png');
  background-position: center;
`;

S.Hero = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;

  h3 {
    font-weight: 700;
    text-align: center;
  }
`;

S.Triangle = styled.div`
  margin-bottom: 8rem;
  position: relative;
  transform: scale(6) rotate(180deg);
  width: 23px;
  height: 0px;
  border-left: 1px solid transparent;
  border-bottom: 1px solid;
  left: 46%;
  display: block;
  box-sizing: border-box;
  border-right: 1px solid transparent;

  &::before {
    display: block;
    box-sizing: border-box;
    border-right: 1px solid transparent;
    content: '';
    position: absolute;
    width: 19px;
    height: 19px;
    border-left: 1px solid;
    border-top: 1px solid;
    border-bottom: 1px solid transparent;
    transform: rotate(45deg) skew(10deg, 10deg);
    left: 1px;
    bottom: -10px;
  }
`;

export default Hero;
