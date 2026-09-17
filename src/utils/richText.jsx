import { Fragment } from 'react';

// Renders admin-edited text: **purple highlight**, *bold*, and
// newlines as line breaks.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\n)/g;

export const RichText = ({ text = '', highlightClassName }) =>
  text
    .split(TOKEN)
    .filter(Boolean)
    .map((part, i) => {
      if (part === '\n') return <br key={i} />;
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <b key={i} className={highlightClassName}>
            {part.slice(2, -2)}
          </b>
        );
      }
      if (part.length > 2 && part.startsWith('*') && part.endsWith('*')) {
        return <b key={i}>{part.slice(1, -1)}</b>;
      }
      return <Fragment key={i}>{part}</Fragment>;
    });
