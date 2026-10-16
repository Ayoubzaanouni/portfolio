// Exact English text is the key: editing a source text cannot leave a stale
// built-in French translation attached to unrelated content.
import translations from './content-fr.mjs';

const translateText = (text) => Object.hasOwn(translations, text) ? translations[text] : text;

const nonEmpty = (value) => Array.isArray(value) ? value.length > 0 :
  typeof value === 'string' && value.trim().length > 0;

export const localizeContent = (row, language, fields) => {
  if (!row || language !== 'fr') return row;
  return {
    ...row,
    ...Object.fromEntries(fields.map((field) => {
      const french = row[`${field}_fr`];
      const original = row[field];
      const value = nonEmpty(french) ? french : Array.isArray(original) ?
        original.map(translateText) : translateText(original);
      return [field, value];
    })),
  };
};
