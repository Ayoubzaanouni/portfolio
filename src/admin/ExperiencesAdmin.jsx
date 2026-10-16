import s from './Admin.module.scss';
import CrudAdmin from './CrudAdmin';

const englishFields = [
  { name: 'job_title', label: 'Job title', required: true },
  { name: 'company', label: 'Company', required: true },
  { name: 'company_logo_url', label: 'Company logo', type: 'image' },
  { name: 'location', label: 'Location' },
  {
    name: 'dates',
    label: 'Dates',
    hint: 'Free text, e.g. Feb 2024 - May 2024 · 4 months',
  },
  { name: 'description', label: 'Description', type: 'textarea' },
  {
    name: 'skills',
    label: 'Skills',
    type: 'tags',
    hint: 'Comma separated',
  },
];

const translatedFields = ['job_title', 'location', 'dates', 'description', 'skills'];
const fields = englishFields.flatMap((field) => translatedFields.includes(field.name)
  ? [
      { ...field, label: `${field.label} (English)` },
      { ...field, name: `${field.name}_fr`, label: `${field.label} (Français)`, required: false,
        hint: 'Optional. Leave empty to use a built-in translation or the English text.' },
    ]
  : [field]);

const ExperiencesAdmin = () => (
  <CrudAdmin
    table="experiences"
    itemLabel="experience"
    fields={fields}
    summarize={(row) => ({
      title: `${row.job_title} · ${row.company}`,
      subtitle: row.dates,
      thumb: row.company_logo_url && (
        <img className={s.thumb} src={row.company_logo_url} alt="" />
      ),
    })}
  />
);

export default ExperiencesAdmin;
