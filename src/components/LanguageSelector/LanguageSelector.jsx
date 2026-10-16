import { useLanguage } from '../../hooks/languageHook/LanguageContext';
import s from './LanguageSelector.module.scss';

const LanguageSelector = ({ compact = false }) => {
  const { language, changeLanguage } = useLanguage();
  return (
    <label className={`${s.selector} ${compact ? s.compact : ''}`}>
      <span>{language === 'fr' ? 'Langue' : 'Language'}</span>
      <select value={language} onChange={(event) => changeLanguage(event.target.value)}>
        <option value="en" lang="en">{compact ? 'EN' : 'English'}</option>
        <option value="fr" lang="fr">{compact ? 'FR' : 'Français'}</option>
      </select>
    </label>
  );
};

export default LanguageSelector;
