import { useState } from 'react';
import { uploadFile } from '../api/content';
import { getIcon, iconKeys } from '../utils/iconRegistry';
import s from './Admin.module.scss';
import { notifyError } from './notify';

// One form input. Supported types: text, url, textarea, tags,
// image, select, icon.
const Field = ({ field, value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const id = `field-${field.name}`;

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      onChange(await uploadFile('images', file));
    } catch (error) {
      notifyError(error);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  let input;
  switch (field.type) {
    case 'textarea':
      input = (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
      break;

    case 'select':
      input = (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {field.options.map(([optionValue, label]) => (
            <option key={optionValue} value={optionValue}>
              {label}
            </option>
          ))}
        </select>
      );
      break;

    case 'icon': {
      const Icon = getIcon(value);
      input = (
        <>
          <select
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">(no icon, show name)</option>
            {iconKeys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          {Icon && (
            <div className={s.iconPreview}>
              <Icon />
            </div>
          )}
        </>
      );
      break;
    }

    case 'image':
      input = (
        <>
          <input
            id={id}
            type="url"
            placeholder="https://… or upload a file below"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={upload}
            disabled={uploading}
          />
          {uploading && <span className={s.muted}>Uploading…</span>}
          {value && !uploading && (
            <img className={s.preview} src={value} alt="" />
          )}
        </>
      );
      break;

    default:
      input = (
        <input
          id={id}
          type={field.type === 'url' ? 'url' : 'text'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={field.required}
        />
      );
  }

  return (
    <div className={s.field}>
      <label htmlFor={id}>{field.label}</label>
      {input}
      {field.hint && <span className={s.muted}>{field.hint}</span>}
    </div>
  );
};

export default Field;
