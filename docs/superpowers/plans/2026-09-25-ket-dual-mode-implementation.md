# KET Dual-Mode Practice Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Separate bilingual vocabulary study from English-only A2 Key for Schools exam-format practice covering every official Reading and Writing, Listening, and Speaking part.

**Architecture:** Keep the static ES-module application and localStorage state. Add one focused exam-content module for original part-based material and one exam-engine module for validation, grouping, scoring, and full-paper assembly; render those interfaces from the existing application shell without copying Cambridge questions.

**Tech Stack:** Static HTML/CSS, browser ES modules, Web Speech API, localStorage, Node.js built-in test runner.

## Global Constraints

- Vocabulary study keeps all 851 entries and may show Traditional Chinese.
- Exam prompts, passages, options, and answer fields are English-only; Traditional Chinese appears only after submission or in parent guidance.
- Reading and Writing has 7 parts and 32 questions; Listening has 5 parts and 25 questions; Speaking has 2 parts.
- Original exercises must be clearly separated from official Cambridge samples.
- No Cambridge questions, pictures, recordings, answer keys, or tapescripts are copied into the site.
- Existing localStorage records continue to load safely.

---

### Task 1: Define the A2 Key exam model and full original paper

**Files:**
- Create: `dist/exam-content.mjs`
- Create: `dist/exam-engine.mjs`
- Create: `tests/exam-content.test.mjs`

**Interfaces:**
- Produces: `examParts`, `examQuestions`, `writingExamTasks`, `speakingExamParts` from `exam-content.mjs`.
- Produces: `validateExamContent(content)`, `assemblePaper(paper)`, `normaliseTextAnswer(value)`, and `isAnswerCorrect(question,value)` from `exam-engine.mjs`.

- [ ] **Step 1: Write failing structural tests**

```js
assert.deepEqual(examParts.readingWriting.map(part=>part.number),[1,2,3,4,5,6,7]);
assert.deepEqual(examParts.listening.map(part=>part.number),[1,2,3,4,5]);
assert.deepEqual(examParts.speaking.map(part=>part.number),[1,2]);
assert.equal(assemblePaper('readingWriting').objective.length,30);
assert.equal(assemblePaper('listening').objective.length,25);
```

- [ ] **Step 2: Run the test and confirm missing-module failure**

Run: `node --test tests/exam-content.test.mjs`
Expected: FAIL because `dist/exam-content.mjs` does not exist.

- [ ] **Step 3: Add original English-only data for all parts**

Each objective question uses this common shape:

```js
{
 id:'rw1-1', paper:'readingWriting', part:1, format:'multipleChoice',
 passage:'YOUTH CLUB\nClosed on Tuesday. Open again Wednesday at 4 p.m.',
 question:'What should club members do?', choices:['Come on Tuesday','Visit after 4 p.m. on Wednesday','Wait until Thursday'],
 answer:1, evidence:'The notice says the club opens again on Wednesday at 4 p.m.',
 explanationZh:'告示指出星期三下午四點重新開放。'
}
```

Open answers use `format:'textEntry'` and `accepted:['answer']`. Part 2 and Listening Part 5 use four or more English choices. Listening questions include `script` and are marked `synthetic:true`.

- [ ] **Step 4: Implement validation and paper assembly**

```js
export const normaliseTextAnswer=value=>String(value).trim().toLowerCase().replace(/\s+/g,' ');
export function isAnswerCorrect(q,value){
 return q.format==='textEntry'
  ? q.accepted.map(normaliseTextAnswer).includes(normaliseTextAnswer(value))
  : Number(value)===q.answer;
}
```

- [ ] **Step 5: Run the structural tests**

Run: `node --test tests/exam-content.test.mjs`
Expected: PASS with 30 Reading objective questions, 2 writing tasks, 25 Listening questions, and 2 Speaking parts.

- [ ] **Step 6: Commit the content model**

```bash
git add dist/exam-content.mjs dist/exam-engine.mjs tests/exam-content.test.mjs
git commit -m "Add complete original A2 Key practice paper"
```

### Task 2: Enforce the bilingual boundary and replace translation testing

**Files:**
- Modify: `dist/content.mjs`
- Modify: `tests/content.test.mjs`
- Modify: `tests/exam-content.test.mjs`

