import { useTranslation } from '../../../i18n/useTranslation';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import handIcon from '../../../assets/hand.png';
import homeMainIcon from '../../../assets/bureau.png';
import Typewriter from '../../../components/UIElements/Typewriter/Typewriter';
import s from './MainSection.module.scss';

const MainSection = () => {
  const { t, language } = useTranslation();
  return (
    <section className={s.content}>
      <div className={s.header}>
        <div className={s.greetingContainer}>
          <h2 className={s.title}>
            {t('Hi There!')}
          </h2>
          <img 
            alt=""
            src={handIcon} 
            className={s.handIcon} 
          />
        </div>

        <h1 className={s.mainTitle}>
          {t('I’M')}
          <strong className={s.mainName}> AYOUB ZAANOUNI</strong>
        </h1>

        <div className={s.typewriter}>
          <Typewriter
            key={language}
            strings={[
              'Software Engineer',
              'Continuously Learning',
              'Solving Problems',
              'Pushing Boundaries',
              'Building Solutions'
            ].map(t)}
            wrapperClassName={s.typewriterInner}
            cursorClassName={s.typewriterCursor}
          />
        </div>
      </div>

      <div style={
        {
          paddingLeft: '170px',
        }
      } className={s.spacer} />


      <LazyLoadImage
        alt={t('Portfolio illustration')}
        effect="blur"
        src={homeMainIcon}
        width="350"
        height="350"
      />
    </section>
  );
};

export default MainSection;
