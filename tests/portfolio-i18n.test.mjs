import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { localizeContent } from '../src/i18n/content.mjs';
import { frenchUi, translate } from '../src/i18n/messages.mjs';

const loadData = async (name) => (await import('data:text/javascript;base64,' +
  Buffer.from(fs.readFileSync(new URL(`../src/data/${name}.js`, import.meta.url))).toString('base64'))).default;

test('all UI translation calls have French translations', () => {
  const walk = (dir) => fs.readdirSync(dir, {withFileTypes:true}).flatMap(entry =>
    entry.isDirectory() ? walk(path.join(dir,entry.name)) : [path.join(dir,entry.name)]);
  for (const file of walk('src').filter(file => file.endsWith('.jsx'))) {
    const source=fs.readFileSync(file,'utf8');
    for (const match of source.matchAll(/\bt\((['"])(.*?)\1\)/g)) {
      assert.ok(Object.hasOwn(frenchUi,match[2]), `${file}: ${match[2]}`);
    }
  }
  for (const name of ['Home','About','Projects','Experiences','Resume']) assert.notEqual(translate(name,'fr'),name);
  assert.equal(translate('Home','en'),'Home');
});

test('all original profile paragraphs and hobbies have French text', async () => {
  const row=await loadData('profile');
  const fields=['intro_paragraphs','about_paragraphs','hobbies'];
  const french=localizeContent(row,'fr',fields);
  for(const field of fields) {
    assert.equal(french[field].length,row[field].length);
    french[field].forEach((text,index)=>assert.notEqual(text,row[field][index]));
  }
  assert.equal(localizeContent(row,'en',fields),row);
});

test('original project and experience descriptions are translated without changing identifiers', async () => {
  for(const name of ['projects','experiences']) {
    for(const row of await loadData(name)) {
      const localized=localizeContent(row,'fr',['description']);
      assert.notEqual(localized.description,row.description);
      assert.equal(localized.id,row.id);
    }
  }
});

test('admin translations override defaults and missing translations fall back safely', () => {
  const row={title:'Custom project',title_fr:'Projet personnalisé',description:'New content'};
  const result=localizeContent(row,'fr',['title','description']);
  assert.equal(result.title,'Projet personnalisé');
  assert.equal(result.description,'New content');
  assert.equal(row.title,'Custom project');
  assert.equal(localizeContent({title:'Changed English text',title_fr:'  '},'fr',['title']).title,'Changed English text');
  assert.deepEqual(localizeContent({hobbies:['Playing video games'],hobbies_fr:[]},'fr',['hobbies']).hobbies,['Jouer aux jeux vidéo']);
  assert.deepEqual(localizeContent({hobbies:['Playing video games'],hobbies_fr:['Lecture']},'fr',['hobbies']).hobbies,['Lecture']);
  assert.equal(localizeContent(null,'fr',['title']),null);
  assert.equal(localizeContent({title:'toString'},'fr',['title']).title,'toString');
});
