export const LANGUAGE_STORAGE_KEY = 'portfolio-resume-language';
export const isLanguage = (value) => value === 'en' || value === 'fr';

export const detectLanguage = (languages = []) =>
  String(languages[0] || 'en').toLowerCase().split('-')[0] === 'fr' ? 'fr' : 'en';

export const selectResume = (profile, language) => {
  const versions = {
    en: {
      url: profile?.resume_en_url || profile?.resume_url,
      filename: profile?.resume_en_filename || profile?.resume_filename || 'resume-en.pdf',
    },
    fr: {
      url: profile?.resume_fr_url,
      filename: profile?.resume_fr_filename || 'cv-fr.pdf',
    },
  };
  const availableLanguage = versions[language]?.url ? language :
    (versions.en.url ? 'en' : versions.fr.url ? 'fr' : null);
  return { ...(versions[availableLanguage] || {}), language: availableLanguage };
};
