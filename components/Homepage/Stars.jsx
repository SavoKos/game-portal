import Icon from '@components/UI/Icon';
import { v4 as uuid } from 'uuid';

function Stars({ rating = null }) {
  if (!rating) return '';

  const starsArray = new Array(5).fill(
    <Icon
      type="icon-Halfstarssvg"
      className="text-[#535068] text-xl md:text-2xl"
      key={uuid()}
    />
  );
  console.log(starsArray);
  for (let i = 0; i < rating; i++)
    starsArray[i] = (
      <Icon
        key={i}
        type="icon-Halfstarssvg"
        className="text-seaBlue text-xl md:text-2xl"
      />
    );

  return starsArray;
}

export default Stars;
