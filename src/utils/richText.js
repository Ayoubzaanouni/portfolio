// Renders admin-edited text: **purple highlight**, *bold*, and newlines as
// line breaks. Returns a safe HTML string for use with Astro's `set:html`
// (each plain-text segment is escaped; only the wrapper tags are literal).
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g;

const escapeHtml = (text) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const richTextToHtml = (text = '', highlightClass) =>
  text
    .split(TOKEN)
    .filter(Boolean)
    .map((part) => {
      if (part === '\n') return '<br />';
      if (part.startsWith('**') && part.endsWith('**')) {
        const cls = highlightClass ? ` class="${highlightClass}"` : '';
        return `<b${cls}>${escapeHtml(part.slice(2, -2))}</b>`;
      }
      if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
        return `<b>${escapeHtml(part.slice(1, -1))}</b>`;
      }
      return escapeHtml(part);
    })
    .join('');
