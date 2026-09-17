import s from './Projects.module.scss';
import { getProjects } from '../../api/content';
import Preloader from '../../components/UIElements/Preloader/Preloader';
import { useAsync } from '../../hooks/useAsync';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import ProjectCard from './ProjectCard/ProjectCard';

const Projects = () => {
  const { data: projects, loading } = useAsync(getProjects);

  return (
    <BaseLayout>
      {loading && <Preloader />}
      <div className={s.content}>
        <h1 className={s.title}>
          Recent <strong className={s.purple}>Projects</strong>
        </h1>
        <p className={s.subtitle}>
          Take a look at some of my recent work.
        </p>

        <ul className={s.projects}>
          {(projects ?? []).map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </ul>
      </div>
    </BaseLayout>
  );
};

export default Projects;
