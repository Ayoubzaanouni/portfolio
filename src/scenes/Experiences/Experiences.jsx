import { useTranslation } from '../../i18n/useTranslation';
import s from './Experiences.module.scss';
import { getExperiences } from '../../api/content';
import Preloader from '../../components/UIElements/Preloader/Preloader';
import { useAsync } from '../../hooks/useAsync';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import WorkCard from './WorkCard/WorkCard';

const Experiences = () => {
  const { t, localize } = useTranslation();
  const { data: experiences, loading } = useAsync(getExperiences);

  return (
    <BaseLayout>
      {loading && <Preloader />}
      <div className={s.content}>
        <h1 className={s.title}>
          {t('My work')} <strong className={s.purple}>{t('Experiences')}</strong>
        </h1>

        <ul className={s.projects}>
          {(experiences ?? []).map((experience) => (
            <WorkCard key={experience.id} {...localize(experience, ['job_title', 'location', 'dates', 'description', 'skills'])} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default Experiences;