**Interfaces:**
- Consumes: `examQuestions` and `validateExamContent` from Task 1.
- Produces: a vocabulary study bank that is no longer exported as Chinese-answer exam questions.

- [ ] **Step 1: Add a failing language-boundary test**

```js
const han=/[\u3400-\u9fff]/;
for(const q of examQuestions){
 assert.equal(han.test(`${q.passage||''}${q.question||''}${(q.choices||[]).join('')}`),false,q.id);
}
```

- [ ] **Step 2: Run the test and inspect any offending fields**

Run: `node --test tests/exam-content.test.mjs`
Expected: FAIL if Chinese appears before answer submission.

- [ ] **Step 3: Remove vocabulary translation questions from the exam pool**

Keep `vocabulary` for flashcards and search. Export exam-format Part 4 items from `exam-content.mjs` as the vocabulary assessment source. Keep `explanationZh` outside prompt fields.

- [ ] **Step 4: Run content and language tests**

Run: `node --test tests/content.test.mjs tests/exam-content.test.mjs`
Expected: PASS; 851 vocabulary entries remain and exam prompts contain no Han characters.

- [ ] **Step 5: Commit the language boundary**

```bash
git add dist/content.mjs tests/content.test.mjs tests/exam-content.test.mjs
git commit -m "Separate bilingual study from English-only exam practice"
```

### Task 3: Add official-part navigation and objective answer components

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/styles.css`
- Create: `tests/exam-ui-contract.test.mjs`

**Interfaces:**
- Consumes: `examParts`, `examQuestions`, `assemblePaper`, and `isAnswerCorrect`.
- Produces routes `#exam`, `#exam/readingWriting/<part>`, `#exam/listening/<part>`, `#exam/speaking/<part>`, and `#mock/<paper>`.

- [ ] **Step 1: Add failing UI contract tests**

```js
assert.match(app,/KET 題型練習/);
assert.match(app,/Reading and Writing/);
assert.match(app,/Listening/);
assert.match(app,/Speaking/);
assert.doesNotMatch(app,/data-exam-choice[^>]*>[\s\S]*[\u3400-\u9fff]/);
```

- [ ] **Step 2: Run the UI contract test**

Run: `node --test tests/exam-ui-contract.test.mjs`
Expected: FAIL before the new exam routes exist.

- [ ] **Step 3: Add an exam hub and part cards**

Render official part number, task type, question count, skill description, and a start button. Show a separate banner linking to Cambridge official digital samples.

- [ ] **Step 4: Generalise the answer form**

Multiple-choice forms render `A` through `H` when required. Text-entry forms render an English-labelled input with `autocomplete="off"` and compare against `accepted`. Before submission, all instructions and inputs are English-only.

- [ ] **Step 5: Add evidence-first feedback**

After submission, render `evidence` in English, followed by an expandable `explanationZh`. Record the question ID and official part in mistakes.

- [ ] **Step 6: Run UI and state tests**

Run: `node --test tests/exam-ui-contract.test.mjs tests/state.test.mjs`
Expected: PASS.

- [ ] **Step 7: Commit the part-based interface**

```bash
git add dist/app.js dist/styles.css tests/exam-ui-contract.test.mjs
git commit -m "Add English-only A2 Key part practice interface"
```

