import test from 'node:test';
import assert from 'node:assert/strict';
import { detectLanguage, isLanguage, selectResume } from '../src/hooks/languageHook/language.mjs';

test('automatic language uses the primary browser preference', () => {
  assert.equal(detectLanguage(['fr-FR', 'en-US']), 'fr');
  assert.equal(detectLanguage(['FR-ca']), 'fr');
  assert.equal(detectLanguage(['en-GB', 'fr']), 'en');
  assert.equal(detectLanguage(['de-DE']), 'en');
  assert.equal(detectLanguage([]), 'en');
});

test('only supported manual preferences are accepted', () => {
  assert.ok(isLanguage('en'));
  assert.ok(isLanguage('fr'));
  for (const value of ['de', 'FR', '', null, undefined]) assert.equal(isLanguage(value), false);
});

const profile = {
  resume_en_url: 'https://example.com/en.pdf', resume_en_filename: 'English.pdf',
  resume_fr_url: 'https://example.com/fr.pdf', resume_fr_filename: 'French.pdf',
  resume_url: 'https://example.com/legacy.pdf', resume_filename: 'Legacy.pdf',
};

test('preview and download select matching CV and filename for each language', () => {
  assert.deepEqual(selectResume(profile, 'fr'), { url: profile.resume_fr_url, filename: 'French.pdf', language: 'fr' });
  assert.deepEqual(selectResume(profile, 'en'), { url: profile.resume_en_url, filename: 'English.pdf', language: 'en' });
});

test('old single-CV records remain available as English', () => {
  const legacy = { resume_url: profile.resume_url, resume_filename: 'Legacy.pdf' };
  assert.deepEqual(selectResume(legacy, 'en'), { url: profile.resume_url, filename: 'Legacy.pdf', language: 'en' });
  assert.equal(selectResume(legacy, 'fr').language, 'en');
});

test('missing requested version falls back to the available language', () => {
  assert.equal(selectResume({ resume_en_url: 'en.pdf' }, 'fr').language, 'en');
  assert.equal(selectResume({ resume_fr_url: 'fr.pdf' }, 'en').language, 'fr');
  assert.equal(selectResume({ resume_fr_url: 'fr.pdf' }, 'fr').filename, 'cv-fr.pdf');
  assert.equal(selectResume(null, 'fr').language, null);
  assert.equal(selectResume({}, 'en').url, undefined);
});
