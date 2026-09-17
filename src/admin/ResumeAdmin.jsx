import { useEffect, useState } from 'react';
import { getProfileRow, saveProfile, uploadFile } from '../api/content';
import Button from '../components/UIElements/Button/Button';
import s from './Admin.module.scss';
import { notifyError, notifySaved } from './notify';

const ResumeAdmin = () => {
  const [profile, setProfile] = useState(undefined);
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getProfileRow()
      .then((row) => {
        setProfile(row);
        setFilename(row?.resume_filename ?? '');
      })
      .catch(notifyError);
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const values = { resume_filename: filename || null };
      if (file) {
        const url = await uploadFile('documents', file, 'resume.pdf');
        // Cache-bust so visitors get the new file right away.
        values.resume_url = `${url}?v=${Date.now()}`;
        if (!filename) values.resume_filename = file.name;
      }
      setProfile(await saveProfile(values));
      setFile(null);
      notifySaved('Resume updated');
    } catch (error) {
      notifyError(error);
    } finally {
      setBusy(false);
    }
  };

  if (profile === undefined) return <p className={s.muted}>Loading…</p>;

  return (
    <form className={`${s.card} ${s.form}`} onSubmit={submit}>
      <div className={s.field}>
        <label>Current resume</label>
        {profile?.resume_url ? (
          <a
            className={s.purple}
            href={profile.resume_url}
            target="_blank"
            rel="noreferrer"
          >
            {profile.resume_filename || 'Open resume'}
          </a>
        ) : (
          <span className={s.muted}>None uploaded yet</span>
        )}
      </div>

      <div className={s.field}>
        <label htmlFor="resume-file">Upload a new PDF</label>
        <input
          id="resume-file"
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="resume-filename">Download file name</label>
        <input
          id="resume-filename"
          value={filename}
          placeholder="CV_Your_Name.pdf"
          onChange={(e) => setFilename(e.target.value)}
        />
      </div>

      <div className={s.actions}>
        <Button type="submit" className="primary" disabled={busy}>
          {busy ? 'Uploading…' : 'Save'}
        </Button>
      </div>
    </form>
  );
};

export default ResumeAdmin;
