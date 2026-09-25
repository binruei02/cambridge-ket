import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, recordAnswer, recordActivity, readState, saveState, todayKey, wordCount, selectDaily } from '../dist/state.mjs';
test('wrong answer enters review; duplicate submission is ignored; later correct answer resolves it',()=>{
 const s=createState();
 assert.equal(recordAnswer(s,{attempt:'a',id:'r1',category:'reading',correct:false,date:'2026-09-25'}),true);
 assert.deepEqual(s.mistakes,['r1']);
 assert.equal(recordAnswer(s,{attempt:'a',id:'r1',category:'reading',correct:true,date:'2026-09-25'}),false);
 assert.equal(s.answers.length,1);assert.deepEqual(s.mistakes,['r1']);
 recordAnswer(s,{attempt:'b',id:'r1',category:'reading',correct:true,date:'2026-09-26'});
 assert.deepEqual(s.mistakes,[]);assert.equal(s.answers.length,2);
});
test('same session allows different questions without duplicating a question',()=>{
 const s=createState();recordAnswer(s,{attempt:'a',id:'r1',category:'reading',correct:true,date:'2026-09-25'});
 recordAnswer(s,{attempt:'a',id:'r2',category:'reading',correct:true,date:'2026-09-25'});
 assert.equal(s.answers.length,2);
});
test('activity is counted once per task per day',()=>{
 const s=createState();recordActivity(s,'writing','w1','2026-09-25');recordActivity(s,'writing','w1','2026-09-25');
 recordActivity(s,'writing','w1','2026-09-26');assert.equal(s.activities.length,2);
});
test('missing, corrupt, incompatible, or blocked storage safely falls back',()=>{
 for(const raw of [null,'bad','null','[]','{"version":1,"answers":"oops"}','{"version":1,"answers":[],"mistakes":[],"activities":[],"drafts":null}']){
  assert.deepEqual(readState({getItem:()=>raw}),createState());
 }
 assert.deepEqual(readState({getItem(){throw Error('blocked')}}),createState());
 assert.equal(saveState(createState(),{setItem(){throw Error('quota')}}),false);
});
test('progress and drafts survive save/reload; bad nested records are removed',()=>{
 const s=createState();s.drafts.w1='Hello, Anna!';recordAnswer(s,{attempt:'a',id:'r1',category:'reading',correct:false,date:'2026-09-25'});
 let raw;const store={setItem(k,v){raw=v},getItem(){return raw}};
 assert.equal(saveState(s,store),true);assert.deepEqual(readState(store),s);
 const parsed=JSON.parse(raw);parsed.answers.push(null,{id:'bad'});parsed.mistakes.push(null);store.getItem=()=>JSON.stringify(parsed);
 assert.deepEqual(readState(store),s);
});
test('local calendar dates and English word count',()=>{
 assert.equal(todayKey(new Date(2026,8,25,0,5)),'2026-09-25');
 assert.equal(wordCount("I'm going to a friend's house.\nSee you!"),8);
 assert.equal(wordCount('   '),0);assert.equal(wordCount('中文 123 !!!'),0);
});
test('daily selection is deterministic, varied, and without duplicates',()=>{
 const pool=Array.from({length:30},(_,i)=>({id:`q${i}`}));
 assert.deepEqual(selectDaily(pool,'2026-09-25',8),selectDaily(pool,'2026-09-25',8));
 assert.equal(new Set(selectDaily(pool,'2026-09-25',8).map(q=>q.id)).size,8);
 assert.notDeepEqual(selectDaily(pool,'2026-09-25',8),selectDaily(pool,'2026-09-26',8));
 assert.equal(selectDaily([], '2026-09-25',8).length,0);
});
test('continuous practice prioritises unseen questions and can repeat indefinitely',async()=>{
 const {selectPractice}=await import('../dist/state.mjs');
 const pool=Array.from({length:15},(_,i)=>({id:`q${i}`}));const answers=pool.slice(0,10).map(q=>({id:q.id}));
 const next=selectPractice(pool,answers,5,'round2');assert.deepEqual(new Set(next.map(q=>q.id)),new Set(pool.slice(10).map(q=>q.id)));
 const allSeen=pool.map(q=>({id:q.id}));assert.equal(selectPractice(pool,allSeen,10,'round3').length,10);
 assert.equal(new Set(selectPractice(pool,allSeen,10,'round3').map(q=>q.id)).size,10);
});
test('vocabulary filtering matches English, Chinese, and topic without changing the source',async()=>{
 const {filterVocabulary}=await import('../dist/state.mjs');
 const words=[
  {word:'library',zh:'圖書館',topic:'學校與學習'},
  {word:'weather',zh:'天氣',topic:'自然與天氣'},
  {word:'cloudy',zh:'多雲的',topic:'自然與天氣'}
 ];
 assert.deepEqual(filterVocabulary(words,{query:'LIB',topic:'全部'}).map(v=>v.word),['library']);
 assert.deepEqual(filterVocabulary(words,{query:'天氣',topic:'全部'}).map(v=>v.word),['weather']);
 assert.deepEqual(filterVocabulary(words,{query:'',topic:'自然與天氣'}).map(v=>v.word),['weather','cloudy']);
 assert.equal(words.length,3);
});
