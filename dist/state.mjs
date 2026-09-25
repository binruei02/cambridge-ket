export const STORAGE_KEY='ket-garden-v1';
export function createState(){return {version:1,answers:[],mistakes:[],activities:[],drafts:{}}}
export function todayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`}
export function wordCount(text){return (text.match(/[a-zA-Z]+(?:['’-][a-zA-Z]+)*/g)||[]).length}
const string=v=>typeof v==='string';
export function readState(storage){
 try{
  const s=JSON.parse((storage??globalThis.localStorage).getItem(STORAGE_KEY));
  if(!s||s.version!==1||!Array.isArray(s.answers)||!Array.isArray(s.mistakes)||!Array.isArray(s.activities)||!s.drafts||typeof s.drafts!=='object'||Array.isArray(s.drafts))return createState();
  return {
   version:1,
   answers:s.answers.filter(a=>a&&string(a.attempt)&&string(a.id)&&(string(a.category)||string(a.paper))&&typeof a.correct==='boolean'&&string(a.date)).map(a=>({
    attempt:a.attempt,
    id:a.id,
    category:a.category||a.paper||'general',
    correct:a.correct,
    date:a.date,
    ...(string(a.paper)?{paper:a.paper}:{}),
    ...(Number.isInteger(a.part)?{part:a.part}:{})
   })),
   mistakes:[...new Set(s.mistakes.filter(string))],
   activities:s.activities.filter(a=>a&&string(a.id)&&string(a.category)&&string(a.date)),
   drafts:Object.fromEntries(Object.entries(s.drafts).filter(([,v])=>string(v)))
  };
 }catch{return createState()}
}
export function saveState(s,storage){try{(storage??globalThis.localStorage).setItem(STORAGE_KEY,JSON.stringify(s));return true}catch{return false}}
export function recordAnswer(s,answer){
 if(s.answers.some(a=>a.attempt===answer.attempt&&a.id===answer.id))return false;
 s.answers.push({...answer});
 if(answer.correct)s.mistakes=s.mistakes.filter(id=>id!==answer.id);
 else if(!s.mistakes.includes(answer.id))s.mistakes.push(answer.id);
 return true;
}
export function recordActivity(s,category,id,date=todayKey()){
 if(!s.activities.some(a=>a.category===category&&a.id===id&&a.date===date))s.activities.push({category,id,date});
}
export function selectDaily(pool,date=todayKey(),count=8){
 let seed=2166136261;for(const c of date)seed=Math.imul(seed^c.charCodeAt(0),16777619)>>>0;
 const items=[...pool];
 for(let i=items.length-1;i>0;i--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const j=seed%(i+1);[items[i],items[j]]=[items[j],items[i]]}
 return items.slice(0,count);
}
export function selectPractice(pool,answers,count=10,seed=String(Date.now())){
 const seen=new Map();for(const answer of answers)seen.set(answer.id,(seen.get(answer.id)||0)+1);
 return selectDaily(pool,seed,pool.length).sort((a,b)=>(seen.get(a.id)||0)-(seen.get(b.id)||0)).slice(0,count);
}
export function filterVocabulary(words,{query='',topic='全部'}={}){
 const needle=query.trim().toLocaleLowerCase();
 return words.filter(word=>(topic==='全部'||word.topic===topic)&&(!needle||`${word.word} ${word.zh}`.toLocaleLowerCase().includes(needle)));
}
