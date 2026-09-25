import {topics, vocabulary, vocabQuestions, reading, listening, writing, speaking, questions} from './content.mjs';
import {pronunciations, officialAudio, officialHandbook, officialDigitalTest} from './pronunciations.mjs';
import {selectPractice, readState, saveState, todayKey, recordAnswer, recordActivity, wordCount, selectDaily, filterVocabulary} from './state.mjs';
import {examParts, examQuestions, rwObjectiveQuestions, listeningObjectiveQuestions, writingExamTasks, speakingExamParts} from './exam-content.mjs';
import {assemblePaper, isAnswerCorrect, normaliseTextAnswer, validateExamContent} from './exam-engine.mjs';

const main = document.querySelector('#main');
const state = readState();
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const labels = {vocabulary: '單字', reading: '閱讀', listening: '聽力', writing: '寫作', speaking: '口說', exam: 'KET題型'};

let quiz = null;
let examSession = null;
let topic = '全部';
let vocabQuery = '';
let cardIndex = 0;
let wordPage = 0;
let flipped = false;
let homeFlipped = false;
let noticeTimer;
let storageWarned = false;
let speechToken = 0;

const WORDS_PER_PAGE = 24;
const icons = {
  book: '<path d="M3 4h6a4 4 0 0 1 3 2 4 4 0 0 1 3-2h6v15h-6a4 4 0 0 0-3 2 4 4 0 0 0-3-2H3z"/><path d="M12 6v15"/>',
  headphones: '<path d="M4 14v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="12" width="4" height="8" rx="2"/><rect x="17" y="12" width="4" height="8" rx="2"/>',
  pen: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14z"/><path d="M13 20h8"/>',
  chat: '<path d="M20 11a8 8 0 0 1-8 8H5l-4 3 2-7a8 8 0 1 1 17-4z"/><path d="M6 10h10M6 14h6"/>',
  check: '<rect x="4" y="3" width="16" height="19" rx="3"/><path d="m8 12 3 3 5-6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1 1M18 18l1 1M5 19l1-1M18 6l1-1"/>',
  leaf: '<path d="M19 3C4 2 1 12 7 17c7 5 14-2 12-14Z"/><path d="M4 22 15 8"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>'
};
const icon = n => n === 'letters' ? '<span aria-hidden="true">Aa</span>' : `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[n] || icons.check}</svg>`;

const studyModules = [
  ['vocabulary', '單字花園', 'Vocabulary', '把生活裡的單字，變成自己的。', 'letters', 'mint', `${vocabulary.length} 個單字 · ${topics.length} 個主題`],
  ['reading', '閱讀小徑', 'Reading', '讀懂短訊息，找到關鍵線索。', 'book', 'yellow', `${reading.length} 題 · 短文與選字`],
  ['listening', '聽力時光', 'Listening', '放慢一點，聽懂每一個重點。', 'headphones', 'blue', `${listening.length} 題 · 日常對話`],
  ['writing', '寫作練習', 'Writing', '從一句話開始，把想法寫下來。', 'pen', 'peach', `${writing.length} 個任務 · 引導寫作`],
  ['speaking', '開口說說', 'Speaking', '用英文，分享自己的小世界。', 'chat', 'lavender', `${speaking.length} 個話題 · 親子陪練`],
  ['mistakes', '錯題筆記', 'Review', '再試一次，就比昨天更熟練。', 'check', 'rose', '專屬於你的複習清單']
];

function notify(message) {
  const el = document.querySelector('#notice');
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => el.hidden = true, 5000);
}

function persist() {
  const ok = saveState(state);
  if (!ok && !storageWarned) {
    notify('瀏覽器目前無法儲存進度。你仍可繼續練習，關閉頁面前請另存作文。');
    storageWarned = true;
  }
  return ok;
}

function allAvailableQuestions() {
  return [...questions, ...examQuestions];
}

function updateBadge() {
  const all = allAvailableQuestions();
  const count = state.mistakes.filter(id => all.some(q => q.id === id)).length;
  const el = document.querySelector('#mistake-count');
  if (el) el.textContent = count;
}

function stats() {
  const date = todayKey();
  const events = [...state.answers, ...state.activities];
  return {
    today: state.answers.filter(a => a.date === date).length,
    days: new Set(events.map(a => a.date)).size,
    correct: state.answers.filter(a => a.correct).length,
    total: state.answers.length,
    mistakes: state.mistakes.length
  };
}

function summaryStats() {
  const s = stats();
  return `<div class="stats"><div class="stat"><span class="stat-icon">${icon('check')}</span><div><strong>${s.today}<small>題</small></strong><p>今天完成題數</p></div></div><div class="stat"><span class="stat-icon">${icon('sun')}</span><div><strong>${s.days}<small>天</small></strong><p>累積學習日</p></div></div><div class="stat"><span class="stat-icon">${icon('leaf')}</span><div><strong>${s.mistakes}<small>題</small></strong><p>待複習錯題</p></div></div></div>`;
}

function heading(title, desc, en = 'YOUR LEARNING SPACE', backHref = '#home', backText = '← 返回首頁') {
  return `<a class="back" href="${backHref}">${backText}</a><div class="page-heading"><div class="eyebrow">${en}</div><h1>${title}</h1><p>${desc}</p></div>`;
}

function pronunciationPage(word) {
  return `https://dictionary.cambridge.org/pronunciation/english/${encodeURIComponent(word.toLowerCase().replace(/\s+/g, '-'))}`;
}

