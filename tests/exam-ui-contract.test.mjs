import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const appPath = path.resolve('dist/app.js');
const app = fs.readFileSync(appPath, 'utf8');

test('app.js contracts for KET Dual-Mode navigation and branding', () => {
  assert.match(app, /KET 題型練習/, 'Must provide explicit KET 題型練習 hub/mode');
  assert.match(app, /學習複習/, 'Must provide 學習複習 mode/title');
  assert.match(app, /Reading and Writing/, 'Must have Reading and Writing section');
  assert.match(app, /Listening/, 'Must have Listening section');
  assert.match(app, /Speaking/, 'Must have Speaking section');
});

test('app.js contracts for Exam interactions, audio, writing and speaking', () => {
  assert.match(app, /Play recording|播放錄音|play-recording/, 'Must have play recording action');
  assert.match(app, /You will hear each recording twice|播放兩次/, 'Must support or explain 2 plays in listening');
  assert.match(app, /25/, 'Must check or state 25 words minimum for Part 6');
  assert.match(app, /35/, 'Must check or state 35 words minimum for Part 7');
  assert.match(app, /Ask your partner|partner/i, 'Must support speaking partner prompts');
});
