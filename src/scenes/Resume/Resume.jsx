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

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

const Resume = () => {
  const { data: profile, loading } = useAsync(getProfile);
  const resumeLink = profile?.resume_url;
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
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>My Resume</h1>
        </div>

        {resumeLink && (
          <Button style={{ margin: 'auto', width: '15rem' }} className="primary">
            <a
              href={resumeLink}
              download={profile?.resume_filename || 'resume.pdf'}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon fill="#fff" />
              <span className={s.downloadText}> Download Resume</span>
            </a>
          </Button>
        )}

        <div ref={pdfWrapper} className={s.pdfWrapper}>
          {loading && <p className={s.loadingIndicator} role="status">Loading...</p>}
          {!loading && !resumeLink && <p role="status">Resume currently unavailable.</p>}
          {resumeLink && pageWidth > 0 && (
            <Document
              key={resumeLink}
              file={resumeLink}
              onLoadSuccess={({ numPages: count }) => setNumPages(count)}
              loading={<p className={s.loadingIndicator} role="status">Loading...</p>}
              error={<p role="alert">Unable to display the resume. Please use the download link above.</p>}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={index + 1}
                  pageNumber={index + 1}
                  width={pageWidth}
                  className={s.pdfPage}
                  loading={<p role="status">Loading page...</p>}
                  error={<p role="alert">Unable to display this page. Please use the download link above.</p>}
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