function wordAudioPath(word) {
  const safeName = String(word).toLowerCase().trim().replace(/\s+/g, '_').replace(/[\/\']/g, '');
  return `audio/words/${safeName}.mp3`;
}

function playWordAudio(word) {
  stopSpeech();
  const path = wordAudioPath(word);
  const audio = new Audio(path);
  audio.play().catch(() => {
    speak(word, 0.9);
  });
}

// ----------------- HOME VIEW (Dual Mode) -----------------
function home() {
  const date = new Date().toLocaleDateString('zh-TW', {month: 'long', day: 'numeric', weekday: 'long'});
  const recorded = vocabulary.filter(v => pronunciations[v.word]);
  const v = selectDaily(recorded, todayKey(), 1)[0] || vocabulary[0];
  const p = pronunciations[v.word] || {ipa: '', source: pronunciationPage(v.word)};

  return `
    <div class="welcome">
      <p>HELLO, LITTLE LEARNER <span aria-hidden="true">☀</span></p>
      <span class="date-label">${date}</span>
    </div>

    <div class="hero-grid">
      <section class="hero">
        <span class="hero-tag">A2 Key for Schools</span>
        <div class="eyebrow"><span aria-hidden="true">✦</span> KET DUAL-MODE PRACTICE</div>
        <h1>讓英文實力，<br>成為考試的<em>自信</em>。</h1>
        <p>清楚劃分「KET 題型練習」與「學習複習」雙模式。題目全原創，結構比照 Cambridge 官方公開格式。</p>
        <div class="hero-bottom" style="flex-wrap:wrap">
          <a class="btn" href="#exam">進入 KET 題型練習 <span aria-hidden="true">↗</span></a>
          <a class="btn secondary" href="#practice">進入學習複習 <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section class="word-card" aria-label="每日單字">
        <div class="eyebrow">WORD OF THE DAY · 每日單字</div>
        <button class="word-flip" data-action="home-flip" aria-label="${homeFlipped ? '顯示英文單字' : '翻開中文意思'}">
          <span class="word" lang="en">${homeFlipped ? esc(v.zh) : esc(v.word)}</span>
          <span class="phonetic">${homeFlipped ? esc(v.word) : (p.ipa ? `UK /${p.ipa}/` : 'A2 Core')}</span>
        </button>
        <div class="word-divider"></div>
        <p>${homeFlipped ? esc(v.translation || v.zh) : '認識一個新單字，開啟新的一天。'}</p>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;margin-top:6px">
          <button class="speaker-btn" data-action="play-word" data-word="${esc(v.word)}" type="button">
            <svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            聽英式發音
          </button>
          <a class="text-button" href="${p.source}" target="_blank" rel="noopener noreferrer">Cambridge 官網 ↗</a>
          <button class="text-button" data-action="home-flip">${homeFlipped ? '翻回英文' : '翻開意思'} ↻</button>
        </div>
      </section>
    </div>

    ${summaryStats()}

    <div class="sprint-banner" style="background:#eaf2e8;border-color:#c8dec4">
      <div>
        <span class="exam-part-pill" style="margin-bottom:8px;display:inline-block">CAMBRIDGE ALIGNED</span>
        <strong style="display:block">KET 官方題型全真練習</strong>
        <p>Reading & Writing 7 個 Parts、Listening 5 個 Parts、Speaking 2 個 Parts。作答前全英文，交卷後看 Evidence 與中文解析。</p>
      </div>
      <a class="btn" href="#exam">開啟題型庫 ↗</a>
    </div>

    <div class="section-head">
      <div>
        <h2>學習與複習小徑</h2>
        <p>單字卡、中文解析與基礎技能暖身，按自己的步調每天前進。</p>
      </div>
      <a href="#progress">查看累積進度 ↗</a>
    </div>

    <div class="courses">
      ${studyModules.map(([id, title, en, desc, i, color, count]) => `
        <a class="course" href="#${id}">
          <div class="course-top">
            <span class="icon ${color}">${icon(i)}</span>
            <span class="course-tag">${id === 'mistakes' ? 'MY REVIEW' : 'STUDY'}</span>
          </div>
          <h3>${title}<span>${en}</span></h3>
          <p>${desc}</p>
          <div class="course-foot">
            <span>${id === 'mistakes' ? `${stats().mistakes} 題待複習` : count}</span>
            <b aria-hidden="true">↗</b>
          </div>
        </a>
      `).join('')}
    </div>

    <aside class="tip">
      <span class="tip-icon" aria-hidden="true">✦</span>
      <div>
        <strong>給孩子的暖心話：答錯也是很棒的線索。</strong>
        <p>每道題目送出後都有英文關鍵句（Evidence）與中文解析。做完後去錯題筆記再練一次，就比昨天更進步！</p>
      </div>
    </aside>
  `;
}

// ----------------- STUDY / PRACTICE HUB -----------------
function practiceHub() {
  return `
    ${heading('學習複習模式', '851 個 A2 Key 核心字彙、繁體中文解說與基礎題型暖身。', 'STUDY & WARM-UP', '#home')}
    <div class="sprint-banner">
      <div>
        <strong>自由連續練習</strong>
        <p>自由挑選單字、閱讀或聽力，連續答題不中斷。系統優先安排未練過的題目。</p>
      </div>
      <a class="btn" href="#sprint">開始連續練習 ↗</a>
    </div>

    <div class="courses">
      ${studyModules.filter(m => m[0] !== 'mistakes').map(([id, title, en, desc, i, color, count]) => `
        <a class="course" href="#${id}">
          <div class="course-top">
            <span class="icon ${color}">${icon(i)}</span>
            <span class="course-tag">STUDY</span>
          </div>
          <h3>${title}<span>${en}</span></h3>
          <p>${desc}</p>
          <div class="course-foot">
            <span>${count}</span>
            <b aria-hidden="true">↗</b>
          </div>
        </a>
      `).join('')}
    </div>

    <aside class="tip" style="margin-top:30px">
      <div>
        <strong>準備好進入全英文練習了嗎？</strong>
        <p>KET 官方題型練習不出現中文字干擾，比照正式試卷結構。<a class="inline-link" href="#exam">切換到 KET 題型練習 ↗</a></p>
      </div>
    </aside>
  `;
}

// ----------------- EXAM HUB (Official A2 Key Parts) -----------------
function examHub() {
  const rw = examParts.readingWriting;
  const l = examParts.listening;
  const spk = examParts.speaking;

  return `
    ${heading('KET 題型練習', '結構完全比照 Cambridge A2 Key for Schools 官方試卷。作答前為全英文題目，交卷後提供 Evidence 線索與中文詳細解析。', 'OFFICIAL EXAM FORMAT PRACTICE', '#home')}

    <div class="exam-hub-hero">
      <span class="hero-tag" style="top:20px;right:20px">CAMBRIDGE A2 KEY</span>
      <h2 style="font-size:24px;margin-bottom:8px">全真分項練習與模擬試卷</h2>
      <p style="color:var(--muted);font-size:14px;max-width:700px">
        題目均為原創 A2 程度練習，不複製官方受版權保護試題。聽力為練習用英式合成語音（每題可聽兩次），並提供官方公開樣題入口。
      </p>
      <div class="hero-bottom" style="margin-top:20px;gap:14px;flex-wrap:wrap">
        <a class="btn" href="#mock/readingWriting">完整 Reading & Writing 模考（32 題） ↗</a>
        <a class="btn" href="#mock/listening" style="background:#3a6584">完整 Listening 模考（25 題） ↗</a>
        <a class="btn secondary" href="#exam-continuous">考前連續衝刺 ↗</a>
        <a class="btn ghost" href="#official">聽 Cambridge 官方樣題 ↗</a>
      </div>
    </div>

    <section class="exam-paper-section">
      <h2><span class="icon yellow">${icon('book')}</span> Reading and Writing <small style="font-size:14px;color:var(--muted);font-weight:400">（60 分鐘 · 7 Parts · 32 題）</small></h2>
      <div class="exam-parts-grid">
        ${rw.map(p => `
          <a class="exam-card" href="#exam/readingWriting/${p.number}">
            <div>
              <div class="exam-card-top">
                <span class="exam-part-pill">${p.name}</span>
                <span class="subtle">${p.questionsCount} 題</span>
              </div>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </div>
            <div class="exam-card-foot">
              <span>${p.format}</span>
              <span>開始練習 →</span>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="exam-paper-section">
      <h2><span class="icon blue">${icon('headphones')}</span> Listening <small style="font-size:14px;color:var(--muted);font-weight:400">（約 30 分鐘 · 5 Parts · 25 題 · 每段播放兩次）</small></h2>
      <div class="exam-parts-grid">
        ${l.map(p => `
          <a class="exam-card" href="#exam/listening/${p.number}">
            <div>
              <div class="exam-card-top">
                <span class="exam-part-pill">${p.name}</span>
                <span class="subtle">${p.questionsCount} 題</span>
              </div>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </div>
            <div class="exam-card-foot">
              <span>${p.format}</span>
              <span>開始練習 →</span>
            </div>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="exam-paper-section">
      <h2><span class="icon lavender">${icon('chat')}</span> Speaking <small style="font-size:14px;color:var(--muted);font-weight:400">（8–10 分鐘 · 2 Parts · 親子搭檔陪練）</small></h2>
      <div class="exam-parts-grid">
        ${spk.map(p => `
          <a class="exam-card" href="#exam/speaking/${p.number}">
            <div>
              <div class="exam-card-top">
                <span class="exam-part-pill">${p.name}</span>
                <span class="subtle">考官問答</span>
              </div>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </div>
            <div class="exam-card-foot">
              <span>${p.format}</span>
              <span>開始練習 →</span>
            </div>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

// ----------------- EXAM QUESTION & SESSION RUNNER -----------------
function startExamSession(pool, {title, paper, part = null, isMock = false, isContinuous = false}) {
  examSession = {
    pool: [...pool],
    title,
    paper,
    part,
    isMock,
    isContinuous,
    index: 0,
    selected: null,
    textValue: '',
    submitted: false,
    correct: 0,
    playCount: 0,
    results: [],
    attempt: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  };
  stopSpeech();
  location.hash = '#exam-runner';
  render();
}

let currentActiveAudio = null;

function stopSpeech() {
  speechToken++;
  if (currentActiveAudio) {
    try {
      currentActiveAudio.pause();
      currentActiveAudio.currentTime = 0;
    } catch {}
    currentActiveAudio = null;
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  document.querySelectorAll('audio').forEach(a => {
    try { a.pause(); } catch {}
  });
}

function playAudioFile(path, fallbackText = null, rate = 0.9, onEnd = null) {
  stopSpeech();
  const token = speechToken;
  const status = document.querySelector('#speech-status') || document.querySelector('#exam-speaking-feedback') || document.querySelector('#speaking-feedback');
  if (status) status.innerHTML = '🔊 <strong>真人真題錄音準備播放…</strong>';

  // Force cache-busting on audio file to ensure latest version is always fetched
  const cleanPath = path.includes('?') ? path : `${path}?v=20260925`;
  const audio = new Audio(cleanPath);
  currentActiveAudio = audio;
  if (rate && rate !== 1.0) {
    audio.playbackRate = rate;
  }

  audio.onplay = () => {
    if (token === speechToken && status?.isConnected) {
      status.innerHTML = '🔊 <strong>英式真人錄音播放中</strong>（點擊 Stop 隨時停止）';
    }
  };
  audio.onended = () => {
    if (token === speechToken) {
      currentActiveAudio = null;
      if (status?.isConnected) status.innerHTML = '✓ 錄音播放完畢';
      if (onEnd) onEnd();
    }
  };
  audio.onerror = (e) => {
    console.error('Audio load error:', path, e);
    if (token !== speechToken) return;
    currentActiveAudio = null;
    if (status?.isConnected) {
      status.innerHTML = '<span style="color:#c93b2b">⚠️ 真人音檔載入失敗，請嘗試強制重新整理（Cmd+Shift+R）。</span>';
    }
    notify('真人音檔載入失敗，請強制重新整理頁面。');
  };

  audio.play().catch(err => {
    console.warn('Audio play prevented by browser policy:', err);
    if (token !== speechToken) return;
    currentActiveAudio = null;
    if (status?.isConnected) {
      status.innerHTML = '<span style="color:#c93b2b">⚠️ 播放被瀏覽器阻擋，請再次點擊按鈕即可播放。</span>';
    }
  });
}

function getExamListeningAudioPath(q) {
  if (!q?.id) return null;
  // Official exam questions: l1-1..5, l2-6..10, l3-11..15, l4-16..20, l5-21..25
  if (q.id.startsWith('l1-')) {
    const num = q.id.split('-')[1];
    return `audio/listening/exam-l-part1-${num}.mp3`;
  }
  if (q.id.startsWith('l2-')) {
    return 'audio/listening/exam-l-part2.mp3';
  }
  if (q.id.startsWith('l3-')) {
    return 'audio/listening/exam-l-part3.mp3';
  }
  if (q.id.startsWith('l4-')) {
    const num = q.id.split('-')[1];
    return `audio/listening/exam-l-part4-${num}.mp3`;
  }
  if (q.id.startsWith('l5-')) {
    return 'audio/listening/exam-l-part5.mp3';
  }

  // Bilingual study listening questions: l1..l10
  if (/^l\d+$/.test(q.id)) {
    return `audio/listening/bilingual-${q.id}.mp3`;
  }

  return null;
}

function speak(text, rate = 0.9) {
  if (!('speechSynthesis' in window)) {
    notify('此瀏覽器不支援語音播放。請改用支援英文語音的瀏覽器，或作答後閱讀逐字稿。');
    return;
  }
  stopSpeech();
  const token = speechToken;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-GB';
  u.rate = rate;

  const voices = speechSynthesis.getVoices();
  const british = voices.filter(v => v.lang.replace('_', '-').toLowerCase() === 'en-gb');
  u.voice = british.find(v => /natural|premium|enhanced/i.test(v.name)) || british[0] || null;

  const status = document.querySelector('#speech-status');
  if (status) status.textContent = 'Playing English audio…';

  u.onstart = () => {
    if (token === speechToken && status?.isConnected) {
      status.textContent = 'Playing recording… Click stop anytime';
    }
  };
  u.onend = () => {
    if (token === speechToken && status?.isConnected) {
      status.textContent = 'Audio finished.';
    }
  };
  u.onerror = e => {
    if (token !== speechToken || ['canceled', 'interrupted'].includes(e.error)) return;
    if (status?.isConnected) status.textContent = 'Unable to play speech on this device.';
    notify('語音無法播放，請檢查裝置設定。');
  };
  speechSynthesis.speak(u);
}

function examQuestionView() {
  if (!examSession?.pool.length) {
    return empty('尚未選擇練習題組', '請回到 KET 題型練習區選擇一個 Part。', '#exam', '前往題型庫');
  }
  if (examSession.index >= examSession.pool.length) {
    return examResultView();
  }

  const q = examSession.pool[examSession.index];
  const done = examSession.submitted;
  const isCorrect = done ? isAnswerCorrect(q, q.format === 'textEntry' ? examSession.textValue : examSession.selected) : false;

  const isListening = q.paper === 'listening';
  const playLabel = examSession.playCount === 0
    ? '▶ Play recording (Play 1 of 2)'
    : examSession.playCount === 1
      ? '▶ Play recording (Play 2 of 2)'
      : 'Replay recording (Study review)';

  return `
    ${heading(examSession.title, `Question ${examSession.index + 1} of ${examSession.pool.length} · Official A2 Key Format`, 'KET EXAM PRACTICE', '#exam', '← 返回題型庫')}

    <div class="learning-layout">
      <section class="panel">
        <div class="question-meta">
          <span class="tag" style="background:#eaf2df;color:#247257">Part ${q.part} · ${q.format === 'textEntry' ? 'Text Entry' : 'Multiple Choice'}</span>
          <span>${examSession.index + 1} / ${examSession.pool.length}</span>
        </div>

        <div class="progress" role="progressbar" aria-label="Exam Progress" aria-valuenow="${examSession.index + (done ? 1 : 0)}" aria-valuemin="0" aria-valuemax="${examSession.pool.length}">
          <span style="width:${(examSession.index + (done ? 1 : 0)) / examSession.pool.length * 100}%"></span>
        </div>

        ${isListening ? `
          <div class="audio-box" style="margin-top:20px">
            <div class="audio-label">LISTENING PRACTICE · YOU WILL HEAR EACH RECORDING TWICE</div>
            <div class="audio-controls">
              <button class="btn" data-action="play-recording" type="button">${playLabel}</button>
              <button class="text-button" data-action="stop-audio" type="button">Stop</button>
              <label>
                <span class="sr-only">Speech speed</span>
                <select id="speech-rate">
                  <option value="0.9">Normal speed (0.9x)</option>
                  <option value="0.75">Slower (0.75x)</option>
                </select>
              </label>
            </div>
            <p id="speech-status" role="status" class="speech-status">
              ${examSession.playCount >= 2 ? '🔊 Human-like British Audio · Replay for study review' : '🔊 Authentic British exam recording · You will hear each recording twice'}
            </p>
          </div>
        ` : ''}

        ${q.passage ? `<div class="passage" lang="en">${esc(q.passage)}</div>` : ''}

        <form id="exam-answer-form">
          <h2 class="question" lang="en">${esc(q.question)}</h2>

          ${q.format === 'multipleChoice' ? `
            <fieldset class="choices" ${done ? 'disabled' : ''}>
              <legend class="sr-only">Select the correct option</legend>
              ${q.choices.map((c, i) => {
                let statusClass = '';
                if (done) {
                  if (i === q.answer) statusClass = 'correct';
                  else if (i === examSession.selected) statusClass = 'incorrect';
                }
                const letter = String.fromCharCode(65 + i);
                return `
                  <label class="choice ${statusClass}" data-exam-choice="${i}">
                    <input type="radio" name="examChoice" value="${i}" ${examSession.selected === i ? 'checked' : ''} required>
                    <span class="choice-letter" aria-hidden="true">${letter}</span>
                    <span lang="en">${esc(c)}</span>
                    ${done && i === q.answer ? '<span class="choice-result">✓ Correct</span>' : done && i === examSession.selected ? '<span class="choice-result">Incorrect</span>' : ''}
                  </label>
                `;
              }).join('')}
            </fieldset>
          ` : `
            <div class="text-entry-box">
              <label for="exam-text-input">Write ONE English word in the space:</label>
              <input type="text" id="exam-text-input" name="textAnswer" class="text-entry-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" value="${esc(examSession.textValue)}" ${done ? 'disabled' : ''} placeholder="Write ONE word" required>
            </div>
          `}

          ${done ? `
            <div class="feedback ${isCorrect ? '' : 'wrong'}" id="exam-feedback" role="status" tabindex="-1">
              <h3>${isCorrect ? 'Correct! ✓' : 'Not quite. Check the evidence below:'}</h3>
              ${q.format === 'textEntry' && !isCorrect ? `<p><strong>Accepted answer(s):</strong> ${q.accepted.map(a => `“${esc(a)}”`).join(' or ')}</p>` : ''}
            </div>

            <div class="evidence-box">
              <strong>EVIDENCE FROM PASSAGE / AUDIO</strong>
              <p lang="en">“${esc(q.evidence)}”</p>
            </div>

            <details>
              <summary>查看繁體中文解析</summary>
              <p>${esc(q.explanationZh)}</p>
            </details>

            ${q.script ? `
              <details>
                <summary>View English Audio Script (逐字稿)</summary>
                <p lang="en" style="font-family:Georgia,serif;line-height:1.8">${esc(q.script)}</p>
              </details>
            ` : ''}
          ` : ''}

          <div class="actions">
            ${done ? `
              <span class="subtle">先讀完 Evidence 和解析，再前往下一題。</span>
              <button class="btn" type="button" data-action="next-exam-question">
                ${examSession.index === examSession.pool.length - 1 ? '完成試卷，查看成果' : '下一題'} →
              </button>
            ` : `
              <span class="subtle">選好或輸入完成後，請點擊確認送出。</span>
              <button class="btn" type="submit">Submit Answer →</button>
            `}
          </div>
        </form>
      </section>

      <aside class="aside-panel">
        <h3>Exam Tips</h3>
        <p>
          ${isListening
            ? 'First read the question carefully. Notice times, prices, and changes introduced by words like "instead" or "however".'
            : q.part === 5
              ? 'Part 5 tests grammar: auxiliary verbs (do, have), prepositions (at, in, on), pronouns (we, they), and connectors (if, because).'
              : 'Skim the text to understand the main idea, then underline the sentence supporting your choice.'}
        </p>
        <p class="small-note">
          進度即時記錄於目前瀏覽器。答錯的題目會自動列入錯題筆記，隨時可重新作答。
        </p>
      </aside>
    </div>
  `;
}

function submitExamAnswer(form) {
  if (!examSession || examSession.submitted) return;
  const q = examSession.pool[examSession.index];
  let correct = false;

  if (q.format === 'multipleChoice') {
    const chosen = new FormData(form).get('examChoice');
    if (chosen === null) {
      notify('Please select an option before submitting.');
      return;
    }
    const idx = Number(chosen);
    examSession.selected = idx;
    correct = idx === q.answer;
  } else {
    const rawVal = new FormData(form).get('textAnswer')?.toString() || '';
    const norm = normaliseTextAnswer(rawVal);
    if (!norm) {
      notify('Please enter an answer in the space.');
      return;
    }
    examSession.textValue = rawVal.trim();
    correct = (q.accepted || []).map(normaliseTextAnswer).includes(norm);
  }

  stopSpeech();
  examSession.submitted = true;
  if (correct) examSession.correct++;
  examSession.results.push({id: q.id, correct});

  recordAnswer(state, {
    attempt: examSession.attempt,
    id: q.id,
    category: 'exam',
    paper: q.paper,
    part: q.part,
    correct,
    date: todayKey()
  });
  persist();
  render(false);
  document.querySelector('#exam-feedback')?.focus();
}

function examResultView() {
  const isMock = examSession?.isMock;
  const total = examSession?.pool.length || 0;
  const correct = examSession?.correct || 0;
  const pct = total ? Math.round(correct / total * 100) : 0;

  return `
    <section class="panel empty">
      <span class="icon mint">${icon('award')}</span>
      <div class="eyebrow" style="margin-top:25px">EXAM PRACTICE COMPLETE</div>
      <h1>練習完成！</h1>
      <div class="result-score">${correct}<small> / ${total}</small></div>
      <p style="font-size:16px">
        本回合答對 <strong>${correct}</strong> 題（正確率 ${pct}%）。<br>
        <span class="subtle" style="display:block;margin-top:8px">
          這是 KET Garden 本次練習結果，非 Cambridge 官方 Cambridge English Scale 換算分數。
        </span>
      </p>

      ${isMock && examSession.paper === 'readingWriting' ? `
        <div class="sprint-banner" style="text-align:left;margin:25px 0">
          <div>
            <strong>繼續完成寫作 Parts 6 & 7</strong>
            <p>客觀題已完成！現在接著挑戰 Part 6 簡短訊息與 Part 7 看圖寫作。</p>
          </div>
          <div style="display:flex;gap:8px">
            <a class="btn" href="#exam/readingWriting/6">Part 6 寫作 ↗</a>
            <a class="btn secondary" href="#exam/readingWriting/7">Part 7 看圖 ↗</a>
          </div>
        </div>
      ` : ''}

      <div class="actions" style="justify-content:center;margin-top:30px">
        <a class="btn secondary" href="#exam">回到 KET 題型首頁</a>
        <a class="btn secondary" href="#mistakes">查看錯題筆記</a>
        <button class="btn" data-action="continue-exam-practice">
          ${examSession?.isContinuous ? '繼續下一組衝刺' : '再練一次本單元'} →
        </button>
      </div>
    </section>
  `;
}

// ----------------- WRITING PART 6 & 7 VIEWS -----------------
function examWritingView(partNumber) {
  const task = writingExamTasks.find(w => w.part === Number(partNumber));
  if (!task) return empty('找不到此寫作任務', '請回到題型首頁選擇任務。', '#exam', '返回題型庫');

  const draft = state.drafts[task.id] || '';
  const currentCount = wordCount(draft);

  return `
    ${heading(task.title, `${task.type} · Write ${task.min} words or more. Answer all parts of the question.`, 'A2 KEY WRITING PRACTICE', '#exam', '← 返回題型庫')}

    <div class="learning-layout">
      <section class="panel">
        <div class="writing-prompt" lang="en">
          <p style="font-weight:600;font-size:18px">${esc(task.prompt)}</p>

          ${task.points ? `
            <ul style="margin:16px 0">
              ${task.points.map(p => `<li style="margin:6px 0"><strong>${esc(p)}</strong></li>`).join('')}
            </ul>
          ` : ''}

          ${task.part === 7 ? `
            <div class="story-scenes">
              <div class="scene-card">
                <svg viewBox="0 0 160 100" fill="none">
                  <rect width="160" height="100" rx="8" fill="#eef5e8"/>
                  <circle cx="130" cy="30" r="14" fill="#fedc7d"/>
                  <path d="M0 80 Q50 65 100 80 T160 75 L160 100 L0 100 Z" fill="#9bc795"/>
                  <circle cx="50" cy="55" r="7" fill="#f49c82"/>
                  <path d="M50 62 L50 82 M44 70 L56 70" stroke="#48624d" stroke-width="2"/>
                  <circle cx="70" cy="58" r="6" fill="#f49c82"/>
                  <path d="M70 64 L70 82 M65 72 L75 72" stroke="#48624d" stroke-width="2"/>
                  <polygon points="105,25 115,35 105,45 95,35" fill="#e75c5c"/>
                  <line x1="70" y1="65" x2="105" y2="45" stroke="#777" stroke-dasharray="2,2"/>
                </svg>
                <h4>Picture 1</h4>
                <p>Sunny day in park, carrying a red kite.</p>
              </div>

              <div class="scene-card">
                <svg viewBox="0 0 160 100" fill="none">
                  <rect width="160" height="100" rx="8" fill="#eaf0f6"/>
                  <path d="M120 90 L120 40 M110 45 Q120 15 140 40" stroke="#795548" stroke-width="6"/>
                  <circle cx="125" cy="30" r="24" fill="#6da870"/>
                  <path d="M20 30 Q50 20 80 35 M30 45 Q60 35 90 50" stroke="#a0b8cc" stroke-width="2" stroke-linecap="round"/>
                  <polygon points="120,20 128,28 120,36 112,28" fill="#e75c5c"/>
                  <circle cx="45" cy="65" r="6" fill="#f49c82"/>
                  <path d="M45 71 L45 88 M40 76 L50 76" stroke="#48624d" stroke-width="2"/>
                </svg>
                <h4>Picture 2</h4>
                <p>Strong gust of wind blows kite into tree.</p>
              </div>

              <div class="scene-card">
                <svg viewBox="0 0 160 100" fill="none">
                  <rect width="160" height="100" rx="8" fill="#eef5e8"/>
                  <circle cx="125" cy="30" r="24" fill="#6da870"/>
                  <line x1="105" y1="85" x2="115" y2="35" stroke="#8d6e63" stroke-width="3"/>
                  <line x1="112" y1="85" x2="122" y2="35" stroke="#8d6e63" stroke-width="3"/>
                  <line x1="106" y1="75" x2="114" y2="75" stroke="#8d6e63" stroke-width="2"/>
                  <line x1="109" y1="60" x2="117" y2="60" stroke="#8d6e63" stroke-width="2"/>
                  <line x1="112" y1="45" x2="120" y2="45" stroke="#8d6e63" stroke-width="2"/>
                  <circle cx="95" cy="50" r="6" fill="#f49c82"/>
                  <circle cx="40" cy="65" r="6" fill="#f49c82"/>
                  <circle cx="55" cy="68" r="5" fill="#f49c82"/>
                </svg>
                <h4>Picture 3</h4>
                <p>Park keeper arrives with ladder and rescues kite.</p>
              </div>
            </div>
          ` : ''}
        </div>

        <label class="text-label" for="exam-writing-draft">My English Response (Write ${task.min} words or more):</label>
        <textarea id="exam-writing-draft" data-id="${task.id}" lang="en" spellcheck="true" placeholder="Write your ideas here in English…">${esc(draft)}</textarea>

        <div class="draft-meta">
          <span id="exam-word-count"><strong>${currentCount}</strong> / ${task.min} words (minimum)</span>
          <span id="exam-draft-status" role="status">${draft ? 'Draft saved in current browser' : 'Auto-saved locally as you type'}</span>
        </div>

        <details style="margin-top:20px">
          <summary>View Sample Answer (參考示範)</summary>
          <p class="sample" lang="en">${esc(task.sample)}</p>
          <p class="small-note">${esc(task.explanationZh)}</p>
        </details>

        <div class="actions">
          <a class="btn secondary" href="#exam">Back to Exam Hub</a>
          <button class="btn" data-action="finish-exam-writing" data-id="${task.id}">Complete Self-Check ✓</button>
        </div>
        <p id="exam-writing-feedback" class="small-note" role="status" style="margin-top:12px"></p>
      </section>

      <aside class="aside-panel">
        <h3>Self-Check Checklist</h3>
        <p>Before completing, tick off each required element:</p>
        <div class="checklist">
          ${task.checklist.map((item, idx) => `
            <label>
              <input type="checkbox" name="exam-writing-check" value="${idx}">
              <span>${esc(item)}</span>
            </label>
          `).join('')}
        </div>
        <p class="small-note">
          KET 寫作評分依據為：Content（內容是否完整）、Communicative Achievement（格式情境）、Organisation（連接詞與分句）、Language（單字與文法）。
        </p>
      </aside>
    </div>
  `;
}

// ----------------- SPEAKING PART 1 & 2 VIEWS -----------------
function examSpeakingView(partNumber) {
  const part = speakingExamParts.find(s => s.part === Number(partNumber));
  if (!part) return empty('找不到此口說單元', '請回到題型首頁選擇口說單元。', '#exam', '返回題型庫');

  if (part.part === 1) {
    return `
      ${heading(part.title, `${part.timing} · Answer questions about yourself, your home, school, and hobbies.`, 'A2 KEY SPEAKING PART 1', '#exam', '← 返回題型庫')}

      <div class="learning-layout">
        <section class="panel">
          <div class="speaking-q" style="background:#eaf0f6;font-size:18px;line-height:1.7">
            <span class="exam-part-pill" style="margin-bottom:10px;display:inline-block">EXAMINER INTERVIEW</span>
            <p style="font-weight:600;font-size:20px">${esc(part.instructions)}</p>
          </div>

          ${part.phases.map((p, idx) => `
            <div style="margin:24px 0;padding-bottom:18px;border-bottom:1px solid var(--line)">
              <h3 style="color:var(--green);margin-bottom:12px">${p.phase}</h3>
              <ol style="padding-left:22px;line-height:1.9">
                ${p.questions.map((q, qIdx) => {
                  const num = idx * 3 + qIdx + 1;
                  const qFile = `audio/speaking/p1-q${num}.mp3`;
                  const sFile = `audio/speaking/p1-s${num}.mp3`;
                  return `
                  <li style="margin:14px 0">
                    <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px">
                      <span style="font-weight:600;font-size:16px">${esc(q)}</span>
                      <button class="speaker-btn" data-action="say-speaking-q" data-file="${qFile}" data-text="${esc(q)}" style="margin-left:4px;padding:4px 10px;font-size:12px" title="英國考官真人發音 (British RP)">
                        🔊 Listen to examiner
                      </button>
                    </div>
                    <details style="margin-top:8px">
                      <summary>Sample Answer (示範回答)</summary>
                      <p class="sample" lang="en">${esc(p.sampleAnswers[qIdx])}</p>
                      <button class="speaker-btn" data-action="say-speaking-q" data-file="${sFile}" data-text="${esc(p.sampleAnswers[qIdx])}" style="padding:4px 10px;font-size:12px;margin-top:6px" title="自然考生示範回答 (British English)">
                        🔊 Listen to sample
                      </button>
                    </details>
                  </li>
                `;
                }).join('')}
              </ol>
            </div>
          `).join('')}

          <div class="actions">
            <a class="btn secondary" href="#exam">Other Exam Parts</a>
            <button class="btn" data-action="finish-exam-speaking" data-id="speaking-part-1">I Practised Part 1 ✓</button>
          </div>
          <p id="exam-speaking-feedback" class="small-note" role="status"></p>

          <div class="official-video-card" style="margin-top:24px">
            <h4 style="font-size:15px;color:var(--green);margin-bottom:8px">🎬 觀摩 Cambridge 官方真實口說測驗</h4>
            <p class="small-note">觀察考官如何進行個人問答（考生 Luca & Federica，2020 新制）：</p>
            <a class="video-preview-card" href="https://www.youtube.com/watch?v=gyW0Yv_4uHc" target="_blank" rel="noopener noreferrer">
              <div class="video-thumb-wrap">
                <img src="https://img.youtube.com/vi/gyW0Yv_4uHc/hqdefault.jpg" alt="Cambridge A2 Key Speaking Test - Luca and Federica" loading="lazy">
                <div class="video-play-overlay">
                  <span class="video-play-icon">▶</span>
                  <span class="video-play-text">在 YouTube 開啟完整官方實錄 ↗</span>
                </div>
                <span class="video-duration-badge">8:24 · 官方高清</span>
              </div>
              <div class="video-preview-body">
                <strong>A2 Key for Schools Speaking Test - Luca and Federica</strong>
                <p>點擊直接前往 YouTube 觀看官方完整測驗實況（具備英文字幕與官方考官對話）。</p>
              </div>
            </a>
            <details style="margin-top:12px">
              <summary>查看 Cambridge 官方考官點評與得分重點</summary>
              <ul style="padding-left:20px;line-height:1.8;margin:10px 0;font-size:13px">
                <li><strong>完整句子回答：</strong>考官問喜好時，避免只回答單字（例如問是否常去餐廳不要只回 "No"，建議回答 "No, because my mum cooks delicious food at home"）。</li>
                <li><strong>自我修正加分：</strong>說錯動詞時主動更正（如 "Yesterday I have... I had pasta"）是考官非常讚賞的良好習慣。</li>
              </ul>
            </details>
          </div>
        </section>

        <aside class="aside-panel">
          <h3>Useful Sentence Stems</h3>
          ${part.stems.map(s => `<p class="sentence-stem">${esc(s)}</p>`).join('')}
          <p class="small-note">${esc(part.explanationZh)}</p>
        </aside>
      </div>
    `;
  }

  // Part 2: Collaborative Discussion
  return `
    ${heading(part.title, `${part.timing} · Talk together with your partner about the pictures. Say why you like or dislike each activity.`, 'A2 KEY SPEAKING PART 2', '#exam', '← 返回題型庫')}

    <div class="learning-layout">
      <section class="panel">
        <div class="speaking-q" style="background:#fdf8eb;font-size:18px;line-height:1.7">
          <span class="exam-part-pill" style="margin-bottom:10px;display:inline-block">COLLABORATIVE DISCUSSION</span>
          <p style="font-weight:600;font-size:19px">${esc(part.situation)}</p>
          <button class="speaker-btn" data-action="say-speaking-q" data-file="audio/speaking/p2-situation.mp3" data-text="${esc(part.situation)}" style="margin-top:10px;padding:6px 12px;font-size:13px" title="考官說明 (British RP)">
            🔊 Listen to examiner instructions
          </button>
        </div>

        <h3 style="margin-top:24px">5 Activities to discuss with your partner:</h3>
        <div class="partner-prompts">
          ${part.activities.map((a, aIdx) => `
            <div class="partner-box" style="margin:10px 0;width:100%">
              <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
                <strong style="color:var(--green);font-size:16px">${esc(a.name)}</strong>
                <button class="speaker-btn" data-action="say-speaking-q" data-file="audio/speaking/p2-act-${aIdx + 1}.mp3" data-text="${esc(a.stem)}" style="padding:3px 8px;font-size:11px">
                  🔊 Listen
                </button>
              </div>
              <p class="sentence-stem" style="margin:8px 0">${esc(a.stem)}</p>
            </div>
          `).join('')}
        </div>

        <div class="partner-box" style="background:#eaf2e8;border-color:#b9d9b4">
          <strong>Ask your partner:</strong>
          <p style="margin:8px 0;font-size:14px">Don’t just speak alone! Take turns and use these questions:</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${part.partnerPrompts.map(pr => `<span class="partner-chip">${esc(pr)}</span>`).join('')}
          </div>
        </div>

        <details style="margin-top:20px">
          <summary>Sample Partner Conversation (搭檔對話示範)</summary>
          <p class="sample" lang="en">${esc(part.sampleDialogue)}</p>
          <button class="speaker-btn" data-action="say-speaking-q" data-file="audio/speaking/p2-dialogue.mp3" data-text="${esc(part.sampleDialogue)}" style="margin-top:10px;padding:6px 12px;font-size:13px">
            🔊 Listen to full dialogue
          </button>
        </details>

        <div class="actions">
          <a class="btn secondary" href="#exam">Back to Exam Hub</a>
          <button class="btn" data-action="finish-exam-speaking" data-id="speaking-part-2">I Practised Discussion ✓</button>
        </div>
        <p id="exam-speaking-feedback" class="small-note" role="status"></p>

        <div class="official-video-card" style="margin-top:24px">
          <h4 style="font-size:15px;color:var(--green);margin-bottom:8px">🎬 觀摩 Cambridge 官方真實口說 Part 2 搭檔討論實況</h4>
          <p class="small-note">觀察兩位考生如何拿著題目卡互相談論喜好、給予理由（考生 Tommaso & Greta，2020 新制）：</p>
          <a class="video-preview-card" href="https://www.youtube.com/watch?v=zBqqnkr6Qts" target="_blank" rel="noopener noreferrer">
            <div class="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/zBqqnkr6Qts/hqdefault.jpg" alt="Cambridge A2 Key Speaking Test - Tommaso and Greta" loading="lazy">
              <div class="video-play-overlay">
                <span class="video-play-icon">▶</span>
                <span class="video-play-text">在 YouTube 開啟完整官方實錄 ↗</span>
              </div>
              <span class="video-duration-badge">8:30 · 官方高清</span>
            </div>
            <div class="video-preview-body">
              <strong>A2 Key for Schools Speaking Test - Tommaso and Greta</strong>
              <p>點擊直接前往 YouTube 觀看官方完整測驗實況（具備英文字幕與官方考官對話）。</p>
            </div>
          </a>
          <details style="margin-top:12px">
            <summary>查看 Cambridge 官方考官對 Part 2 的評語</summary>
            <ul style="padding-left:20px;line-height:1.8;margin:10px 0;font-size:13px">
              <li><strong>表達理由：</strong>兩位考生都清楚使用 <em>because</em> 解釋為何喜歡或不喜歡這項活動（如 "No I don't because I can't do it"）。</li>
              <li><strong>主動向搭檔提問：</strong>問完自己的想法後，緊接著問搭檔 <em>"Do you like having a picnic with your friends?"</em>，互動項目拿到滿分 5 分。</li>
            </ul>
          </details>
        </div>
      </section>

      <aside class="aside-panel">
        <h3>Examiner Advice</h3>
        <p>In Part 2, Cambridge looks for:</p>
        <ul style="padding-left:18px;line-height:1.8">
          <li>Giving reasons using <strong>because</strong>, <strong>so</strong>, or <strong>but</strong>.</li>
          <li>Asking your partner questions to keep the talk moving.</li>
          <li>Agreeing and disagreeing politely.</li>
        </ul>
        <p class="small-note">${esc(part.explanationZh)}</p>
      </aside>
    </div>
  `;
}

// ----------------- FLASHCARDS & STUDY SECTIONS -----------------
function cards() {
  const pool = filterVocabulary(vocabulary, {query: vocabQuery, topic});
  const search = `
    <form id="vocab-search-form" class="vocab-search" role="search">
      <label for="vocab-search">搜尋英文或中文</label>
      <div>
        <input id="vocab-search" name="query" type="search" value="${esc(vocabQuery)}" placeholder="例如：library、圖書館">
        <button class="btn" type="submit">搜尋</button>
        ${vocabQuery ? '<button class="btn secondary" type="button" data-action="clear-vocab-search">清除</button>' : ''}
      </div>
    </form>
    <p class="vocab-results" role="status" aria-live="polite">找到 ${pool.length} 個單字${topic === '全部' ? '' : ` · ${esc(topic)}`}</p>
  `;
  const chips = `<div class="chips" aria-label="單字主題">${['全部', ...topics].map(t => `<button class="chip ${t === topic ? 'active' : ''}" data-action="topic" data-topic="${t}" aria-pressed="${t === topic}">${t}</button>`).join('')}</div>`;

  if (!pool.length) {
    return `
      ${heading('單字花園', '從 15 個生活主題中搜尋、翻卡和練習。', 'GROW YOUR WORDS', '#practice')}
      ${search}
      ${chips}
      <section class="panel empty">
        <span class="icon mint">${icon('letters')}</span>
        <h2>找不到符合的單字</h2>
        <p>試試較短的英文、中文關鍵字，或切換到「全部」主題。</p>
        <button class="btn" data-action="clear-vocab-search">清除搜尋</button>
      </section>
    `;
  }

  const pageCount = Math.ceil(pool.length / WORDS_PER_PAGE);
  wordPage = Math.max(0, Math.min(wordPage, pageCount - 1));
  const pageStart = wordPage * WORDS_PER_PAGE;
  const pageWords = pool.slice(pageStart, pageStart + WORDS_PER_PAGE);

  cardIndex = Math.max(0, Math.min(cardIndex, pool.length - 1));
  if (cardIndex < pageStart || cardIndex >= pageStart + WORDS_PER_PAGE) cardIndex = pageStart;

  const v = pool[cardIndex];
  const p = pronunciations[v.word];
  const source = p?.source || pronunciationPage(v.word);

  const reverse = flipped
    ? (v.example
        ? `<span class="translation">${esc(v.zh)}</span><span class="example" lang="en">${esc(v.example)}</span><small>${esc(v.translation)}</small>`
        : `<span class="translation">${esc(v.zh)}</span><span class="example">A2 Key 核心字彙</span><small>主題：${esc(v.topic)}</small>`)
    : `<span class="phonetic">${esc(v.pos)}${p ? ` · UK /${esc(p.ipa)}/` : ' · 英式發音'}</span><span class="word" lang="en">${esc(v.word)}</span><small>先想一想，再點一下翻卡 ↻</small>`;

  return `
    ${heading('單字花園', '從 15 個生活主題中搜尋、翻卡和練習。', 'GROW YOUR WORDS', '#practice')}
    ${search}
    ${chips}
    <div class="learning-layout">
      <section class="panel">
        <div class="question-meta">
          <span>${esc(v.topic)}</span>
          <span>${cardIndex + 1} / ${pool.length}</span>
        </div>

        <button class="flashcard" data-action="flip" aria-label="${flipped ? '翻回英文單字' : '翻開中文意思'}">
          ${reverse}
        </button>

        <div class="flash-controls">
          <button class="btn secondary" data-action="prev-card" ${cardIndex === 0 ? 'disabled' : ''}>← 上一張</button>
          <button class="speaker-btn" data-action="play-word" data-word="${esc(v.word)}" type="button">
            <svg viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            聽英式真人發音
          </button>
          <button class="btn secondary" data-action="next-card" ${cardIndex === pool.length - 1 ? 'disabled' : ''}>下一張 →</button>
        </div>

        <div class="audio-source">
          <a class="text-button" href="${source}" target="_blank" rel="noopener noreferrer">到 Cambridge 聽真人發音 ↗</a>
          ${v.example ? `<button class="text-button" data-action="say-example" data-id="${v.id}">聽例句（合成語音）</button>` : ''}
        </div>

        <div class="word-grid">
          ${pageWords.map((w, i) => `
            <div class="word-item ${pageStart + i === cardIndex ? 'current' : ''}" style="display:flex;justify-content:space-between;align-items:center">
              <button data-action="pick-card" data-index="${pageStart + i}" aria-label="查看 ${esc(w.word)}" style="background:none;border:0;padding:0;text-align:left;flex:1;cursor:pointer">
                <span lang="en" style="font-weight:600;display:block">${esc(w.word)}</span>
                <small>${esc(w.zh)}</small>
              </button>
              <button class="text-button" data-action="play-word" data-word="${esc(w.word)}" aria-label="播放 ${esc(w.word)} 發音" style="padding:4px 8px;font-size:16px;color:var(--green)">
                🔊
              </button>
            </div>
          `).join('')}
        </div>

        <div class="word-pagination">
          <button class="btn secondary" data-action="prev-word-page" ${wordPage === 0 ? 'disabled' : ''}>← 上一頁</button>
          <span>第 ${wordPage + 1} / ${pageCount} 頁</span>
          <button class="btn secondary" data-action="next-word-page" ${wordPage === pageCount - 1 ? 'disabled' : ''}>下一頁 →</button>
        </div>
      </section>

      <aside class="aside-panel">
        <h3>把單字放進生活裡</h3>
        <p>先看英文、自己想意思，再翻卡確認並跟著發音唸一次。</p>
        <ul>
          <li>可用英文或中文搜尋。</li>
          <li>15 個主題可分開練習。</li>
          <li>做完一組小測驗，可立刻再練。</li>
        </ul>
        <button class="btn" data-action="vocab-quiz">開始單字小測驗 ↗</button>
      </aside>
    </div>
  `;
}

// ----------------- STUDY LESSON PICKER -----------------
function lessonPicker(category) {
  const isReading = category === 'reading';
  const pool = isReading ? reading : listening;
  const blocks = [];
  const size = isReading ? 6 : 5;
  for (let i = 0; i < pool.length; i += size) blocks.push(pool.slice(i, i + size));

  return `
    ${heading(
      isReading ? '閱讀小徑' : '聽力時光',
      isReading ? '慢慢讀，找出時間、地點和真正要傳達的訊息。' : '可以重播，也可以調慢速度。送出答案後，就能查看逐字稿。',
      isReading ? 'READ & DISCOVER' : 'LISTEN & NOTICE',
      '#practice'
    )}
    ${!isReading ? `
      <div class="sprint-banner official-banner">
        <div>
          <strong>想熟悉真正考試的聲音？</strong>
          <p>直接聽 Cambridge 官方樣題錄音，搭配官方試題作答。</p>
        </div>
        <a class="btn" href="#official">官方聽力樣題 ↗</a>
      </div>
    ` : ''}

    <div class="learning-layout">
      <section class="list">
        ${blocks.map((group, i) => `
          <article class="task-card">
            <span class="icon ${isReading ? 'yellow' : 'blue'}">${icon(isReading ? 'book' : 'headphones')}</span>
            <div>
              <h3>${isReading ? ['生活裡的小訊息', '短文與文法線索'][i] || `第 ${i + 1} 組練習` : ['日常對話練習', '聽懂安排與變化'][i] || `第 ${i + 1} 組練習`}</h3>
              <p>${group.length} 題 · ${isReading ? '約 5–8 分鐘' : '約 6–10 分鐘'}</p>
            </div>
            <button class="btn secondary" data-action="start-block" data-category="${category}" data-block="${i}">開始練習 ↗</button>
          </article>
        `).join('')}
      </section>

      <aside class="aside-panel">
        <h3>${isReading ? '閱讀小提醒' : '聽力小提醒'}</h3>
        <p>${isReading ? '先看問題，再讀文章。遇到不認識的單字，先用上下文推測意思，不必每個字都查。' : '先看問題，想想要找的是時間、價格還是地點。聽到 but、instead 時，留意資訊是否改變。'}</p>
      </aside>
    </div>
  `;
}

// ----------------- STUDY QUIZ RUNNER -----------------
function startQuiz(pool, title, kind = 'quiz') {
  quiz = {
    pool: [...pool],
    title,
    kind,
    index: 0,
    selected: null,
    submitted: false,
    correct: 0,
    results: [],
    attempt: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  };
  stopSpeech();
  if (location.hash === '#quiz') render();
  else location.hash = 'quiz';
}

function startDaily() {
  const date = todayKey();
  const pool = [
    ...selectDaily(vocabQuestions, date, 3),
    ...selectDaily(reading, date, 3),
    ...selectDaily(listening, date, 2)
  ];
  quiz = {
    pool,
    title: '今日小挑戰',
    kind: 'daily',
    index: 0,
    selected: null,
    submitted: false,
    correct: 0,
    results: [],
    attempt: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
  };
}

function questionView() {
  if (!quiz?.pool.length) {
    return empty('先挑一個練習吧', '選擇單字、閱讀或聽力，就能開始新的小挑戰。', '#practice', '選擇練習');
  }
  if (quiz.index >= quiz.pool.length) return resultView();

  const q = quiz.pool[quiz.index];
  const done = quiz.submitted;
  const correct = quiz.selected === q.answer;

  return `
    ${heading(quiz.title, `第 ${quiz.index + 1} 題，共 ${quiz.pool.length} 題。做完這一題，再往前一步。`, 'ONE QUESTION AT A TIME', '#practice')}

    <div class="learning-layout">
      <section class="panel">
        <div class="question-meta">
          <span class="tag">${labels[q.category] || '練習'} · ${q.topic || '主題'}</span>
          <span>${quiz.index + 1} / ${quiz.pool.length}</span>
        </div>

        <div class="progress" role="progressbar" aria-label="本回合進度" aria-valuenow="${quiz.index + (done ? 1 : 0)}" aria-valuemin="0" aria-valuemax="${quiz.pool.length}">
          <span style="width:${(quiz.index + (done ? 1 : 0)) / quiz.pool.length * 100}%"></span>
        </div>

        ${q.category === 'listening' ? `
          <div class="audio-box">
            <div class="audio-label">LISTEN CAREFULLY · 聽聽看</div>
            <div class="audio-controls">
              <button class="btn" data-action="play-question" type="button">▶ 播放對話</button>
              <button class="text-button" data-action="stop-audio" type="button">停止</button>
              <label>
                <span class="sr-only">語音播放速度</span>
                <select id="speech-rate">
                  <option value="0.9">一般速度</option>
                  <option value="0.7">慢速練習</option>
                </select>
              </label>
            </div>
            <p id="speech-status" role="status" class="speech-status">瀏覽器英文合成語音 · 可以重複播放</p>
          </div>
        ` : `<div class="passage" lang="en">${esc(q.passage)}</div>`}

        <form id="answer-form">
          <h2 id="question-title" class="question" lang="en">${esc(q.question)}</h2>

          <fieldset class="choices" ${done ? 'disabled' : ''}>
            <legend class="sr-only">選擇一個答案</legend>
            ${q.choices.map((c, i) => `
              <label class="choice ${done ? (i === q.answer ? 'correct' : i === quiz.selected ? 'incorrect' : '') : ''}">
                <input type="radio" name="answer" value="${i}" ${quiz.selected === i ? 'checked' : ''} required>
                <span class="choice-letter" aria-hidden="true">${'ABCDEFGH'[i]}</span>
                <span lang="${q.category === 'vocabulary' ? 'zh-Hant' : 'en'}">${esc(c)}</span>
                ${done && i === q.answer ? '<span class="choice-result">✓ 正確答案</span>' : done && i === quiz.selected ? '<span class="choice-result">再想想</span>' : ''}
              </label>
            `).join('')}
          </fieldset>

          ${done ? `
            <div class="feedback ${correct ? '' : 'wrong'}" id="feedback" role="status" tabindex="-1">
              <h3>${correct ? '答對了！你找到線索了。' : '差一點，再看看這個線索。'}</h3>
              <p>${esc(q.explanation)}</p>
              ${!correct ? '<p class="subtle">已放進錯題筆記，下次可以再試一次。</p>' : ''}
            </div>
            ${q.script ? `
              <details>
                <summary>查看英文逐字稿</summary>
                <p lang="en">${esc(q.script)}</p>
              </details>
            ` : ''}
          ` : ''}

          <div class="actions">
            ${done ? `
              <span class="subtle">先讀完解析，再繼續。</span>
              <button class="btn" type="button" data-action="next-question">${quiz.index === quiz.pool.length - 1 ? '看看練習成果' : '下一題'} →</button>
            ` : `
              <span class="subtle">選好後，就可以確認答案。</span>
              <button class="btn" type="submit">確認答案 →</button>
            `}
          </div>
        </form>
      </section>

      <aside class="aside-panel">
        <h3>不急，找到自己的步調。</h3>
        <p>${q.category === 'listening' ? '可以先看問題再播放。注意對話最後確認的安排，不要只記住第一個聽到的數字。' : q.category === 'reading' ? '注意問題中的關鍵字，再回到原文尋找支持答案的句子。' : '先看例句，想一想這個單字在句子裡代表什麼。'}</p>
      </aside>
    </div>
  `;
}

function submitAnswer(form) {
  if (!quiz || quiz.submitted) return;
  const chosen = new FormData(form).get('answer');
  if (chosen === null) {
    notify('先選擇一個答案，再按確認。');
    return;
  }
  const index = Number(chosen);
  const q = quiz.pool[quiz.index];
  if (!Number.isInteger(index) || index < 0 || index >= q.choices.length) return;

  stopSpeech();
  quiz.selected = index;
  quiz.submitted = true;
  const correct = index === q.answer;
  if (correct) quiz.correct++;
  quiz.results.push({id: q.id, correct});

  recordAnswer(state, {
    attempt: quiz.attempt,
    id: q.id,
    category: q.category,
    correct,
    date: todayKey()
  });
  persist();
  render(false);
  document.querySelector('#feedback')?.focus();
}

function resultView() {
  return `
    <section class="panel empty">
      <span class="icon mint">${icon('leaf')}</span>
      <div class="eyebrow" style="margin-top:25px">A LITTLE PROGRESS, WELL DONE</div>
      <h1>今天，又往前了一小步。</h1>
      <div class="result-score">${quiz.correct}<small> / ${quiz.pool.length}</small></div>
      <p>這回合答對 ${quiz.correct} 題。${quiz.correct === quiz.pool.length ? '每一道線索，都被你找到了！' : '讀過解析、願意再試一次，就是進步。'}<br><span class="subtle">這是本回合練習結果，不是官方考試分數。</span></p>
      <div class="actions" style="justify-content:center">
        <a class="btn secondary" href="#home">回到首頁</a>
        <a class="btn secondary" href="#mistakes" style="margin-left:0">看看錯題筆記</a>
        <button class="btn" data-action="continue-practice" style="margin-left:0">${quiz.kind === 'sprint' ? '繼續下一組' : '再練一組'} →</button>
      </div>
    </section>
  `;
}

function empty(title, desc, href = '#practice', button = '挑一個練習') {
  return `
    <section class="panel empty">
      <span class="icon mint">${icon('check')}</span>
      <h2>${title}</h2>
      <p>${desc}</p>
      <a class="btn" href="${href}">${button} ↗</a>
    </section>
  `;
}

// ----------------- MISTAKES & REVIEWS -----------------
function mistakes() {
  const all = allAvailableQuestions();
  const list = state.mistakes.map(id => all.find(q => q.id === id)).filter(Boolean);

  return `
    ${heading('錯題筆記', '每一題答錯的地方，都藏著下一次進步的線索。', 'TRY AGAIN, GROW AGAIN', '#home')}
    ${!list.length ? empty('目前沒有待複習的錯題', '開始一小組練習吧。答錯的題目會自動收在這裡。') : `
      <div class="section-head">
        <p class="subtle">共 ${list.length} 題 · 重答正確後，自動移出這裡</p>
        <button class="btn" data-action="review-all">全部再練一次 ↗</button>
      </div>
      <div class="list">
        ${list.map(q => `
          <article class="task-card">
            <span class="icon ${q.paper === 'listening' || q.category === 'listening' ? 'blue' : 'yellow'}">
              ${icon(q.paper === 'listening' || q.category === 'listening' ? 'headphones' : 'book')}
            </span>
            <div>
              <p>${q.paper ? `KET ${q.paper === 'listening' ? 'Listening' : 'Reading & Writing'} Part ${q.part}` : `${labels[q.category] || ''} · ${q.topic || ''}`}</p>
              <h3 lang="en">${esc(q.question)}</h3>
            </div>
            <button class="btn secondary" data-action="review-one" data-id="${q.id}">再試一次</button>
          </article>
        `).join('')}
      </div>
    `}
  `;
}

// ----------------- STUDY WRITING & SPEAKING -----------------
function writingList() {
  return `
    ${heading('寫作練習', '用自己的話，把訊息說清楚。先試著寫，再對照參考答案。', 'MAKE YOUR WORDS COUNT', '#practice')}
    <div class="list">
      ${writing.map(w => `
        <article class="task-card">
          <span class="icon peach">${icon('pen')}</span>
          <div>
            <h3>${w.title}</h3>
            <p>${w.type} · 至少 ${w.min} 個英文單字${state.drafts[w.id] ? ' · 已有草稿' : ''}</p>
          </div>
          <a class="btn secondary" href="#writing/${w.id}">${state.drafts[w.id] ? '繼續寫' : '開始寫'} ↗</a>
        </article>
      `).join('')}
    </div>
  `;
}

function writingView(id) {
  const w = writing.find(w => w.id === id);
  if (!w) return empty('找不到這個寫作任務', '回到寫作頁，重新選擇一個題目。', '#writing', '查看寫作任務');
  const draft = state.drafts[id] || '';

  return `
    ${heading(w.title, `${w.type} · 至少 ${w.min} 個英文單字。先把三個重點寫完整。`, 'YOUR IDEAS, IN ENGLISH', '#writing')}
    <div class="learning-layout">
      <section class="panel">
        <div class="writing-prompt" lang="en">
          <p>${esc(w.prompt)}</p>
          <ul>${w.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
        </div>
        <label class="text-label" for="writing-draft">我的英文草稿</label>
        <textarea id="writing-draft" data-id="${id}" lang="en" spellcheck="true" placeholder="Write your ideas here…">${esc(draft)}</textarea>
        <div class="draft-meta">
          <span id="word-count">${wordCount(draft)} / ${w.min} 字（至少）</span>
          <span id="draft-status" role="status">${draft ? '已載入本機草稿' : '輸入後自動儲存在目前瀏覽器'}</span>
        </div>
        <details>
          <summary>寫完了？看看參考答案</summary>
          <p class="sample" lang="en">${esc(w.sample)}</p>
          <p>答案不只一種。先比較是否寫齊三個重點，再檢查句子。</p>
        </details>
        <div class="actions">
          <a class="btn secondary" href="#writing">其他寫作任務</a>
          <button class="btn" data-action="finish-writing" data-id="${id}">完成自我檢查 ✓</button>
        </div>
        <p id="writing-feedback" class="small-note" role="status"></p>
      </section>
      <aside class="aside-panel">
        <h3>寫作小清單</h3>
        <p>${w.tip}</p>
        <div class="checklist">
          ${w.hints.map((hint, i) => `<label><input type="checkbox" name="writing-check" value="${i}"><span>${hint}</span></label>`).join('')}
          <label><input type="checkbox" name="writing-check" value="3"><span>我檢查過大小寫、句點和拼字。</span></label>
        </div>
      </aside>
    </div>
  `;
}

function speakingList() {
  return `
    ${heading('開口說說', '先自己回答，再看看示範。可以請家人用追問句，陪你多聊一點。', 'LET’S TALK ABOUT YOUR WORLD', '#practice')}
    <div class="list">
      ${speaking.map(s => `
        <article class="task-card">
          <span class="icon lavender">${icon('chat')}</span>
          <div>
            <h3>${s.title}</h3>
            <p>${s.topic} · 約 2–3 分鐘</p>
          </div>
          <a class="btn secondary" href="#speaking/${s.id}">開始說說 ↗</a>
        </article>
      `).join('')}
    </div>
  `;
}

function speakingView(id) {
  const s = speaking.find(s => s.id === id);
  if (!s) return empty('找不到這個口說話題', '回到口說頁，重新選擇一個話題。', '#speaking', '查看口說話題');

  return `
    ${heading(s.title, '讀一讀問題，試著用兩到三句英文回答。', 'YOUR VOICE MATTERS', '#speaking')}
    <div class="learning-layout">
      <section class="panel">
        <div class="question-meta"><span class="tag">${s.topic}</span><span>親子陪練</span></div>
        <div class="speaking-q" lang="en">${s.question}<p lang="zh-Hant">${s.zh}</p></div>
        <button class="speaker-btn" data-action="say-prompt" data-id="${id}" style="padding:4px 10px;font-size:12px">🔊 聽聽問題怎麼唸 (真人英式發音)</button>
        <h3 style="margin-top:24px">再多聊一句</h3>
        <p lang="en" style="margin-top:12px">${s.follow}</p>
        <details>
          <summary>需要一點靈感？查看示範回答</summary>
          <p class="sample" lang="en">${s.sample}</p>
          <button class="speaker-btn" data-action="say-sample" data-id="${id}" style="padding:4px 10px;font-size:12px;margin-top:6px">🔊 聽示範回答 (真人英式發音)</button>
        </details>
        <div class="actions">
          <a class="btn secondary" href="#speaking">其他口說話題</a>
          <button class="btn" data-action="finish-speaking" data-id="${id}">我練習過了 ✓</button>
        </div>
        <p id="speaking-feedback" role="status" class="small-note"></p>
      </section>
      <aside class="aside-panel">
        <h3>可以這樣開頭</h3>
        ${s.stems.map(stem => `<p lang="en" class="sentence-stem">${stem}</p>`).join('')}
      </aside>
    </div>
  `;
}

// ----------------- PROGRESS VIEW -----------------
function progressView() {
  const s = stats();
  const events = [...state.answers, ...state.activities];
  const week = Array.from({length: 7}, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return {key: todayKey(d), label: d.toLocaleDateString('zh-TW', {weekday: 'narrow'}), day: d.getDate()};
  });

  const rwObjectiveCount = rwObjectiveQuestions.length;
  const rwDone = new Set(state.answers.filter(a => a.paper === 'readingWriting').map(a => a.id)).size;
  const lCount = listeningObjectiveQuestions.length;
  const lDone = new Set(state.answers.filter(a => a.paper === 'listening').map(a => a.id)).size;

  return `
    ${heading('我的進步', '記錄真實練習的每一步，不需要和任何人比較。', 'LOOK HOW FAR YOU’VE GROWN', '#home')}
    ${summaryStats()}
    <div class="progress-grid">
      <section class="panel">
        <h3>最近 7 天</h3>
        <p class="small-note">完成選擇題、寫作自我檢查或口說練習，就會留下足跡。</p>
        <div class="week">
          ${week.map(d => `
            <div class="day ${events.some(e => e.date === d.key) ? 'done' : ''}">
              <span>${d.label}</span>
              <b aria-label="${d.key} ${events.some(e => e.date === d.key) ? '已練習' : '尚未練習'}">
                ${events.some(e => e.date === d.key) ? '✓' : d.day}
              </b>
            </div>
          `).join('')}
        </div>
        <div class="review-row"><span>累積作答次數</span><strong>${s.total} 次</strong></div>
        <div class="review-row"><span>累積答對次數</span><strong>${s.correct} 次${s.total ? ` · ${Math.round(s.correct / s.total * 100)}%` : ''}</strong></div>
      </section>

      <section class="panel">
        <h3>KET 題型練習探索進度</h3>
        <div class="progress-row">
          <div><span>Reading and Writing Parts 1–5</span><span>${rwDone} / ${rwObjectiveCount}</span></div>
          <div class="progress" role="progressbar" aria-valuenow="${rwDone}" aria-valuemin="0" aria-valuemax="${rwObjectiveCount}">
            <span style="width:${rwDone / rwObjectiveCount * 100}%"></span>
          </div>
        </div>
        <div class="progress-row">
          <div><span>Listening Parts 1–5</span><span>${lDone} / ${lCount}</span></div>
          <div class="progress" role="progressbar" aria-valuenow="${lDone}" aria-valuemin="0" aria-valuemax="${lCount}">
            <span style="width:${lDone / lCount * 100}%"></span>
          </div>
        </div>
        <p class="small-note">進度代表曾練習過的不同題目數，正確率非官方考試成績。</p>
      </section>
    </div>
  `;
}

// ----------------- SPRINT & CONTINUOUS PRACTICE -----------------
function sprintView() {
  const remaining = questions.filter(q => !state.answers.some(a => a.id === q.id)).length;
  return `
    ${heading('自由連續練習', '想練多久，由你決定。完成一組後可以直接開始下一組。', 'PRACTISE AT YOUR OWN PACE', '#practice')}
    <div class="learning-layout">
      <section class="panel">
        <h2>這一回合，想練什麼？</h2>
        <label class="text-label" for="sprint-category">練習範圍</label>
        <select class="wide-select" id="sprint-category">
          <option value="mixed">綜合練習（單字＋閱讀＋聽力）</option>
          <option value="vocabulary">單字小測驗</option>
          <option value="reading">閱讀與選字</option>
          <option value="listening">原創聽力（合成語音）</option>
        </select>
        <label class="text-label" for="sprint-count">每組題數</label>
        <select class="wide-select" id="sprint-count">
          <option value="5">5 題 · 短練習</option>
          <option value="10" selected>10 題 · 集中練習</option>
          <option value="20">20 題 · 多練一點</option>
          <option value="all">此範圍全部題目</option>
        </select>
        <div class="actions">
          <button class="btn" data-action="start-sprint">開始這一組 →</button>
        </div>
      </section>
      <aside class="aside-panel">
        <h3>不限次數，持續練習</h3>
        <p>題庫共 ${questions.length} 題，目前還有 ${remaining} 題未練過。優先出現未練過的題目。</p>
      </aside>
    </div>
  `;
}

function runSprint(category, countChoice) {
  const pool = category === 'mixed' ? questions : questions.filter(q => q.category === category);
  const count = countChoice === 'all' ? pool.length : Number(countChoice);
  if (!pool.length || (![5, 6, 8, 10, 20].includes(count) && countChoice !== 'all')) return;
  const next = selectPractice(pool, state.answers, count, `${Date.now()}-${state.answers.length}`);
  startQuiz(next, category === 'mixed' ? '綜合連續練習' : `${labels[category]}連續練習`, 'sprint');
  quiz.sprintCategory = category;
  quiz.sprintCount = countChoice;
}

function runExamContinuous() {
  const pool = examQuestions;
  const next = selectPractice(pool, state.answers, 10, `${Date.now()}-${state.answers.length}`);
  startExamSession(next, {
    title: 'KET 考前連續衝刺（10 題）',
    paper: 'mixed',
    isContinuous: true
  });
}

// ----------------- OFFICIAL AUDIO -----------------
function officialView() {
  return `
    ${heading('Cambridge 官方聽力樣題', '熟悉真正考試的聲音、語速與作答安排。這裡播放的是 Cambridge 官方公開錄音。', 'LISTEN TO THE REAL EXAM FORMAT', '#exam')}
    <div class="learning-layout">
      <section class="panel">
        <span class="course-tag">CAMBRIDGE ENGLISH · 官方公開資源</span>
        <h2 style="margin-top:20px">A2 Key for Schools</h2>
        <p class="small-note">Handbook for teachers · Listening audio</p>
        <audio id="official-audio" controls preload="none" src="${officialAudio}" aria-label="Cambridge A2 Key for Schools 官方聽力樣題錄音"></audio>
        <p id="official-audio-status" role="status" class="small-note">按播放開始。建議先開啟下方的官方手冊，找到 Listening 樣題對應作答。</p>
        <div class="actions">
          <a class="btn" href="${officialHandbook}" target="_blank" rel="noopener noreferrer">開啟官方手冊與樣題 ↗</a>
          <a class="btn secondary" href="${officialDigitalTest}" target="_blank" rel="noopener noreferrer">官方數位聽力模擬 ↗</a>
        </div>

        <div class="official-video-card">
          <span class="course-tag">CAMBRIDGE ENGLISH · 官方口說考試實錄影片</span>
          <h3 style="margin-top:14px;color:var(--green)">A2 Key for Schools 口說真實測驗（Luca & Federica）</h3>
          <p class="small-note">觀摩 Cambridge 官方考官主持的完整測驗（含 Part 1 考官問答與 Part 2 搭檔討論）：</p>
          <a class="video-preview-card" href="https://www.youtube.com/watch?v=gyW0Yv_4uHc" target="_blank" rel="noopener noreferrer">
            <div class="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/gyW0Yv_4uHc/hqdefault.jpg" alt="Cambridge A2 Key Speaking Test - Luca and Federica" loading="lazy">
              <div class="video-play-overlay">
                <span class="video-play-icon">▶</span>
                <span class="video-play-text">在 YouTube 開啟完整官方實錄 ↗</span>
              </div>
              <span class="video-duration-badge">8:24 · 官方高清</span>
            </div>
            <div class="video-preview-body">
              <strong>A2 Key for Schools Speaking Test - Luca and Federica</strong>
              <p>官方考官全程主持：包含 Part 1 個人背景日常問答與 Part 2 情境討論（具備官方英文字幕）。</p>
            </div>
          </a>

          <h3 style="margin-top:24px;color:var(--green)">另一組考生示範（Tommaso & Greta）</h3>
          <p class="small-note">觀察兩位學童如何運用原因（because）與連接詞向搭檔提問：</p>
          <a class="video-preview-card" href="https://www.youtube.com/watch?v=zBqqnkr6Qts" target="_blank" rel="noopener noreferrer">
            <div class="video-thumb-wrap">
              <img src="https://img.youtube.com/vi/zBqqnkr6Qts/hqdefault.jpg" alt="Cambridge A2 Key Speaking Test - Tommaso and Greta" loading="lazy">
              <div class="video-play-overlay">
                <span class="video-play-icon">▶</span>
                <span class="video-play-text">在 YouTube 開啟完整官方實錄 ↗</span>
              </div>
              <span class="video-duration-badge">8:30 · 官方高清</span>
            </div>
            <div class="video-preview-body">
              <strong>A2 Key for Schools Speaking Test - Tommaso and Greta</strong>
              <p>完整測驗流程觀摩，考官點評 Interactive Communication（互動性）獲得 5/5 滿分表現。</p>
            </div>
          </a>
        </div>
      </section>
      <aside class="aside-panel">
        <h3>備考建議</h3>
        <p>真實考試包含不同英語口音；在習慣清晰英式發音的同時，也多聽聽官方樣題錄音中的自然語速。</p>
        <p class="small-note" style="margin-top:14px">
          口說影片觀摩重點：<br>
          1. 考官點名時的禮貌應對。<br>
          2. 回答長度約 2–3 句，不需要講太複雜的文法。<br>
          3. Part 2 時看著搭檔，主動問 <em>"Do you agree?"</em> 或 <em>"What about you?"</em>。
        </p>
      </aside>
    </div>
  `;
}

// ----------------- ROUTER & DISPATCHER -----------------
function render(focus = true) {
  const hash = location.hash.slice(1);
  const parts = hash.split('/');
  const route = parts[0] || 'home';
  const param1 = parts[1];
  const param2 = parts[2];

  updateBadge();

  // Active navigation link
  document.querySelectorAll('[data-nav]').forEach(a => {
    let active = false;
    const target = a.dataset.nav;
    if (target === 'home') active = route === 'home';
    else if (target === 'exam') active = route === 'exam' || route === 'exam-runner' || route === 'mock';
    else if (target === 'practice') active = route === 'practice' || ['vocabulary', 'reading', 'listening', 'writing', 'speaking', 'sprint'].includes(route);
    else if (target === 'mistakes') active = route === 'mistakes';

    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });

  // Route matching
  if (route === 'home') {
    main.innerHTML = home();
  } else if (route === 'practice') {
    main.innerHTML = practiceHub();
  } else if (route === 'exam') {
    if (param1 && param2) {
      const partNum = Number(param2);
      if (param1 === 'readingWriting') {
        if (partNum === 6 || partNum === 7) {
          main.innerHTML = examWritingView(partNum);
        } else {
          const qs = examQuestions.filter(q => q.paper === 'readingWriting' && q.part === partNum);
          startExamSession(qs, {
            title: `Reading & Writing · Part ${partNum}`,
            paper: 'readingWriting',
            part: partNum
          });
          return;
        }
      } else if (param1 === 'listening') {
        const qs = examQuestions.filter(q => q.paper === 'listening' && q.part === partNum);
        startExamSession(qs, {
          title: `Listening · Part ${partNum}`,
          paper: 'listening',
          part: partNum
        });
        return;
      } else if (param1 === 'speaking') {
        main.innerHTML = examSpeakingView(partNum);
      }
    } else {
      main.innerHTML = examHub();
    }
  } else if (route === 'mock') {
    const paperName = param1;
    if (paperName === 'readingWriting') {
      const assembled = assemblePaper('readingWriting');
      startExamSession(assembled.objective, {
        title: 'Full Mock: Reading & Writing (Parts 1–5)',
        paper: 'readingWriting',
        isMock: true
      });
      return;
    } else if (paperName === 'listening') {
      const assembled = assemblePaper('listening');
      startExamSession(assembled.objective, {
        title: 'Full Mock: Listening (Parts 1–5)',
        paper: 'listening',
        isMock: true
      });
      return;
    } else {
      main.innerHTML = examHub();
    }
  } else if (route === 'exam-runner') {
    main.innerHTML = examQuestionView();
  } else if (route === 'exam-continuous') {
    runExamContinuous();
    return;
  } else if (route === 'vocabulary') {
    main.innerHTML = cards();
  } else if (route === 'reading') {
    main.innerHTML = lessonPicker('reading');
  } else if (route === 'listening') {
    main.innerHTML = lessonPicker('listening');
  } else if (route === 'writing') {
    main.innerHTML = param1 ? writingView(param1) : writingList();
  } else if (route === 'speaking') {
    main.innerHTML = param1 ? speakingView(param1) : speakingList();
  } else if (route === 'mistakes') {
    main.innerHTML = mistakes();
  } else if (route === 'progress') {
    main.innerHTML = progressView();
  } else if (route === 'sprint') {
    main.innerHTML = sprintView();
  } else if (route === 'official') {
    main.innerHTML = officialView();
  } else if (route === 'quiz') {
    main.innerHTML = questionView();
  } else if (route === 'daily') {
    if (!quiz || quiz.kind !== 'daily') startDaily();
    main.innerHTML = questionView();
  } else {
    main.innerHTML = empty('這條小徑還不存在', '回到花園，挑一個你想練習的主題。', '#home', '回到首頁');
  }

  const official = document.querySelector('#official-audio');
  if (official) {
    official.addEventListener('error', () => {
      document.querySelector('#official-audio-status').textContent = '錄音無法載入，請直接點選下方官方手冊或官方備考頁播放。';
    });
  }

  if (focus) {
    window.scrollTo({top: 0, behavior: 'instant'});
    main.focus({preventScroll: true});
  }
}

// ----------------- EVENT LISTENERS -----------------
document.querySelector('.skip')?.addEventListener('click', e => {
  e.preventDefault();
  main.focus();
  main.scrollIntoView();
});

main.addEventListener('submit', e => {
  if (e.target.id === 'answer-form') {
    e.preventDefault();
    submitAnswer(e.target);
  }
  if (e.target.id === 'exam-answer-form') {
    e.preventDefault();
    submitExamAnswer(e.target);
  }
  if (e.target.id === 'vocab-search-form') {
    e.preventDefault();
    vocabQuery = new FormData(e.target).get('query')?.toString().trim() || '';
    cardIndex = 0;
    wordPage = 0;
    flipped = false;
    render(false);
    document.querySelector('#vocab-search')?.focus();
  }
});

main.addEventListener('input', e => {
  if (e.target.id === 'writing-draft') {
    const el = e.target;
    const w = writing.find(w => w.id === el.dataset.id);
    if (!w) return;
    state.drafts[w.id] = el.value;
    document.querySelector('#word-count').textContent = `${wordCount(el.value)} / ${w.min} 字（至少）`;
    document.querySelector('#draft-status').textContent = persist() ? '草稿已儲存在目前瀏覽器' : '無法儲存，請自行複製保留草稿';
  }
  if (e.target.id === 'exam-writing-draft') {
    const el = e.target;
    const task = writingExamTasks.find(w => w.id === el.dataset.id);
    if (!task) return;
    state.drafts[task.id] = el.value;
    const count = wordCount(el.value);
    document.querySelector('#exam-word-count').innerHTML = `<strong>${count}</strong> / ${task.min} words (minimum)`;
    document.querySelector('#exam-draft-status').textContent = persist() ? 'Draft saved in current browser' : 'Unable to save, please copy text';
  }
});

main.addEventListener('click', e => {
  const btn = e.target.closest('[data-action]');
  if (!btn || btn.disabled) return;
  const a = btn.dataset.action;
  const id = btn.dataset.id;

  // Audio actions
  if (a === 'play-recording') {
    if (!examSession) return;
    const q = examSession.pool[examSession.index];
    if (q?.script) {
      examSession.playCount++;
      const rate = Number(document.querySelector('#speech-rate')?.value || 0.9);
      const audioFile = getExamListeningAudioPath(q);
      if (audioFile) {
        playAudioFile(audioFile, null, rate);
      } else {
        notify('找不到對應的真人錄音檔。');
      }
      render(false);
    }
  }
  if (a === 'stop-audio') {
    stopSpeech();
    const status = document.querySelector('#speech-status');
    if (status) status.textContent = 'Audio stopped.';
  }
  if (a === 'say-speaking-q') {
    const file = btn.dataset.file;
    const text = btn.dataset.text;
    if (file) {
      playAudioFile(file, text);
    } else if (text) {
      speak(text, 0.9);
    }
  }
  if (a === 'say-example') {
    const v = vocabulary.find(v => v.id === id);
    if (v?.example) speak(v.example);
  }
  if (a === 'say-prompt' || a === 'say-sample') {
    const s = speaking.find(s => s.id === id);
    if (s) {
      const type = a === 'say-prompt' ? 'q' : 's';
      const file = `audio/speaking/bilingual-${id}-${type}.mp3`;
      playAudioFile(file, a === 'say-prompt' ? s.question : s.sample);
    }
  }
  if (a === 'play-word') {
    const word = btn.dataset.word;
    if (word) playWordAudio(word);
  }

  // Exam navigation
  if (a === 'next-exam-question' && examSession?.submitted) {
    stopSpeech();
    examSession.index++;
    examSession.selected = null;
    examSession.textValue = '';
    examSession.submitted = false;
    examSession.playCount = 0;
    render();
  }
  if (a === 'continue-exam-practice') {
    if (examSession?.isContinuous) {
      runExamContinuous();
    } else if (examSession?.part) {
      const qs = examQuestions.filter(q => q.paper === examSession.paper && q.part === examSession.part);
      startExamSession(qs, {
        title: examSession.title,
        paper: examSession.paper,
        part: examSession.part
      });
    } else {
      location.hash = '#exam';
    }
  }
  if (a === 'finish-exam-writing') {
    const task = writingExamTasks.find(w => w.id === id);
    if (!task) return;
    const feedback = document.querySelector('#exam-writing-feedback');
    const count = wordCount(state.drafts[id] || '');
    if (count < task.min) {
      feedback.textContent = `Current count is ${count} words. Please write at least ${task.min} words.`;
      return;
    }
    const checks = document.querySelectorAll('[name="exam-writing-check"]:checked').length;
    if (checks < task.checklist.length) {
      feedback.textContent = 'Please confirm all checklist items on the right before finishing.';
      return;
    }
    recordActivity(state, 'exam-writing', id);
    persist();
    feedback.textContent = 'Practice completed! Your response has been saved.';
    notify('寫作練習已完成記錄！');
  }
  if (a === 'finish-exam-speaking') {
    recordActivity(state, 'exam-speaking', id);
    persist();
    const fb = document.querySelector('#exam-speaking-feedback');
    if (fb) fb.textContent = 'Speaking session recorded! Great job practicing English.';
    notify('口說練習已記錄！');
  }

  // Study & Sprint actions
  if (a === 'start-sprint') {
    const category = document.querySelector('#sprint-category').value;
    const count = document.querySelector('#sprint-count').value;
    runSprint(category, count);
  }
  if (a === 'continue-practice') {
    if (quiz?.kind === 'sprint') {
      runSprint(quiz.sprintCategory, quiz.sprintCount);
    } else if (quiz?.kind === 'review') {
      const remaining = state.mistakes.map(id => questions.find(q => q.id === id)).filter(Boolean);
      if (remaining.length) startQuiz(remaining, '錯題再練一次', 'review');
      else location.hash = 'sprint';
    } else {
      const categories = [...new Set(quiz.pool.map(q => q.category))];
      runSprint(categories.length === 1 ? categories[0] : 'mixed', quiz.pool.length);
    }
  }
  if (a === 'home-flip') {
    homeFlipped = !homeFlipped;
    render(false);
  }
  if (a === 'topic') {
    topic = btn.dataset.topic;
    cardIndex = 0;
    wordPage = 0;
    flipped = false;
    render(false);
  }
  if (a === 'clear-vocab-search') {
    vocabQuery = '';
    cardIndex = 0;
    wordPage = 0;
    flipped = false;
    render(false);
    document.querySelector('#vocab-search')?.focus();
  }
  if (a === 'flip') {
    flipped = !flipped;
    render(false);
    document.querySelector('.flashcard')?.focus();
  }
  if (a === 'prev-card' || a === 'next-card') {
    stopSpeech();
    cardIndex += a === 'next-card' ? 1 : -1;
    wordPage = Math.floor(cardIndex / WORDS_PER_PAGE);
    flipped = false;
    render(false);
    document.querySelector('.flashcard')?.focus();
  }
  if (a === 'pick-card') {
    cardIndex = Number(btn.dataset.index);
    flipped = false;
    render(false);
    document.querySelector('.flashcard')?.focus();
  }
  if (a === 'prev-word-page' || a === 'next-word-page') {
    wordPage += a === 'next-word-page' ? 1 : -1;
    cardIndex = wordPage * WORDS_PER_PAGE;
    flipped = false;
    render(false);
    document.querySelector('.flashcard')?.focus();
  }
  if (a === 'vocab-quiz') {
    const pool = topic === '全部' ? vocabQuestions : vocabQuestions.filter(q => q.topic === topic);
    startQuiz(selectDaily(pool, `${todayKey()}-${state.answers.filter(a => a.category === 'vocabulary').length}`, 6), `${topic === '全部' ? '單字' : topic}小測驗`);
  }
  if (a === 'start-block') {
    const isReading = btn.dataset.category === 'reading';
    const size = isReading ? 6 : 5;
    const pool = isReading ? reading : listening;
    const block = Number(btn.dataset.block);
    startQuiz(pool.slice(block * size, (block + 1) * size), isReading ? '閱讀小練習' : '聽力小練習');
  }
  if (a === 'next-question' && quiz?.submitted) {
    stopSpeech();
    quiz.index++;
    quiz.selected = null;
    quiz.submitted = false;
    render();
  }
  if (a === 'play-question') {
    const q = quiz.pool[quiz.index];
    const rate = Number(document.querySelector('#speech-rate')?.value || 0.9);
    const audioPath = `audio/listening/bilingual-${q.id}.mp3`;
    playAudioFile(audioPath, q.script, rate);
  }
  if (a === 'review-all') {
    const all = allAvailableQuestions();
    const mist = state.mistakes.map(id => all.find(q => q.id === id)).filter(Boolean);
    const hasExam = mist.some(q => q.paper);
    if (hasExam) {
      startExamSession(mist, {title: '錯題筆記：再練一次', paper: 'review'});
    } else {
      startQuiz(mist, '錯題再練一次', 'review');
    }
  }
  if (a === 'review-one') {
    const all = allAvailableQuestions();
    const target = all.find(q => q.id === id);
    if (!target) return;
    if (target.paper) {
      startExamSession([target], {title: '錯題再練一次', paper: target.paper, part: target.part});
    } else {
      startQuiz([target], '錯題再練一次', 'review');
    }
  }
  if (a === 'finish-writing') {
    const w = writing.find(w => w.id === id);
    const feedback = document.querySelector('#writing-feedback');
    const count = wordCount(state.drafts[id] || '');
    if (count < w.min) {
      feedback.textContent = `目前 ${count} 字，再試著多寫一點，達到至少 ${w.min} 字。`;
      return;
    }
    if (document.querySelectorAll('[name="writing-check"]:checked').length !== 4) {
      feedback.textContent = '先確認右側（手機下方）的四個檢查項目，再完成這次練習。';
      return;
    }
    recordActivity(state, 'writing', id);
    persist();
    feedback.textContent = '這次寫作練習已記錄！可以請家人或老師再幫你讀一讀。';
    notify('寫作練習已記錄。每個任務每天記錄一次。');
  }
  if (a === 'finish-speaking') {
    recordActivity(state, 'speaking', id);
    persist();
    document.querySelector('#speaking-feedback').textContent = '今天的口說練習已記錄。下次試試用不同的理由回答！';
    notify('口說練習已記錄。每個話題每天記錄一次。');
  }
});

window.addEventListener('hashchange', () => {
  stopSpeech();
  if (location.hash !== '#daily' && location.hash !== '#quiz' && location.hash !== '#exam-runner') {
    quiz = null;
    examSession = null;
  }
  render();
});
window.addEventListener('pagehide', stopSpeech);

render(false);
