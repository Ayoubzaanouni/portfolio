import { getIcon } from '../utils/iconRegistry';
import s from './Admin.module.scss';
import CrudAdmin from './CrudAdmin';

const categories = [
  ['skill', 'Professional skillset'],
  ['tool', 'Tools I use'],
];

const englishFields = [
  { name: 'name', label: 'Name', required: true },
  {
    name: 'category',
    label: 'Section',
    type: 'select',
    options: categories,
    defaultValue: 'skill',
  },
  { name: 'icon_key', label: 'Icon', type: 'icon' },
];

const translatedFields = ['name'];
const fields = englishFields.flatMap((field) => translatedFields.includes(field.name)
  ? [
      { ...field, label: `${field.label} (English)` },
      { ...field, name: `${field.name}_fr`, label: `${field.label} (Français)`, required: false,
        hint: 'Optional. Leave empty to use a built-in translation or the English text.' },
    ]
  : [field]);

const SkillsAdmin = () => (
  <CrudAdmin
    table="skills"
    itemLabel="skill"
    fields={fields}
    summarize={(row) => {
      const Icon = getIcon(row.icon_key);
      return {
        title: row.name,
        subtitle: Object.fromEntries(categories)[row.category],
        thumb: <span className={s.thumb}>{Icon && <Icon />}</span>,
      };
    }}
  />
);

export default SkillsAdmin;
