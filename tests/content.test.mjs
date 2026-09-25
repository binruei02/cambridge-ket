import test from 'node:test';
import assert from 'node:assert/strict';
import { vocabulary, vocabQuestions, topics, questions, reading, listening, writing, speaking } from '../dist/content.mjs';
import {wordCount} from '../dist/state.mjs';
test('all question IDs are unique and every question has one valid key and explanation',()=>{
 assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
 for(const q of questions){assert.equal(q.choices.length,3);assert.equal(new Set(q.choices).size,3);assert.ok(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<3);assert.ok(q.explanation.length>10);assert.ok(q.question);assert.ok(q.script||q.passage)}
});
test('the vocabulary bank contains at least 500 useful unique entries',()=>{
 assert.ok(vocabulary.length>=500,`expected at least 500 words, got ${vocabulary.length}`);
 assert.equal(new Set(vocabulary.map(v=>v.word.toLowerCase())).size,vocabulary.length);
 assert.ok(topics.length>=10);
 for(const v of vocabulary){
  assert.ok(v.word.length>0);assert.ok(v.zh.length>0);assert.ok(v.topic.length>0);assert.ok(v.pos.length>0);
  assert.ok(topics.includes(v.topic));
 }
 assert.equal(vocabQuestions.length,vocabulary.length);
});
test('promised exam lesson coverage is present',()=>{
 assert.equal(reading.length,12);assert.equal(listening.length,10);assert.equal(writing.length,4);assert.equal(speaking.length,8);
});
test('writing samples meet word minimums and all tasks provide guidance',()=>{
 for(const w of writing){assert.ok(wordCount(w.sample)>=w.min,`${w.id} sample too short`);assert.equal(w.points.length,3);assert.equal(w.hints.length,3)}
 for(const s of speaking){assert.ok(s.question&&s.sample&&s.follow);assert.ok(s.stems.length>=2)}
});
