import { Link } from 'react-router-dom';
import { routes } from '../../routes/RootRoutes';
import s from './Logo.module.scss';

const Logo = ({ className }) => {
  return (
    <div className={className}>
      <Link to={routes.Home} aria-label="site logo">
        <img style={
          {
            width: '60px',
            height: '60px',
            paddingTop: '10px',
          }
        } src="https://res.cloudinary.com/deiimmbyt/image/upload/v1735083206/logo_eyier3.png" alt="logo" className={s.logo} />
      </Link>
    </div>
  );
};

export default Logo;
