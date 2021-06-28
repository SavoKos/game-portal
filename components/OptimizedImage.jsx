import ProgressiveImage from 'react-progressive-image';
import Image from 'next/image';

function OptimizedImage(props) {
  const { img, placeholder } = props;
  return (
    <ProgressiveImage src={img} placeholder={placeholder}>
      {src => <Image {...props} src={img} alt="Game Portal" />}
    </ProgressiveImage>
  );
}

export default OptimizedImage;
