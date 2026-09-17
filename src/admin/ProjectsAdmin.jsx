import s from './Admin.module.scss';
import CrudAdmin from './CrudAdmin';

const fields = [
  { name: 'title', label: 'Title', required: true },
  { name: 'description', label: 'Description', type: 'textarea' },
  { name: 'image_url', label: 'Image', type: 'image' },
  { name: 'site_url', label: 'Live site URL', type: 'url' },
  { name: 'repo_url', label: 'Repository URL', type: 'url' },
  {
    name: 'technologies',
    label: 'Technologies',
    type: 'tags',
    hint: 'Comma separated, e.g. #react, #ionic',
  },
];

const ProjectsAdmin = () => (
  <CrudAdmin
    table="projects"
    itemLabel="project"
    fields={fields}
    summarize={(row) => ({
      title: row.title,
      subtitle: row.description,
      thumb: row.image_url && (
        <img className={s.thumb} src={row.image_url} alt="" />
      ),
    })}
  />
);

export default ProjectsAdmin;
