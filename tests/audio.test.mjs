import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {pronunciations} from '../dist/pronunciations.mjs';

test('word audio uses Cambridge pronunciation pages instead of blocked media hotlinks',async()=>{
 const app=await readFile(new URL('../dist/app.js',import.meta.url),'utf8');
 assert.equal(app.includes('new Audio(p.url)'),false);
 for(const entry of Object.values(pronunciations)){
  assert.match(entry.source,/^https:\/\/dictionary\.cambridge\.org\/pronunciation\/english\//);
  assert.equal('url' in entry,false);
 }
});
