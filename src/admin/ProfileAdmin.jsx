import { useEffect, useState } from 'react';
import { getProfileRow, saveProfile } from '../api/content';
import Button from '../components/UIElements/Button/Button';
import defaultProfile from '../data/profile';
import s from './Admin.module.scss';
import Field from './Field';
import { notifyError, notifySaved } from './notify';

const PARAGRAPH_HINT =
  'Separate paragraphs with an empty line. **text** = purple highlight, *text* = bold.';

const englishFields = [
  {
    name: 'intro_paragraphs',
    label: 'Home page introduction',
    type: 'textarea',
    hint: PARAGRAPH_HINT,
  },
  {
    name: 'about_paragraphs',
    label: 'About me text',
    type: 'textarea',
    hint: PARAGRAPH_HINT,
  },
  {
    name: 'hobbies',
    label: 'Hobbies',
    type: 'textarea',
    hint: 'One per line',
  },
  { name: 'avatar_url', label: 'Home page photo', type: 'image' },
  { name: 'linkedin_url', label: 'LinkedIn URL', type: 'url' },
  { name: 'github_url', label: 'GitHub URL', type: 'url' },
];

const translatedFields = ['intro_paragraphs', 'about_paragraphs', 'hobbies'];
const fields = englishFields.flatMap((field) => translatedFields.includes(field.name)
  ? [
      { ...field, label: `${field.label} (English)` },
      { ...field, name: `${field.name}_fr`, label: `${field.label} (Français)`,
        hint: `${field.hint} Optional: empty fields use a built-in translation or English.` },
    ]
  : [field]);

const toForm = (profile) => ({
  intro_paragraphs: profile.intro_paragraphs.join('\n\n'),
  about_paragraphs: profile.about_paragraphs.join('\n\n'),
  hobbies: profile.hobbies.join('\n'),
  intro_paragraphs_fr: (profile.intro_paragraphs_fr ?? []).join('\n\n'),
  about_paragraphs_fr: (profile.about_paragraphs_fr ?? []).join('\n\n'),
  hobbies_fr: (profile.hobbies_fr ?? []).join('\n'),
  avatar_url: profile.avatar_url ?? '',
  linkedin_url: profile.linkedin_url ?? '',
  github_url: profile.github_url ?? '',
});

const splitParagraphs = (text) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

const fromForm = (form) => ({
  intro_paragraphs_fr: splitParagraphs(form.intro_paragraphs_fr),
  about_paragraphs_fr: splitParagraphs(form.about_paragraphs_fr),
  hobbies_fr: form.hobbies_fr.split('\n').map((h) => h.trim()).filter(Boolean),
  intro_paragraphs: splitParagraphs(form.intro_paragraphs),
  about_paragraphs: splitParagraphs(form.about_paragraphs),
  hobbies: form.hobbies
    .split('\n')
    .map((h) => h.trim())
    .filter(Boolean),
  avatar_url: form.avatar_url || null,
  linkedin_url: form.linkedin_url || null,
  github_url: form.github_url || null,
});

const ProfileAdmin = () => {
  const [form, setForm] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getProfileRow()
      .then((row) => setForm(toForm(row ?? defaultProfile)))
      .catch(notifyError);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await saveProfile(fromForm(form));
      notifySaved();
    } catch (error) {
      notifyError(error);
    } finally {
      setBusy(false);
    }
  };

  if (!form) return <p className={s.muted}>Loading…</p>;

  return (
    <form className={`${s.card} ${s.form}`} onSubmit={submit}>
      {fields.map((field) => (
        <Field
          key={field.name}
          field={field}
          value={form[field.name]}
          onChange={(value) =>
            setForm((prev) => ({ ...prev, [field.name]: value }))
          }
        />
      ))}
      <div className={s.actions}>
        <Button type="submit" className="primary" disabled={busy}>
          {busy ? 'Saving…' : 'Save profile'}
        </Button>
      </div>
    </form>
  );
};

export default ProfileAdmin;
