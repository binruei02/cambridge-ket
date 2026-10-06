// Cambridge A2 Key Writing Evaluator Engine
// Specifically designed for A2 Key for Schools: Part 6 (Emails/Notes), Part 7 (Picture Stories), and Study Prompts.
// Evaluates Content, Communicative Achievement, Organisation, and Language.

import {wordCount} from './state.mjs';

// Common A2 misspelling dictionary: misspelling => correction
const COMMON_SPELLING_RULES = [
  {regex: /\bteh\b/gi, fix: 'the', msg: '拼字提醒：應為 “the”。'},
  {regex: /\b(becuase|beacuse|bacause|becouse)\b/gi, fix: 'because', msg: '拼字提醒：應為 “because”。'},
  {regex: /\b(freind|frend|frield)\b/gi, fix: 'friend', msg: '拼字提醒：應為 “friend”。'},
  {regex: /\buntill\b/gi, fix: 'until', msg: '拼字提醒：應為 “until”（只有一個 l）。'},
  {regex: /\b(tommorrow|tommorow|tomorow)\b/gi, fix: 'tomorrow', msg: '拼字提醒：應為 “tomorrow”（一個 m，兩個 r）。'},
  {regex: /\balot\b/gi, fix: 'a lot', msg: '拼字提醒：“a lot” 請分開寫成兩個單字。'},
  {regex: /\b(famliy|famaly)\b/gi, fix: 'family', msg: '拼字提醒：應為 “family”。'},
  {regex: /\b(definitly|definately)\b/gi, fix: 'definitely', msg: '拼字提醒：應為 “definitely”。'},
  {regex: /\b(beautifull|beautyful)\b/gi, fix: 'beautiful', msg: '拼字提醒：應為 “beautiful”。'},
  {regex: /\b(recieve|receve)\b/gi, fix: 'receive', msg: '拼字提醒：i 在 e 之後，“receive”。'},
  {regex: /\bwich\b/gi, fix: 'which', msg: '拼字提醒：應為 “which”。'},
  {regex: /\b(writting|writeing)\b/gi, fix: 'writing', msg: '拼字提醒：去 e 加 ing，應為 “writing”。'},
  {regex: /\b(studing|studyng)\b/gi, fix: 'studying', msg: '拼字提醒：study 加 ing 應為 “studying”。'},
  {regex: /\bswiming\b/gi, fix: 'swimming', msg: '拼字提醒：雙寫 m，應為 “swimming”。'},
  {regex: /\bruning\b/gi, fix: 'running', msg: '拼字提醒：雙寫 n，應為 “running”。'},
  {regex: /\b(intresting|intersting)\b/gi, fix: 'interesting', msg: '拼字提醒：應為 “interesting”。'},
  {regex: /\b(dificult|difficalt)\b/gi, fix: 'difficult', msg: '拼字提醒：雙寫 f，應為 “difficult”。'},
  {regex: /\b(favrite|favorit)\b/gi, fix: 'favourite', msg: '拼字提醒：應為 “favourite”（或美式 “favorite”）。'},
  {regex: /\b(diffrent|diferent)\b/gi, fix: 'different', msg: '拼字提醒：應為 “different”。'},
  {regex: /\b(vegetabel|vegatable|vegtable)\b/gi, fix: 'vegetable', msg: '拼字提醒：應為 “vegetable”。'},
  {regex: /\b(restarant|restraunt)\b/gi, fix: 'restaurant', msg: '拼字提醒：應為 “restaurant”。'},
  {regex: /\blibary\b/gi, fix: 'library', msg: '拼字提醒：應為 “library”。'},
  {regex: /\bcamra\b/gi, fix: 'camera', msg: '拼字提醒：應為 “camera”。'},
  {regex: /\bcomputor\b/gi, fix: 'computer', msg: '拼字提醒：應為 “computer”。'},
  {regex: /\b(saterday|saturaday)\b/gi, fix: 'Saturday', msg: '拼字提醒：應為 “Saturday”。'},
  {regex: /\bwednsday\b/gi, fix: 'Wednesday', msg: '拼字提醒：應為 “Wednesday”。'}
];

