import Error from './error';

export default function Custom500() {
  return <Error errorCode="500" />;
}
