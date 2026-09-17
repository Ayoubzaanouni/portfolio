import s from './Experiences.module.scss';
import { getExperiences } from '../../api/content';
import Preloader from '../../components/UIElements/Preloader/Preloader';
import { useAsync } from '../../hooks/useAsync';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import WorkCard from './WorkCard/WorkCard';

const Experiences = () => {
  const { data: experiences, loading } = useAsync(getExperiences);

  return (
    <BaseLayout>
      {loading && <Preloader />}
      <div className={s.content}>
        <h1 className={s.title}>
          My work <strong className={s.purple}>Experiences</strong>
        </h1>

        <ul className={s.projects}>
          {(experiences ?? []).map((experience) => (
            <WorkCard key={experience.id} {...experience} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default Experiences;
