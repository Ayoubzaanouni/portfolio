import { useTranslation } from '../../i18n/useTranslation';
import Snap from '../../assets/snap-code.png';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import { getProfile } from '../../api/content';
import { useAsync } from '../../hooks/useAsync';
import s from './About.module.scss';
import AboutTextCard from './AboutTextCard/AboutTextCard';
import GithubActivity from './GithubActivity/GithubActivity';
import TechSkills from './TechSkills/TechSkills';
import ToolsUsed from './ToolsUsed/ToolsUsed';
const About = () => {
  const { t, localize } = useTranslation();
  const { data } = useAsync(getProfile);
  const profile = localize(data, ['about_paragraphs', 'hobbies']);

  return (
    <BaseLayout>
      <div className={s.content}>
        <div className={s.about}>
          <div className={s.aboutDescription}>
            <h1 className={s.title}>
              {t('Learn More')} <b className={s.purple}>{t('About Me')}</b>
            </h1>
            <AboutTextCard profile={profile} />
          </div>

          <div className={s.aboutImg}>
            <img src={Snap} alt={t('Profile photo')} />
          </div>
        </div>

        <h2 className={s.skills}>
          {t('Professional')} <b className={s.purple}>{t('Skillset')}</b>
        </h2>
        <TechSkills />

        <h2 className={s.skills}>
          <b className={s.purple}>{t('Tools')}</b> {t('I Use')}
        </h2>

      <ToolsUsed />

        <a href={profile?.github_url}>
          <h2 className={s.githubActivity}>
            {t('My')} <b className={s.purple}>{t('Coding')}</b> {t('Journey')}
          </h2>
        
          <GithubActivity />
        </a>
      </div>
    </BaseLayout>
  );
};

export default About;
