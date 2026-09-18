import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

const SCRIPT_SRC = 'https://www.google.com/recaptcha/api.js?render=explicit';

let scriptPromise;
const loadScript = () => {
  if (window.grecaptcha) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      window.__onRecaptchaLoad = resolve;
      const script = document.createElement('script');
      script.src = `${SCRIPT_SRC}&onload=__onRecaptchaLoad`;
      script.async = true;
      script.defer = true;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
};

// Thin wrapper around Google's reCAPTCHA v2 checkbox widget (no third-party
// React binding, just the official grecaptcha.render API). Exposes
// getValue()/reset() to match how the contact form uses it.
const Recaptcha = forwardRef(({ sitekey }, ref) => {
  const containerRef = useRef();
  const widgetId = useRef(null);

  useEffect(() => {
    let cancelled = false;
    loadScript().then(() => {
      if (cancelled || !containerRef.current || widgetId.current !== null) return;
      widgetId.current = window.grecaptcha.render(containerRef.current, {
        sitekey,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [sitekey]);

  useImperativeHandle(ref, () => ({
    getValue: () =>
      widgetId.current === null
        ? ''
        : window.grecaptcha.getResponse(widgetId.current),
    reset: () => {
      if (widgetId.current !== null) window.grecaptcha.reset(widgetId.current);
    },
  }));

  return <div ref={containerRef} />;
});

Recaptcha.displayName = 'Recaptcha';

export default Recaptcha;
