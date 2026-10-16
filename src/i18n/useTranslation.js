import { useLanguage } from '../hooks/languageHook/LanguageContext';
import { translate } from './messages.mjs';
import { localizeContent } from './content.mjs';

export const useTranslation = () => {
  const { language } = useLanguage();
  return {
    language,
    t: (text) => translate(text, language),
    localize: (row, fields) => localizeContent(row, language, fields),
  };
};
