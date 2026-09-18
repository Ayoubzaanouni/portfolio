import { describe, expect, it } from 'vitest';
import { richTextToHtml } from './richText';

describe('richTextToHtml', () => {
  it('escapes plain text', () => {
    expect(richTextToHtml('a < b & c > "d" \'e\'')).toBe(
      'a &lt; b &amp; c &gt; &quot;d&quot; &#39;e&#39;',
    );
  });

  it('wraps **text** in <b> with the highlight class', () => {
    expect(richTextToHtml('a **bold** b', 'purple')).toBe(
      'a <b class="purple">bold</b> b',
    );
  });

  it('wraps *text* in <b> without a class', () => {
    expect(richTextToHtml('a *bold* b')).toBe('a <b>bold</b> b');
  });

  it('converts newlines to <br />', () => {
    expect(richTextToHtml('line1\nline2')).toBe('line1<br />line2');
  });

  it('escapes text inside bold/highlight tokens too', () => {
    expect(richTextToHtml('**<script>**')).toBe('<b>&lt;script&gt;</b>');
  });

  it('handles empty/undefined input', () => {
    expect(richTextToHtml()).toBe('');
    expect(richTextToHtml('')).toBe('');
  });

  it('handles a mix of tokens in one string', () => {
    expect(richTextToHtml('Hi **there**,\nI use *Symfony*.', 'hl')).toBe(
      'Hi <b class="hl">there</b>,<br />I use <b>Symfony</b>.',
    );
  });
});
