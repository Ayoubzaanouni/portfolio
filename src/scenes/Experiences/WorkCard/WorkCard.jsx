import s from './WorkCard.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const WorkCard = ({ id, companyLogo, jobTitle, company, location, dates, description, skills }) => {
  const locationContext = useLocation();

  return (
    <li className={s.card}>
      <div className={s.cardWrapper}>
        <div className={s.logoContainer}>
          <Link
            to={`/experience/${id}`}
            state={{ background: locationContext }}
          >
            <LazyLoadImage
              alt="company-logo"
              effect="blur"
              src={companyLogo}
              width="100%"
              height="auto"  // Ensure the image maintains its aspect ratio
              style={{ objectFit: 'contain' }} // Prevents cropping
            />
          </Link>
        </div>

        <div className={s.cardBody}>
          <h3 className={s.title}>{jobTitle}</h3>
          <h4 className={s.company}>{company}</h4>
          <p className={s.dates}>{dates}</p>
          <p className={s.location}>{location}</p>
          <p className={s.description}>{description}</p>
          <br />
          <p className={s.skills}>
            <strong>Skills:</strong> {skills.join(', ')}
          </p>
        </div>
      </div>
    </li>
  );
};

export default WorkCard;
