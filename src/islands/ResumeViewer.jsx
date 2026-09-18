import { useEffect, useRef, useState } from 'react';
import DownloadIcon from '../assets/download.svg?react';
import s from '../scenes/Resume/Resume.module.scss';

const getIframeHeight = () =>
  typeof window === 'undefined' ? '80vh' : window.innerWidth < 600 ? '60vh' : '80vh';

const ResumeViewer = ({ resumeUrl, resumeFilename }) => {
  const [isLoading, setIsLoading] = useState(true);
  const pdfWrapper = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (pdfWrapper.current) pdfWrapper.current.style.height = getIframeHeight();
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {resumeUrl && (
        <a
          href={resumeUrl}
          download={resumeFilename || 'resume.pdf'}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            width: '15rem',
            padding: '0.375rem 0.75rem',
            borderRadius: '0.25rem',
            color: 'var(--btn-primary-txt)',
            backgroundColor: 'var(--btn)',
            border: '1px solid var(--btn)',
          }}
        >
          <DownloadIcon fill="#fff" />
          <span className={s.downloadText}> Download Resume</span>
        </a>
      )}

      <div
        ref={pdfWrapper}
        style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          overflow: 'hidden',
          height: getIframeHeight(),
        }}
      >
        {isLoading && (
          <div className={s.loadingIndicator}>
            <span>Loading...</span>
          </div>
        )}

        {resumeUrl && (
          <iframe
            src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${encodeURIComponent(resumeUrl)}`}
            width="80%"
            height="100%"
            title="CV"
            style={{ border: 'none', maxWidth: '1000px' }}
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>
    </>
  );
};

export default ResumeViewer;