### Task 4: Implement Listening, Writing, and Speaking interactions

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/styles.css`
- Modify: `tests/exam-ui-contract.test.mjs`

**Interfaces:**
- Consumes: listening scripts, writing tasks, and speaking parts from Task 1.
- Produces: two-play listening controls, exam writing views, and speaking-part practice views.

- [ ] **Step 1: Add failing interaction contracts**

```js
assert.match(app,/Play recording/);
assert.match(app,/You will hear each recording twice/);
assert.match(app,/Write 25 words or more/);
assert.match(app,/Write 35 words or more/);
assert.match(app,/Ask your partner/);
```

- [ ] **Step 2: Run the contract test**

Run: `node --test tests/exam-ui-contract.test.mjs`
Expected: FAIL until the new interaction copy exists.

- [ ] **Step 3: Add Listening controls**

Track play count per question, display `Play 1 of 2` then `Play 2 of 2`, keep a replay option in study mode, and label original audio as synthetic English practice. Use official audio only in the existing official-sample view.

- [ ] **Step 4: Add Part 6 and Part 7 writing views**

Part 6 displays exactly three English content points and a 25-word minimum. Part 7 renders three original inline SVG scene cards and a 35-word minimum. Keep draft saving and self-check; do not award an official score.

- [ ] **Step 5: Add Speaking Part 1 and Part 2 views**

Part 1 displays examiner-style personal questions without Chinese translations. Part 2 shows a common situation, five original visual options, reason stems, and an `Ask your partner` reminder.

- [ ] **Step 6: Run tests**

Run: `node --test tests/exam-ui-contract.test.mjs tests/state.test.mjs`
Expected: PASS.

- [ ] **Step 7: Commit productive-skill interactions**

```bash
git add dist/app.js dist/styles.css tests/exam-ui-contract.test.mjs
git commit -m "Add A2 Key listening writing and speaking interactions"
```

### Task 5: Add full papers, continuous practice, and progress labels

**Files:**
- Modify: `dist/app.js`
- Modify: `dist/state.mjs`
- Modify: `tests/state.test.mjs`
- Modify: `tests/exam-ui-contract.test.mjs`

**Interfaces:**
- Consumes: `assemblePaper('readingWriting')` and `assemblePaper('listening')`.
- Produces: full objective-paper sessions and part-aware progress records.

- [ ] **Step 1: Add failing paper-session tests**

```js
assert.equal(assemblePaper('readingWriting').objective.length,30);
assert.equal(assemblePaper('readingWriting').writing.length,2);
assert.equal(assemblePaper('listening').objective.length,25);
```

- [ ] **Step 2: Store part-aware answers**

Extend sanitisation so optional `paper` and integer `part` values survive save and reload while older records remain valid.

- [ ] **Step 3: Replace the 873-question claim**

Continuous exam practice draws only from original official-format objective questions. Vocabulary cards remain 851, but translation items do not count as KET questions.

- [ ] **Step 4: Add full-paper entry points**

Reading and Writing full practice starts Parts 1–5 in official order and links to Parts 6–7 writing tasks. Listening full practice starts all 25 questions in official order. Results say `practice result`, never `official score`.

- [ ] **Step 5: Run all state and UI tests**

Run: `node --test tests/state.test.mjs tests/exam-ui-contract.test.mjs tests/exam-content.test.mjs`
Expected: PASS.

- [ ] **Step 6: Commit sessions and progress**

```bash
git add dist/app.js dist/state.mjs tests/state.test.mjs tests/exam-ui-contract.test.mjs
git commit -m "Add full A2 Key practice sessions and part progress"
```

### Task 6: Verify accessibility, update documentation, and publish

**Files:**
- Modify: `README.md`
- Modify: `dist/index.html` only if navigation labels require it.
- Modify: `dist/styles.css` for verified responsive defects only.

**Interfaces:**
- Consumes: the completed static build.
- Produces: a validated and privately deployed Site version.

- [ ] **Step 1: Update user documentation**

Document the two modes, English-only exam practice, official part counts, synthetic original listening, Cambridge official sample links, and local-only progress storage.

- [ ] **Step 2: Run automated verification**

Run: `node --test tests/*.test.mjs`
Expected: all tests PASS.

Run: `node --check dist/app.js && node --check dist/exam-content.mjs && node --check dist/exam-engine.mjs`
Expected: no output and exit code 0.

- [ ] **Step 3: Inspect the browser flows**

Check mobile and desktop for: exam hub, Reading Part 1 submission, Reading Part 5 text entry, Listening playback, Writing Part 7 scenes, Speaking Part 2, full-paper result, vocabulary search, and Cambridge pronunciation link.

- [ ] **Step 4: Commit final documentation and verified fixes**

```bash
git add README.md dist tests
git commit -m "Complete Cambridge-aligned KET dual-mode practice"
```

- [ ] **Step 5: Package and publish privately**

Package the exact validated `dist/`, save one Site version from the pushed commit, deploy it to the existing owner-only Site, wait for `succeeded`, and reopen the stable production URL.

