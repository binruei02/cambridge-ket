import test from 'node:test';
import assert from 'node:assert/strict';
import {examParts, examQuestions, writingExamTasks, speakingExamParts} from '../dist/exam-content.mjs';
import {validateExamContent, assemblePaper, normaliseTextAnswer, isAnswerCorrect} from '../dist/exam-engine.mjs';

test('exam structural parts follow Cambridge A2 Key specifications', () => {
  assert.deepEqual(examParts.readingWriting.map(part => part.number), [1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(examParts.listening.map(part => part.number), [1, 2, 3, 4, 5]);
  assert.deepEqual(examParts.speaking.map(part => part.number), [1, 2]);

  const rw = assemblePaper('readingWriting');
  assert.equal(rw.objective.length, 30, 'Reading and Writing objective questions should be 30');
  assert.equal(rw.writing.length, 2, 'Reading and Writing writing tasks should be 2');

  const listening = assemblePaper('listening');
  assert.equal(listening.objective.length, 25, 'Listening objective questions should be 25');

  assert.equal(speakingExamParts.length, 2, 'Speaking parts should be 2');
});

test('exam validation passes and IDs are completely unique', () => {
  const result = validateExamContent({examParts, examQuestions, writingExamTasks, speakingExamParts});
  assert.equal(result.valid, true, `Validation failed: ${result.errors?.join(', ')}`);
});

test('English-only boundary: no Chinese characters in student prompts or choices before submission', () => {
  const han = /[\u3400-\u9fff]/;

  for (const q of examQuestions) {
    const promptText = `${q.title || ''} ${q.passage || ''} ${q.question || ''} ${(q.choices || []).join(' ')}`;
    assert.equal(han.test(promptText), false, `Question ${q.id} contains Chinese in prompt/choices: ${promptText}`);
    // Evidence must also be English
    if (q.evidence) {
      assert.equal(han.test(q.evidence), false, `Question ${q.id} contains Chinese in evidence: ${q.evidence}`);
    }
  }

  for (const w of writingExamTasks) {
    const writingText = `${w.prompt || ''} ${(w.points || []).join(' ')}`;
    assert.equal(han.test(writingText), false, `Writing task ${w.id} contains Chinese in prompt: ${writingText}`);
  }

  for (const s of speakingExamParts) {
    const speakingPrompt = `${s.instructions || ''} ${(s.questions || []).join(' ')} ${s.situation || ''}`;
    assert.equal(han.test(speakingPrompt), false, `Speaking part ${s.part} contains Chinese: ${speakingPrompt}`);
  }
});

test('answer checking and text normalization handles textEntry and multipleChoice correctly', () => {
  assert.equal(normaliseTextAnswer('  Bridge  '), 'bridge');
  assert.equal(normaliseTextAnswer('Swimming  Pool'), 'swimming pool');

  const mcQ = {format: 'multipleChoice', answer: 1};
  assert.equal(isAnswerCorrect(mcQ, 1), true);
  assert.equal(isAnswerCorrect(mcQ, '1'), true);
  assert.equal(isAnswerCorrect(mcQ, 0), false);

  const textQ = {format: 'textEntry', accepted: ['because', 'as']};
  assert.equal(isAnswerCorrect(textQ, 'because'), true);
  assert.equal(isAnswerCorrect(textQ, ' Because '), true);
  assert.equal(isAnswerCorrect(textQ, 'AS'), true);
  assert.equal(isAnswerCorrect(textQ, 'since'), false);
});
