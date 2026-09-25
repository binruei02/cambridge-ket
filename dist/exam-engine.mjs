// A2 Key for Schools Exam Engine
import {examParts, examQuestions, writingExamTasks, speakingExamParts} from './exam-content.mjs';

export const normaliseTextAnswer = value =>
  String(value ?? '').trim().toLowerCase().replace(/\s+/g, ' ');

export function isAnswerCorrect(question, value) {
  if (!question) return false;
  if (question.format === 'textEntry') {
    const norm = normaliseTextAnswer(value);
    if (!norm) return false;
    return (question.accepted || []).map(normaliseTextAnswer).includes(norm);
  }
  return Number(value) === question.answer;
}

export function assemblePaper(paper) {
  if (paper === 'readingWriting') {
    const objective = examQuestions.filter(q => q.paper === 'readingWriting');
    const writing = writingExamTasks.filter(w => w.paper === 'readingWriting');
    return {
      paper: 'readingWriting',
      name: 'Reading and Writing',
      objective,
      writing,
      total: objective.length + writing.length
    };
  }

  if (paper === 'listening') {
    const objective = examQuestions.filter(q => q.paper === 'listening');
    return {
      paper: 'listening',
      name: 'Listening',
      objective,
      total: objective.length
    };
  }

  if (paper === 'speaking') {
    return {
      paper: 'speaking',
      name: 'Speaking',
      parts: speakingExamParts,
      total: speakingExamParts.length
    };
  }

  return {paper, objective: [], total: 0};
}

export function validateExamContent({examParts, examQuestions, writingExamTasks, speakingExamParts}) {
  const errors = [];
  const ids = new Set();

  if (!examParts?.readingWriting || examParts.readingWriting.length !== 7) {
    errors.push('Reading and Writing must have 7 parts');
  }
  if (!examParts?.listening || examParts.listening.length !== 5) {
    errors.push('Listening must have 5 parts');
  }
  if (!examParts?.speaking || examParts.speaking.length !== 2) {
    errors.push('Speaking must have 2 parts');
  }

  for (const q of examQuestions || []) {
    if (!q.id) errors.push('Question missing ID');
    else if (ids.has(q.id)) errors.push(`Duplicate ID: ${q.id}`);
    else ids.add(q.id);

    if (!q.paper || !q.part || !q.format) {
      errors.push(`Question ${q.id} missing paper, part, or format`);
    }

    if (q.format === 'multipleChoice') {
      if (!Array.isArray(q.choices) || q.choices.length < 2) {
        errors.push(`Question ${q.id} multipleChoice needs >=2 choices`);
      }
      if (typeof q.answer !== 'number' || q.answer < 0 || q.answer >= q.choices.length) {
        errors.push(`Question ${q.id} invalid answer index: ${q.answer}`);
      }
    } else if (q.format === 'textEntry') {
      if (!Array.isArray(q.accepted) || q.accepted.length === 0) {
        errors.push(`Question ${q.id} textEntry needs accepted array`);
      }
    } else {
      errors.push(`Question ${q.id} unknown format ${q.format}`);
    }

    if (!q.explanationZh) {
      errors.push(`Question ${q.id} missing explanationZh`);
    }
  }

  for (const w of writingExamTasks || []) {
    if (!w.id) errors.push('Writing task missing ID');
    else if (ids.has(w.id)) errors.push(`Duplicate ID: ${w.id}`);
    else ids.add(w.id);

    if (typeof w.min !== 'number' || w.min <= 0) {
      errors.push(`Writing task ${w.id} invalid min word count`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
