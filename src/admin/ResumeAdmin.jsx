import { useEffect, useRef, useState } from 'react';
import { getProfileRow, saveProfile, uploadFile } from '../api/content';
import Button from '../components/UIElements/Button/Button';
import s from './Admin.module.scss';
import { notifyError, notifySaved } from './notify';

const versions = [['en', 'English'], ['fr', 'Français']];

const ResumeVersion = ({ language, label, profile, onSaved }) => {
  const currentUrl = profile?.[`resume_${language}_url`] ||
    (language === 'en' ? profile?.resume_url : null);
  const currentFilename = profile?.[`resume_${language}_filename`] ||
    (language === 'en' ? profile?.resume_filename : '') || '';
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState(currentFilename);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef();

  const submit = async (event) => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const values = { [`resume_${language}_filename`]: filename.trim() || file?.name || null };
      if (file) {
        const signature = await file.slice(0, 5).text();
        if (signature !== '%PDF-') throw new Error('Please select a valid PDF file.');
        // Unique paths keep each language independent and avoid overwriting a live CV
        // if saving the profile fails after uploading.
        const path = `resume-${language}-${crypto.randomUUID()}.pdf`;
        values[`resume_${language}_url`] = await uploadFile('documents', file, path);
      }
      const saved = await saveProfile(values);
      onSaved(saved);
      setFilename(saved[`resume_${language}_filename`] || '');
      setFile(null);
      inputRef.current.value = '';
      notifySaved(`${label} resume updated`);
    } catch (error) {
      notifyError(error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className={`${s.card} ${s.form}`} onSubmit={submit}>
      <h2>{label}</h2>
      <div className={s.field}>
        <label>Current resume</label>
        {currentUrl ? (
          <a className={s.purple} href={currentUrl} target="_blank" rel="noreferrer">
            {currentFilename || 'Open resume'}
          </a>
        ) : <span className={s.muted}>None uploaded yet</span>}
      </div>
      <div className={s.field}>
        <label htmlFor={`resume-${language}-file`}>Upload a new PDF</label>
        <input
          ref={inputRef}
          id={`resume-${language}-file`}
          type="file"
          accept="application/pdf,.pdf"
          disabled={busy}
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        />
      </div>
      <div className={s.field}>
        <label htmlFor={`resume-${language}-filename`}>Download file name</label>
        <input
          id={`resume-${language}-filename`}
          value={filename}
          disabled={busy}
          placeholder={`CV_Your_Name_${language}.pdf`}
          onChange={(event) => setFilename(event.target.value)}
        />
      </div>
      <div className={s.actions}>
        <Button type="submit" className="primary" disabled={busy}>
          {busy ? 'Uploading…' : `Save ${label}`}
        </Button>
      </div>
    </form>
  );
};

const ResumeAdmin = () => {
  const [profile, setProfile] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProfileRow().then(setProfile).catch((error) => {
      setError(true);
      notifyError(error);
    });
  }, []);

  if (error) return <p role="alert">Unable to load resumes. Please reload to try again.</p>;
  if (profile === undefined) return <p className={s.muted}>Loading…</p>;

  return (
    <>
      <p className={s.muted}>Upload each language separately. Visitors can choose English or French.</p>
      {versions.map(([language, label]) => (
        <ResumeVersion key={language} language={language} label={label} profile={profile} onSaved={setProfile} />
      ))}
    </>
  );
};

export default ResumeAdmin;
