import { createContext, useContext, useEffect, useState } from 'react';
import { detectLanguage, isLanguage, LANGUAGE_STORAGE_KEY } from './language.mjs';

const LanguageContext = createContext(null);

const initialLanguage = () => {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(stored)) return stored;
  } catch {
    // Language selection still works when browser storage is unavailable.
  }
  return detectLanguage(navigator.languages?.length ? navigator.languages : [navigator.language]);
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(initialLanguage);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'fr'
      ? 'Ayoub Zaanouni | Développeur back-end PHP / Symfony'
      : 'Ayoub Zaanouni | Back-end Developer (PHP/Symfony)';
  }, [language]);

  const changeLanguage = (value) => {
    if (!isLanguage(value)) return;
    setLanguage(value);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, value);
    } catch {
      // Keep the selection for this session even if it cannot be persisted.
    }
  };
  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
