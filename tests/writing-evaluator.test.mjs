import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluateWriting} from '../dist/writing-evaluator.mjs';

test('writing evaluator accurately scores and provides constructive feedback', () => {
  const sampleTask = {
    id: 'w1',
    min: 25,
    type: 'Email',
    points: ['Say when the picnic is.', 'Say where you will meet.', 'Tell Alex what to bring.'],
    sample: 'Hi Alex,\nWould you like to have a picnic with me on Saturday? Let’s meet at the park entrance at eleven. Please bring a sandwich and some water. See you there!\nLucy'
  };

  // Test excellent text
  const goodText = 'Hi Alex, Would you like to have a picnic on Saturday? Let’s meet at the park at eleven o’clock. Please bring some sandwiches. See you soon! Lucy';
  const goodResult = evaluateWriting(goodText, sampleTask);
  assert.ok(goodResult.score >= 17, `Expected score >= 17, got ${goodResult.score}`);
  assert.equal(goodResult.band, 'Pass with Distinction');
  assert.ok(goodResult.strengths.length >= 2);

  // Test text with spelling and subject-verb issues
  const flawedText = 'hi alex, i want a picnic. he go to park tommorrow with me. Lucy';
  const flawedResult = evaluateWriting(flawedText, sampleTask);
  assert.ok(flawedResult.suggestions.some(s => s.type === 'spelling'), 'Should detect spelling error');
  assert.ok(flawedResult.suggestions.some(s => s.type === 'grammar'), 'Should detect grammar error');

  // Test empty text
  const emptyResult = evaluateWriting('', sampleTask);
  assert.equal(emptyResult.score, 0);
  assert.equal(emptyResult.band, 'Incomplete');
});
