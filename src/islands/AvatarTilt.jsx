import Tilt from 'react-parallax-tilt';

const AvatarTilt = ({ src, alt = 'avatar' }) => (
  <Tilt>
    <img src={src} alt={alt} loading="lazy" decoding="async" />
  </Tilt>
);

export default AvatarTilt;
