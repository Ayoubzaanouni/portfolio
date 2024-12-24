import s from './Experiences.module.scss';
import experiences from '../../data/experiences'; 
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import WorkCard from './WorkCard/WorkCard';

const Experiences = () => {
  return (
    <BaseLayout>
      <div className={s.content}>
        <h1 className={s.title}>
          My work <strong className={s.purple}>Experiences</strong>
        </h1>

        <ul className={s.projects}>
          {experiences.map((experience) => (
            <WorkCard key={experience.id} {...experience} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default Experiences;
