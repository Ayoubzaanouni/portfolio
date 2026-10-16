import { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import DownloadIcon from '../../assets/download.svg?react';
import Button from '../../components/UIElements/Button/Button';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import { getProfile } from '../../api/content';
import { useAsync } from '../../hooks/useAsync';
import s from './Resume.module.scss';
import { useLanguage } from '../../hooks/languageHook/LanguageContext';
import { selectResume } from '../../hooks/languageHook/language.mjs';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

const messages = {
  en: {
    title: 'My Resume', download: 'Download Resume', loading: 'Loading...',
    unavailable: 'Resume currently unavailable.',
    error: 'Unable to display the resume. Please use the download link above.',
    pageLoading: 'Loading page...',
    fallback: 'The English version is not available yet. Showing the French CV.',
  },
  fr: {
    title: 'Mon CV', download: 'Télécharger le CV', loading: 'Chargement…',
    unavailable: 'Le CV est actuellement indisponible.',
    error: 'Impossible d’afficher le CV. Utilisez le lien de téléchargement ci-dessus.',
    pageLoading: 'Chargement de la page…',
    fallback: 'La version française n’est pas encore disponible. Le CV anglais est affiché.',
  },
};

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Resume = () => {
  const { data: profile, loading } = useAsync(getProfile);
  const { language } = useLanguage();
  const text = messages[language];
  const resume = selectResume(profile, language);
  const resumeLink = resume.url;
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const pdfWrapper = useRef(null);

  useEffect(() => {
    const wrapper = pdfWrapper.current;
    const observer = new ResizeObserver(([entry]) => {
      setPageWidth(Math.min(1000, Math.floor(entry.contentRect.width)));
    });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  return (
    <BaseLayout>
      <div className={s.content} lang={language}>
        <div className={s.header}>
          <h1 className={s.title}>{text.title}</h1>
        </div>

        <LanguageSelector />
        {!loading && resume.language && resume.language !== language && (
          <p className={s.languageNotice} role="status">{text.fallback}</p>
        )}

        {resumeLink && (
          <Button style={{ margin: 'auto', width: '15rem' }} className="primary">
            <a
              href={resumeLink}
              download={resume.filename}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon fill="#fff" />
              <span className={s.downloadText}>{text.download}</span>
            </a>
          </Button>
        )}

        <div ref={pdfWrapper} className={s.pdfWrapper}>
          {loading && <p className={s.loadingIndicator} role="status">{text.loading}</p>}
          {!loading && !resumeLink && <p role="status">{text.unavailable}</p>}
          {resumeLink && pageWidth > 0 && (
            <Document
              key={`${language}:${resumeLink}`}
              file={resumeLink}
              onLoadSuccess={({ numPages: count }) => setNumPages(count)}
              loading={<p className={s.loadingIndicator} role="status">{text.loading}</p>}
              error={<p role="alert">{text.error}</p>}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={pageWidth}
                  className={s.pdfPage}
                  loading={<p role="status">{text.pageLoading}</p>}
                  error={<p role="alert">{text.error}</p>}
                />
              ))}
            </Document>
          )}
        </div>
      </div>
    </BaseLayout>
  );
};

export default Resume;
