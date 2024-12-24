import { useEffect, useRef, useState } from 'react';
import DownloadIcon from '../../assets/download.svg?react';
import Button from '../../components/UIElements/Button/Button';
import BaseLayout from '../../layouts/BaseLayout/BaseLayout';
import s from './Resume.module.scss';

const resumeLink =
  'https://raw.githubusercontent.com/Ayoubzaanouni/Me/main/CV_ZAANOUNI_Ayoub_en.pdf';

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);
  const pdfWrapper = useRef(null);

  // Handle loading state change when the iframe content is loaded
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <BaseLayout>
      <div className={s.content}>
        <div className={s.header}>
          <h1 className={s.title}>
            My Resume
          </h1>
        </div>

        <Button
          style={{ margin: 'auto', width: '15rem' }}
          className="primary"
        >
          <a href={resumeLink} download="CV_ZAANOUNI_Ayoub_en.pdf">
            <DownloadIcon fill="#fff" />
            <span className={s.downloadText}> download resume</span>
            <span className={s.filename}></span>
          </a>
        </Button>

        <div
          ref={pdfWrapper}
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            height: '130vh',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          {isLoading && (
            <div className={s.loadingIndicator} style={{ fontSize: '1.5rem' }}>
              <span>Loading...</span>
            </div>
          )}

          <iframe
            src={`https://mozilla.github.io/pdf.js/web/viewer.html?file=${resumeLink}`}
            width="80%"
            height="100%"
            title="CV"
            style={{
              border: 'none',
              maxWidth: '1000px',
            }}
            onLoad={handleIframeLoad}
          />
        </div>

        <br />
        <br />
        <Button
          style={{ margin: 'auto', width: '15rem' }}
          className="primary"
        >
          <a href={resumeLink} download="CV_ZAANOUNI_Ayoub_en.pdf">
            <DownloadIcon fill="#fff" />
            <span className={s.downloadText}> download resume</span>
            <span className={s.filename}></span>
          </a>
        </Button>
      </div>
    </BaseLayout>
  );
};

export default Resume;