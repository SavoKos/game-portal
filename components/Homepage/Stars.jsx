import Icon from '@components/UI/Icon';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

function Stars({ rating = null }) {
  if (!rating) return '';

  const starsArray = [
    <S.RatingStar
      type="icon-Halfstarssvg"
      className="star gray"
      key={uuid()}
    />,
    <S.RatingStar
      type="icon-Halfstarssvg"
      className="star gray"
      key={uuid()}
    />,
    <S.RatingStar
      type="icon-Halfstarssvg"
      className="star gray"
      key={uuid()}
    />,
    <S.RatingStar
      type="icon-Halfstarssvg"
      className="star gray"
      key={uuid()}
    />,
    <S.RatingStar
      type="icon-Halfstarssvg"
      className="star gray"
      key={uuid()}
    />,
  ];

  for (let i = 0; i < rating; i++)
    starsArray[i] = (
      <S.RatingStar key={i} type="icon-Halfstarssvg" className="star blue" />
    );

  return starsArray;
}

// -------------------------------------------------- styling ----------------------------------------------
const S = {};
S.RatingStar = styled(Icon)`
  font-size: 1.25rem;
  line-height: 1.75rem;

  &.blue {
    color: ${({ theme }) => theme.colors.seaBlue};
  }

  &.gray {
    color: #535068;
  }

  @media (min-width: 768px) {
    .star {
      font-size: 1.5rem;
      line-height: 2rem;
    }
  }
`;

export default Stars;