// Common grammatical pattern checks
const GRAMMAR_RULES = [
  {
    regex: /\b(he|she|it|my father|my mother|my brother|my sister|my friend)\s+(go|like|want|play|have|eat|watch|see|need|make)\b/gi,
    msg: '主詞動詞一致：單數第三人稱動詞現在式請加上 -s/-es（例如：he goes, she likes, he has）。'
  },
  {
    regex: /\b(don't|do not)\s+(likes|wants|goes|plays|has)\b/gi,
    msg: '助動詞 don’t / doesn’t 後面應接「原形動詞」（例如：doesn’t like，而非 doesn’t likes）。'
  },
  {
    regex: /\bgood in\b/gi,
    msg: '介系詞搭配：表示擅長某事物請使用 “good at”，而非 “good in”。'
  },
  {
    regex: /\blook forward to (see|meet|visit)\b/gi,
    msg: '文法慣用語：“look forward to” 後接 V-ing 動名詞（例如：look forward to seeing you）。'
  },
  {
    regex: /\barrive to\b/gi,
    msg: '介系詞搭配：抵達地點請使用 “arrive at”（場所）或 “arrive in”（城市/國家），而非 “arrive to”。'
  },
  {
    regex: /\b(\w+)\s+\1\b/gi,
    msg: '重複單字：出現連續重複的相同單字，請檢查是否有贅字。'
  }
];

export function evaluateWriting(rawText, task = {}) {
  const text = String(rawText || '').trim();
  const words = wordCount(text);
  const minWords = task.min || 25;
  const isStory = task.part === 7 || (task.type && /story|故事/i.test(task.type));
  const isEmail = task.part === 6 || (task.type && /email|信|message/i.test(task.type));

  const issues = [];
  const strengths = [];

  // 1. Length analysis
  let contentScore = 5;
  if (words === 0) {
    return {
      score: 0,
      percentage: 0,
      band: 'Incomplete',
      bandZh: '尚未開始',
      wordCount: 0,
      minWords,
      criteria: {
        content: {score: 0, max: 5, label: '內容完整度 (Content)', feedback: '尚未輸入任何內容。'},
        communicative: {score: 0, max: 5, label: '格式與交際 (Communication)', feedback: '尚未輸入任何內容。'},
        organisation: {score: 0, max: 5, label: '結構連貫性 (Organisation)', feedback: '尚未輸入任何內容。'},
        language: {score: 0, max: 5, label: '文法與拼字 (Language)', feedback: '尚未輸入任何內容。'}
      },
      strengths: [],
      suggestions: [{message: '請先在輸入框寫下你的英文想法再送出批閱。'}],
      missingPoints: task.points || [],
      examinerCommentZh: '請先在輸入框寫出至少符合字數門檻的英文草稿，再點擊批閱。'
    };
  }

  if (words >= minWords) {
    strengths.push(`字數達標：共撰寫 ${words} 個單字，超過規定最低字數（${minWords} 字）。`);
  } else {
    const diff = minWords - words;
    contentScore = Math.max(1, Math.round((words / minWords) * 4));
    issues.push({
      type: 'length',
      message: `字數偏短：目前僅有 ${words} 字，距離目標 ${minWords} 字還差 ${diff} 字。請多寫 1–2 句補充原因或細節。`
    });
  }

  // 2. Point / Topic coverage
  const missingPoints = [];
  const points = task.points || [];
  const lowerText = text.toLowerCase();

  // Keyword hints based on typical Cambridge tasks
  if (isEmail) {
    const hasGreeting = /^(hi|hello|dear|hey)\b/i.test(text);
    const hasSignoff = /(best|love|see you|from|yours|best wishes|bye|write back)\b/i.test(text);
    if (hasGreeting && hasSignoff) {
      strengths.push('書信格式完整：具備自然的開頭招呼語與結尾署名！');
    } else if (!hasGreeting) {
      issues.push({type: 'format', message: '建議在信件開頭加上問候語（例如：Hi Alex, 或 Dear Sam,）。'});
    } else if (!hasSignoff) {
      issues.push({type: 'format', message: '建議在信件末尾加上結尾禮貌用語（例如：See you soon! 或 Best wishes,）。'});
    }
  }

  // Points coverage evaluation
  points.forEach((pt, idx) => {
    const ptLower = pt.toLowerCase();
    let covered = false;

    if (/when|time|day|date/i.test(ptLower)) {
      covered = /\b(\d{1,2}(?::|\.)\d{2}|o'clock|monday|tuesday|wednesday|thursday|friday|saturday|sunday|morning|afternoon|evening|tomorrow|weekend)\b/i.test(lowerText);
    } else if (/where|place|meet/i.test(ptLower)) {
      covered = /\b(park|cinema|library|museum|station|gate|room|hall|school|entrance|outside|house|flat|at\s+the|by\s+the)\b/i.test(lowerText);
    } else if (/bring|pack|wear/i.test(ptLower)) {
      covered = /\b(bring|pack|wear|water|sandwich|food|clothes|shoes|balls|helmet|jacket|camera|racket)\b/i.test(lowerText);
    } else if (/why|reason|like/i.test(ptLower)) {
      covered = /\b(because|so|love|like|enjoy|fun|interesting|great)\b/i.test(lowerText);
    } else if (/suggest|activity|film|movie|what\s+to\s+do/i.test(ptLower)) {
      covered = /\b(let'?s|we can|how about|would you like|watch|see|play|visit|film|movie|game)\b/i.test(lowerText);
    } else {
      // General check: at least some key nouns/verbs from point
      const wordsInPt = pt.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 3);
      covered = wordsInPt.some(w => lowerText.includes(w.toLowerCase()));
    }

    if (covered) {
      strengths.push(`要點回答：成功涵蓋了要點 ${idx + 1}（${pt}）。`);
    } else {
      missingPoints.push(`要點 ${idx + 1}：${pt}`);
    }
  });

  if (missingPoints.length > 0) {
    contentScore = Math.max(2, contentScore - missingPoints.length);
  }

  // 3. Organisation & Connectors
  let orgScore = 4;
  const connectors = [];
  const foundConnectors = new Set();
  const connectorList = ['and', 'but', 'because', 'so', 'then', 'when', 'while', 'suddenly', 'finally', 'luckily', 'after that', 'before'];

  connectorList.forEach(c => {
    const reg = new RegExp(`\\b${c}\\b`, 'i');
    if (reg.test(text)) foundConnectors.add(c);
  });

  if (foundConnectors.size >= 3) {
    orgScore = 5;
    strengths.push(`連接詞使用豐富：善用 [${[...foundConnectors].join(', ')}]，使句子結構層次分明。`);
  } else if (foundConnectors.size >= 1) {
    orgScore = 4;
    strengths.push(`有使用連接詞（${[...foundConnectors].join(', ')}）。`);
  } else {
    orgScore = 3;
    issues.push({type: 'organisation', message: '建議多運用連接詞（如 because, but, so, then）將短句串連起來。'});
  }

  // Check sentence capitalization and periods
  const sentences = text.split(/(?<=[.!?])\s+/).filter(Boolean);
  let punctuationIssue = false;
  let capitalIssue = false;

  sentences.forEach(s => {
    const trimmed = s.trim();
    if (trimmed.length > 0 && trimmed[0] !== trimmed[0].toUpperCase()) {
      capitalIssue = true;
    }
    if (trimmed.length > 0 && !/[.!?]$/.test(trimmed)) {
      punctuationIssue = true;
    }
  });

  if (capitalIssue) {
    issues.push({type: 'punctuation', message: '句首字母請記得大寫。'});
    orgScore = Math.max(2, orgScore - 1);
  }
  if (punctuationIssue) {
    issues.push({type: 'punctuation', message: '英文句子末尾請加上句號（.）或適當標點符號。'});
  }

  // Check standalone lowercase 'i'
  if (/\b i \b/g.test(` ${text} `)) {
    issues.push({type: 'grammar', message: '單字「我（I）」作為代名詞時，請一律大寫為 “I”。'});
  }

  // 4. Language: Tense, Grammar, Spelling
  let langScore = 5;

  // Story past-tense evaluation
  if (isStory) {
    const pastVerbs = (text.match(/\b(went|played|saw|was|were|had|landed|helped|arrived|started|felt|lost|bought|came|opened|drank)\b/gi) || []).length;
    const presentVerbs = (text.match(/\b(goes|is|are|has|lands|helps|arrives|starts|feels|buys|comes|drinks)\b/gi) || []).length;

    if (pastVerbs >= 3) {
      strengths.push('時態掌握佳：故事多使用過去式（Past Simple）敘述，敘事非常道地。');
    } else if (presentVerbs > pastVerbs) {
      langScore = Math.max(2, langScore - 1);
      issues.push({
        type: 'tense',
        message: '時態提醒：故事寫作（Part 7）通常描述已發生的事件，請盡量統一使用「過去式動詞」（如 went, saw, helped, was）。'
      });
    }
  }

  // Check common spelling rules
  COMMON_SPELLING_RULES.forEach(rule => {
    const match = text.match(rule.regex);
    if (match) {
      match.forEach(m => {
        issues.push({
          type: 'spelling',
          original: m,
          correction: rule.fix,
          message: `${rule.msg}（原寫法：“${m}”）`
        });
      });
      langScore = Math.max(2, langScore - 1);
    }
  });

  // Check grammar pattern rules
  GRAMMAR_RULES.forEach(rule => {
    const match = text.match(rule.regex);
    if (match) {
      match.forEach(m => {
        issues.push({
          type: 'grammar',
          original: m,
          message: `${rule.msg}（檢測到：“${m}”）`
        });
      });
      langScore = Math.max(2, langScore - 1);
    }
  });

  // Communicative Achievement score
  let commScore = 5;
  if (isEmail && (!/^(hi|hello|dear)\b/i.test(text) || !/(best|love|see you|from|yours|bye)\b/i.test(text))) {
    commScore = 4;
  }
  if (words < minWords) {
    commScore = Math.min(commScore, contentScore);
  }

  // Total calculation (max 20)
  const totalScore = Math.max(4, contentScore + commScore + orgScore + langScore);
  const percentage = Math.round((totalScore / 20) * 100);

  let band = 'Pass';
  let bandZh = '通過標準（Pass）';
  if (totalScore >= 18) {
    band = 'Pass with Distinction';
    bandZh = '優秀卓越（Distinction ★★★★★）';
  } else if (totalScore >= 15) {
    band = 'Pass with Merit';
    bandZh = '表現良好（Merit ★★★★☆）';
  } else if (totalScore >= 11) {
    band = 'Pass';
    bandZh = '達到標準（Pass ★★★☆☆）';
  } else {
    band = 'Needs Review';
    bandZh = '再加把勁（Needs Review ★★☆☆☆）';
  }

  let examinerCommentZh = '';
  if (totalScore >= 18) {
    examinerCommentZh = '非常優秀的作答！內容完整涵蓋全部提示點，文法與拼字精確，並能善用連接詞，完全達到甚至超越 A2 考官期待！';
  } else if (totalScore >= 15) {
    examinerCommentZh = '寫得很不錯！主要資訊交代清晰，語氣自然。只要參考下方的修訂建議修飾小細節，就能直奔滿分！';
  } else if (totalScore >= 11) {
    examinerCommentZh = '已經掌握基本寫作方向！請檢查是否有未完全回答的題目提示，並多用連接詞擴充句子長度。';
  } else {
    examinerCommentZh = '完成了初步嘗試，很棒！請依照下方的糾錯提示補齊字數與遺漏要點，再次練習一定會大有進步。';
  }

  return {
    score: totalScore,
    maxScore: 20,
    percentage,
    band,
    bandZh,
    wordCount: words,
    minWords,
    criteria: {
      content: {
        score: contentScore,
        max: 5,
        label: '內容要點 (Content)',
        feedback: missingPoints.length === 0 ? '全數回答題目所有提示要點。' : `尚有 ${missingPoints.length} 個要點可補充得更具體。`
      },
      communicative: {
        score: commScore,
        max: 5,
        label: '交際文體 (Communication)',
        feedback: isEmail ? '語氣友善親切，符合朋友書信風格。' : '情境敘述清楚，語意容易理解。'
      },
      organisation: {
        score: orgScore,
        max: 5,
        label: '結構連貫 (Organisation)',
        feedback: `善用連接詞組織句子，標點與大小寫${capitalIssue || punctuationIssue ? '有少許需調整處' : '規範正確'}。`
      },
      language: {
        score: langScore,
        max: 5,
        label: '文法拼字 (Language)',
        feedback: issues.filter(i => i.type === 'spelling' || i.type === 'grammar').length === 0
          ? '詞彙與文法使用得當，無明顯拼字失誤。'
          : '檢測到少數拼字或時態小失誤，請參考下方修正對照。'
      }
    },
    strengths,
    suggestions: issues,
    missingPoints,
    sample: task.sample || '',
    examinerCommentZh
  };
}
