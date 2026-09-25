// Original A2 Key for Schools Exam Content
// Designed strictly according to Cambridge A2 Key for Schools specifications.
// All prompts, passages, and choices are 100% English.

export const examParts = {
  readingWriting: [
    {number: 1, name: 'Part 1', title: 'Notices & Short Messages', questionsCount: 6, format: 'Multiple Choice (3 options)', description: 'Read six short real-world texts (signs, notices, messages) for the main message.'},
    {number: 2, name: 'Part 2', title: 'Matching Descriptions', questionsCount: 7, format: 'Multiple Choice (A, B, or C)', description: 'Read seven questions and three short texts on a shared topic to find matches.'},
    {number: 3, name: 'Part 3', title: 'Longer Text Reading', questionsCount: 5, format: 'Multiple Choice (3 options)', description: 'Read one longer article and answer five multiple-choice comprehension questions.'},
    {number: 4, name: 'Part 4', title: 'Multiple Choice Cloze', questionsCount: 6, format: 'Multiple Choice (3 options)', description: 'Read a factual text with six gaps and choose the correct English word for each gap.'},
    {number: 5, name: 'Part 5', title: 'Open Cloze', questionsCount: 6, format: 'Text Entry (One word)', description: 'Read a short email or message with six gaps. Write one correct English word in each gap.'},
    {number: 6, name: 'Part 6', title: 'Guided Short Message', questionsCount: 1, format: 'Short Writing (25+ words)', description: 'Write an email or note answering three required bullet points.'},
    {number: 7, name: 'Part 7', title: 'Picture Story Writing', questionsCount: 1, format: 'Story Writing (35+ words)', description: 'Write a short story based on three sequential pictures.'}
  ],
  listening: [
    {number: 1, name: 'Part 1', title: 'Short Dialogues', questionsCount: 5, format: 'Multiple Choice (3 options)', description: 'Listen to five short everyday conversations and choose the correct option.'},
    {number: 2, name: 'Part 2', title: 'Note-Taking / Gap Fill', questionsCount: 5, format: 'Text Entry (One word / number)', description: 'Listen to a monologue and complete five notes with a word or number.'},
    {number: 3, name: 'Part 3', title: 'Longer Dialogue', questionsCount: 5, format: 'Multiple Choice (3 options)', description: 'Listen to an informal conversation between two people and answer five 3-option questions.'},
    {number: 4, name: 'Part 4', title: 'Short Monologues & Dialogues', questionsCount: 5, format: 'Multiple Choice (3 options)', description: 'Listen to five short recordings and identify the main gist, feeling, or opinion.'},
    {number: 5, name: 'Part 5', title: 'Information Matching', questionsCount: 5, format: 'Multiple Choice (Match A–H)', description: 'Listen to a dialogue and match five people or items to eight choices.'}
  ],
  speaking: [
    {number: 1, name: 'Part 1', title: 'Personal Information & Daily Life', format: 'Examiner Interview (3-4 mins)', description: 'Answer questions from the examiner about yourself, your family, school, and hobbies.'},
    {number: 2, name: 'Part 2', title: 'Discussion & Partner Interaction', format: 'Collaborative Task (5-6 mins)', description: 'Discuss a situation with pictures, express likes, dislikes, and reasons, and ask your partner questions.'}
  ]
};

// 30 Objective Questions for Reading and Writing (Parts 1 to 5)
export const rwObjectiveQuestions = [
  // --- Part 1 (6 Questions: Notices, Signs, Short Messages) ---
  {
    id: 'rw1-1',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'School Art Club Notice',
    passage: 'ART CLUB NOTICE\nDue to painting work in Room 4, today’s meeting will be in the Science Hall at 4.15 p.m. Bring your watercolours.',
    question: 'Where will the Art Club meet today?',
    choices: ['In Room 4', 'In the Science Hall', 'In the school cafeteria'],
    answer: 1,
    evidence: 'The notice states: "today’s meeting will be in the Science Hall at 4.15 p.m."',
    explanationZh: '告示明確提到，因為 4 號教室在粉刷，今天的社團改在 Science Hall（自然科學大廳）舉行。'
  },
  {
    id: 'rw1-2',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'Message from Liam',
    passage: 'Hi Maya,\nI can’t find my English notebook. Could you please check if I left it under your desk after our project yesterday?\nLiam',
    question: 'Why did Liam write this message?',
    choices: ['To ask Maya to return his project', 'To help Maya with her homework', 'To ask Maya to look for his notebook'],
    answer: 2,
    evidence: 'Liam writes: "Could you please check if I left it under your desk"',
    explanationZh: 'Liam 寫訊息請 Maya 幫忙確認他的英文筆記本是否遺留在她桌子底下。'
  },
  {
    id: 'rw1-3',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'Cinema Ticket Desk Sign',
    passage: 'GREENVALE CINEMA\nBuy two student tickets for any afternoon show and get a free box of popcorn today only!',
    question: 'How can students get free popcorn?',
    choices: ['By visiting the cinema in the evening', 'By buying two student tickets for an afternoon film', 'By buying any three cinema tickets'],
    answer: 1,
    evidence: 'The sign says: "Buy two student tickets for any afternoon show and get a free box of popcorn"',
    explanationZh: '牌子指出只有在今天下午場次購買兩張學生票，才能免費獲得一盒爆米花。'
  },
  {
    id: 'rw1-4',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'Email from Mrs Foster',
    passage: 'Dear Students,\nRemember that our trip to the City Zoo leaves the school gate at 8.30 a.m. sharp tomorrow. Please wear comfortable shoes and carry a raincoat.\nMrs Foster',
    question: 'What does Mrs Foster advise students to do?',
    choices: ['Arrive at the zoo on their own at 8.30 a.m.', 'Wear comfortable shoes and bring rainwear', 'Buy their tickets before tomorrow morning'],
    answer: 1,
    evidence: 'Mrs Foster advises: "Please wear comfortable shoes and carry a raincoat."',
    explanationZh: '老師提醒大家穿著舒適的鞋子並攜帶雨衣。'
  },
  {
    id: 'rw1-5',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'Sports Centre Rule',
    passage: 'SPORTS CENTRE LOCKERS\nPlease take all personal belongings home before 9.00 p.m. Any items left overnight will be moved to the manager’s office.',
    question: 'What happens to items left in lockers after 9.00 p.m.?',
    choices: ['They will be thrown away immediately.', 'They will be moved to the manager’s office.', 'They can only be collected next week.'],
    answer: 1,
    evidence: 'The notice warns: "Any items left overnight will be moved to the manager’s office."',
    explanationZh: '告示指出晚上九點後遺留過夜的物品會被移送至經理辦公室。'
  },
  {
    id: 'rw1-6',
    paper: 'readingWriting',
    part: 1,
    format: 'multipleChoice',
    title: 'Notice on Park Gate',
    passage: 'SUNNY PARK PLAYGROUND\nChildren under eight years old must be with an adult at all times while using the swings and climbing frame.',
    question: 'Who must have an adult with them?',
    choices: ['A seven-year-old child', 'A nine-year-old child', 'All visitors to Sunny Park'],
    answer: 0,
    evidence: 'The notice specifies: "Children under eight years old must be with an adult"',
    explanationZh: '未滿八歲（under eight years old）需要大人陪同，七歲的孩子符合此規定。'
  },

  // --- Part 2 (7 Questions: Matching 3 texts A, B, C) ---
  // Texts: Three young photographers:
  // A = Lucas (shoots birds and animals in woods near his house, uses old camera given by granddad)
  // B = Freya (shoots street life and buildings in the city, posts them online and got a prize)
  // C = Elijah (shoots friends and school sports matches, enjoys printing pictures and making albums)
  {
    id: 'rw2-7',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas: "I love exploring the pine forest behind my house early on Saturday mornings to photograph wild birds and foxes. I use an old digital camera that my grandfather gave me."\nB Freya: "My favourite subjects are tall buildings, bridges, and busy city markets. Last month, I entered an online youth contest and won first prize for my photo of a rainy street."\nC Elijah: "I take my camera to all school football games and skatepark weekends to capture action shots of my friends. I prefer printing out physical prints to create albums for my classmates."',
    question: 'Which person won a prize for their photography?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 1,
    evidence: 'Freya says: "Last month, I entered an online youth contest and won first prize"',
    explanationZh: 'Freya 提到她在線上青年攝影比賽以一張雨天街道的照片獲得了第一名。'
  },
  {
    id: 'rw2-8',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (birds/forest, camera from grandfather)\nB Freya (city/street contest winner)\nC Elijah (sports and physical photo albums for classmates)',
    question: 'Which person uses a camera that belonged to a family member?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 0,
    evidence: 'Lucas says: "I use an old digital camera that my grandfather gave me."',
    explanationZh: 'Lucas 使用祖父送給他的舊數位相機。'
  },
  {
    id: 'rw2-9',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (nature and wildlife)\nB Freya (urban architecture and street life)\nC Elijah (sports and physical albums)',
    question: 'Which person takes photographs of nature and wild animals?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 0,
    evidence: 'Lucas says: "I love exploring the pine forest... to photograph wild birds and foxes."',
    explanationZh: 'Lucas 喜歡到松樹林拍野生鳥類和狐狸。'
  },
  {
    id: 'rw2-10',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (forest/wildlife)\nB Freya (city/urban photography)\nC Elijah (sports/action photos)',
    question: 'Which person likes taking pictures of sports matches?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 2,
    evidence: 'Elijah says: "I take my camera to all school football games and skatepark weekends"',
    explanationZh: 'Elijah 喜歡在學校足球賽和滑板場捕捉好友運動的瞬間。'
  },
  {
    id: 'rw2-11',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (wildlife nature)\nB Freya (modern city buildings and busy markets)\nC Elijah (friends and physical albums)',
    question: 'Which person enjoys photographing city buildings and markets?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 1,
    evidence: 'Freya says: "My favourite subjects are tall buildings, bridges, and busy city markets."',
    explanationZh: 'Freya 最喜歡拍的是高樓建築、橋樑以及熱鬧的城市市集。'
  },
  {
    id: 'rw2-12',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (early mornings in forest)\nB Freya (online contest)\nC Elijah (prints paper photos to make albums)',
    question: 'Which person prefers making paper photo albums rather than keeping only digital files?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 2,
    evidence: 'Elijah says: "I prefer printing out physical prints to create albums for my classmates."',
    explanationZh: 'Elijah 偏好把相片沖印出來，做成相冊送給同班同學。'
  },
  {
    id: 'rw2-13',
    paper: 'readingWriting',
    part: 2,
    format: 'multipleChoice',
    title: 'Young Photographers Matching',
    passage: 'A Lucas (goes out early on Saturday mornings)\nB Freya (rainy street photo)\nC Elijah (skateparks and games)',
    question: 'Which person usually takes photos very early in the morning?',
    choices: ['A (Lucas)', 'B (Freya)', 'C (Elijah)'],
    answer: 0,
    evidence: 'Lucas says: "I love exploring the pine forest behind my house early on Saturday mornings"',
    explanationZh: 'Lucas 提到他喜歡在週六一大早去屋後的松樹林拍照。'
  },

  // --- Part 3 (5 Questions: Longer Text Comprehension) ---
  // Text: Sophie's Baking Blog
  {
    id: 'rw3-14',
    paper: 'readingWriting',
    part: 3,
    format: 'multipleChoice',
    title: 'Sophie’s Baking Adventure',
    passage: 'Fourteen-year-old Sophie began baking three years ago when her grandmother showed her how to make traditional lemon biscuits. At first, Sophie only baked for family celebrations like birthdays and New Year dinners. But last autumn, her elder brother suggested starting a blog so she could share her recipes and cooking tips with other teenagers.\n\nSophie was surprised by how quickly people began following her blog. "I thought only my school friends would look at it," Sophie smiles. "Then readers from different countries began sending photos of the cakes they baked using my recipes!"\n\nEvery Sunday morning, Sophie tests a new recipe in her kitchen. Her dad always tastes the first slice. "If my dad says a dessert is too sweet, I reduce the sugar right away. He gives honest feedback, which helps me improve." Now Sophie wants to write a cookbook for young cooks.',
    question: 'How did Sophie first learn to bake?',
    choices: ['Her brother taught her with internet videos.', 'Her grandmother showed her how to make biscuits.', 'She joined an after-school cooking course.'],
    answer: 1,
    evidence: 'The text says: "Sophie began baking three years ago when her grandmother showed her how to make traditional lemon biscuits."',
    explanationZh: '文章第一段提到 Sophie 是在三年前由祖母教她做傳統檸檬餅乾而開始烘焙的。'
  },
  {
    id: 'rw3-15',
    paper: 'readingWriting',
    part: 3,
    format: 'multipleChoice',
    title: 'Sophie’s Baking Adventure',
    passage: '(See passage in Question 14)',
    question: 'Why did Sophie decide to start an online blog?',
    choices: ['Her brother advised her to share her ideas.', 'Her school teacher asked her to write it.', 'She needed to earn pocket money.'],
    answer: 0,
    evidence: 'The text says: "her elder brother suggested starting a blog so she could share her recipes"',
    explanationZh: '她的哥哥建議她架設部落格，與其他年輕人分享食譜和烘焙技巧。'
  },
  {
    id: 'rw3-16',
    paper: 'readingWriting',
    part: 3,
    format: 'multipleChoice',
    title: 'Sophie’s Baking Adventure',
    passage: '(See passage in Question 14)',
    question: 'What surprised Sophie about her blog readers?',
    choices: ['They never sent any comments.', 'Many of them lived in other countries.', 'They only baked chocolate cakes.'],
    answer: 1,
    evidence: 'Sophie explains: "Then readers from different countries began sending photos of the cakes they baked"',
    explanationZh: 'Sophie 本以為只有學校同學看，沒想到世界各國的讀者都來傳照片，這讓她很驚訝。'
  },
  {
    id: 'rw3-17',
    paper: 'readingWriting',
    part: 3,
    format: 'multipleChoice',
    title: 'Sophie’s Baking Adventure',
    passage: '(See passage in Question 14)',
    question: 'Why is Sophie’s father helpful to her baking?',
    choices: ['He buys all the expensive ingredients.', 'He tells her honestly what he thinks of each dish.', 'He washes all the dishes in the kitchen.'],
    answer: 1,
    evidence: 'Sophie notes: "He gives honest feedback, which helps me improve."',
    explanationZh: 'Sophie 的爸爸每次都給出誠實的回饋（例如太甜），協助她調整食譜。'
  },
  {
    id: 'rw3-18',
    paper: 'readingWriting',
    part: 3,
    format: 'multipleChoice',
    title: 'Sophie’s Baking Adventure',
    passage: '(See passage in Question 14)',
    question: 'What is Sophie’s plan for the future?',
    choices: ['To open a restaurant in her town', 'To stop writing her online recipes', 'To publish a cookbook for teenagers'],
    answer: 2,
    evidence: 'The final sentence says: "Now Sophie wants to write a cookbook for young cooks."',
    explanationZh: '文章最後提到 Sophie 現在的目標是為年輕料理者寫一本食譜書。'
  },

  // --- Part 4 (6 Questions: Multiple-Choice Cloze / Vocabulary in Context) ---
  // Text: The Red Fox
  {
    id: 'rw4-19',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'The red fox is one of the most common wild animals in Britain. Foxes can live in countryside woods, but they are also able to _____ in large towns and cities.',
    question: 'Choose the correct word for gap 19.',
    choices: ['survive', 'staying', 'spend'],
    answer: 0,
    evidence: 'After the modal phrase "are also able to", the base form of the verb "survive" is needed.',
    explanationZh: '在 be able to 之後需接原形動詞 survive（生存）。'
  },
  {
    id: 'rw4-20',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'They usually search for food at night because it is much _____ during the day when people and cars are everywhere.',
    question: 'Choose the correct word for gap 20.',
    choices: ['quieter', 'noisier', 'darker'],
    answer: 1,
    evidence: 'During the day with people and cars everywhere, it is "noisier" than at night.',
    explanationZh: '白天有大量的人和車輛，因此比夜晚更加嘈雜（noisier）。'
  },
  {
    id: 'rw4-21',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'Foxes have warm orange fur, pointed ears, and a long tail which _____ them keep warm during cold winter months.',
    question: 'Choose the correct word for gap 21.',
    choices: ['helps', 'gives', 'makes'],
    answer: 0,
    evidence: 'A long tail "helps" someone do something: help + object + verb.',
    explanationZh: '尾巴「幫助」牠們在寒冬保暖，用 helps them keep warm。'
  },
  {
    id: 'rw4-22',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'Their diet includes small animals such as mice and rabbits, but they also _____ fruit, berries, and vegetables.',
    question: 'Choose the correct word for gap 22.',
    choices: ['drink', 'eat', 'cook'],
    answer: 1,
    evidence: 'Foxes "eat" fruit, berries, and vegetables.',
    explanationZh: '狐狸也「吃」水果、漿果與蔬菜，故選動詞 eat。'
  },
  {
    id: 'rw4-23',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'Scientists say that foxes have an excellent sense of hearing, which allows them to hear sounds that are very _____ away.',
    question: 'Choose the correct word for gap 23.',
    choices: ['far', 'near', 'high'],
    answer: 0,
    evidence: 'The standard distance expression is "far away".',
    explanationZh: '遠距離的固定搭配為 far away（遙遠）。'
  },
  {
    id: 'rw4-24',
    paper: 'readingWriting',
    part: 4,
    format: 'multipleChoice',
    title: 'The Red Fox',
    passage: 'If you want to catch a glimpse of a fox, remember to remain completely quiet and look _____ between garden trees.',
    question: 'Choose the correct word for gap 24.',
    choices: ['slowly', 'carefully', 'loudly'],
    answer: 1,
    evidence: '"Look carefully" means to observe with attention and care.',
    explanationZh: '觀察動物時要安靜並「仔細地」觀察（look carefully）。'
  },

  // --- Part 5 (6 Questions: Open Cloze / Text Entry) ---
  // Text: Email from Daniel to Ethan
  {
    id: 'rw5-25',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'Hi Ethan,\nThank you for inviting me to your birthday barbecue next Saturday. I would love _____ come!',
    question: 'Write ONE word for gap 25.',
    accepted: ['to'],
    evidence: 'The structure "would love to + verb" requires the preposition "to".',
    explanationZh: 'would love 後面接不定詞 to，因此填入 to。'
  },
  {
    id: 'rw5-26',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'My football training finishes at twelve, so I will arrive _____ your house at about half past one.',
    question: 'Write ONE word for gap 26.',
    accepted: ['at'],
    evidence: '"Arrive at" is used for specific buildings and homes.',
    explanationZh: '抵達某地點（家、車站）介系詞用 at。'
  },
  {
    id: 'rw5-27',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'Is _____ anything special that you would like me to bring, like crisps or orange juice?',
    question: 'Write ONE word for gap 27.',
    accepted: ['there'],
    evidence: 'The interrogative existential structure is "Is there anything...?"',
    explanationZh: '存在句疑問句「有沒有……」使用 Is there anything...?。'
  },
  {
    id: 'rw5-28',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'Also, my sister Clara wants to know _____ she can come along as well.',
    question: 'Write ONE word for gap 28.',
    accepted: ['if', 'whether'],
    evidence: '"Wants to know if / whether she can come" introduces an indirect yes/no question.',
    explanationZh: '間接問句引導詞「是否」，可填 if 或 whether。'
  },
  {
    id: 'rw5-29',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'She bought a new board game last week, and I am sure _____ will all have fun playing it together.',
    question: 'Write ONE word for gap 29.',
    accepted: ['we'],
    evidence: 'The subject pronoun referring to all friends gathered together is "we".',
    explanationZh: '指大家一起玩，主詞代名詞填 we。'
  },
  {
    id: 'rw5-30',
    paper: 'readingWriting',
    part: 5,
    format: 'textEntry',
    title: 'Email to Ethan',
    passage: 'Please let me know soon. See you _____ Saturday!\nDaniel',
    question: 'Write ONE word for gap 30.',
    accepted: ['on'],
    evidence: 'Days of the week take the preposition "on" (e.g. on Saturday).',
    explanationZh: '星期幾前面的介系詞一律用 on（on Saturday）。'
  }
];

// Writing Tasks for Parts 6 & 7
export const writingExamTasks = [
  {
    id: 'rw6-31',
    paper: 'readingWriting',
    part: 6,
    format: 'writing',
    title: 'Part 6: Guided Short Email',
    type: 'Email to a friend',
    min: 25,
    prompt: 'You want to go to the cinema with your English friend, Sam. Write an email to Sam.',
    points: [
      'Suggest a film you would like to watch.',
      'Say what time and where you want to meet.',
      'Ask Sam what snacks they prefer.'
    ],
    sample: 'Hi Sam,\nWould you like to watch the new space adventure movie with me? Let’s meet outside the cinema at 4.30 p.m. What kind of snacks do you prefer, popcorn or sweets? See you soon!\nAlex',
    checklist: [
      'Did you suggest a specific film or type of movie?',
      'Did you specify both meeting time and location?',
      'Did you ask a question about snacks?',
      'Is your email 25 words or longer?'
    ],
    explanationZh: 'Part 6 要求至少 25 字，必須逐一回答三個要點：提議電影、約定時間與地點、詢問點心偏好。'
  },
  {
    id: 'rw7-32',
    paper: 'readingWriting',
    part: 7,
    format: 'writing',
    title: 'Part 7: Picture Story Writing',
    type: 'Picture story',
    min: 35,
    prompt: 'Look at the three pictures. Write the story shown in the pictures. Write 35 words or more.',
    scene1: 'Picture 1: Two children, Leo and Ruby, walk into a sunny park carrying a kite.',
    scene2: 'Picture 2: A sudden gust of wind blows the kite into the high branches of a tree.',
    scene3: 'Picture 3: A friendly park keeper arrives with a long ladder and safely returns the kite to the smiling children.',
    sample: 'Yesterday afternoon, Leo and Ruby went to the sunny park to fly their bright red kite. Suddenly, a strong wind blew the kite high into an oak tree. The children were sad because they could not reach it. Luckily, a friendly park keeper came with a tall ladder and rescued the kite. Leo and Ruby thanked him happily and continued playing.',
    checklist: [
      'Did you tell a continuous story connecting all three scenes?',
      'Did you use past tense verbs correctly (e.g. went, blew, helped)?',
      'Did you use sequence connectors (e.g. Yesterday, Suddenly, Luckily, Then)?',
      'Is your story 35 words or longer?'
    ],
    explanationZh: 'Part 7 要求至少 35 字，需將三張圖串連成有起承轉合的完整故事，建議使用過去式與轉折連接詞。'
  }
];

// 25 Objective Questions for Listening (Parts 1 to 5)
export const listeningObjectiveQuestions = [
  // --- Part 1 (5 Questions: Short Dialogues) ---
  {
    id: 'l1-1',
    paper: 'listening',
    part: 1,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 1: What time will the train leave?',
    script: 'Boy: Excuse me, does the next train to Oxford leave at quarter to three? Woman: It was scheduled for two forty-five, but there is a ten-minute delay today. It will depart at quarter to four? No, sorry, at five to three. Boy: Five to three. Thank you!',
    question: 'What time will the train depart today?',
    choices: ['2.45', '2.55', '3.45'],
    answer: 1,
    evidence: 'The woman clarifies after checking the delay: "It will depart... at five to three" (2:55).',
    explanationZh: '原定是 2:45，但延誤十分鐘，女士最後確認是在 2:55（five to three）出發。'
  },
  {
    id: 'l1-2',
    paper: 'listening',
    part: 1,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 1: How much is the school trip?',
    script: 'Girl: Mr Henderson, how much do we need to pay for the museum visit? Teacher: The bus ticket is five pounds and the museum entry is normally ten pounds. But because we are a school group, the museum gives us half price. So the total is ten pounds altogether. Girl: Okay, ten pounds. I will bring the money tomorrow.',
    question: 'How much does each student need to pay in total?',
    choices: ['£5', '£10', '£15'],
    answer: 1,
    evidence: 'The teacher calculates: "bus ticket is five pounds and the museum... half price [five pounds]. So the total is ten pounds altogether."',
    explanationZh: '車資 5 鎊，門票學生優惠半價 5 鎊，總共（total）是 10 鎊。'
  },
  {
    id: 'l1-3',
    paper: 'listening',
    part: 1,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 1: Which instrument does Oliver play now?',
    script: 'Girl: Hi Oliver! Are you still playing the guitar in the school orchestra? Boy: I stopped playing the guitar last term because my fingers hurt. I tried the trumpet for two weeks, but I didn’t like it. Now I play the drums and love it! Girl: Wow, that sounds exciting!',
    question: 'Which musical instrument does Oliver play now?',
    choices: ['The guitar', 'The trumpet', 'The drums'],
    answer: 2,
    evidence: 'Oliver says: "Now I play the drums and love it!"',
    explanationZh: 'Oliver 上學期停止彈吉他，小號只試了兩週不喜歡，現在演奏的是爵士鼓（drums）。'
  },
  {
    id: 'l1-4',
    paper: 'listening',
    part: 1,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 1: What will the weather be like on Sunday?',
    script: 'Man: The weather report says Saturday will be windy with heavy rain throughout the morning. However, by Sunday, the clouds will clear completely and we will enjoy bright, warm sunshine all day long. Perfect for a walk in the hills!',
    question: 'What will the weather be like on Sunday?',
    choices: ['Rainy', 'Sunny', 'Windy'],
    answer: 1,
    evidence: 'The speaker states: "by Sunday, the clouds will clear completely and we will enjoy bright, warm sunshine"',
    explanationZh: '週六下雨有風，週日雲層散開，將會整天陽光普照（bright, warm sunshine）。'
  },
  {
    id: 'l1-5',
    paper: 'listening',
    part: 1,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 1: Where did Grace leave her phone?',
    script: 'Dad: Grace, have you seen your smartphone? It’s not on the kitchen counter. Grace: Oh dear! I thought I left it in my jacket pocket, but then I remember taking it out to check the time while doing homework at my bedroom desk. That’s where it must be!',
    question: 'Where is Grace’s phone?',
    choices: ['On the kitchen counter', 'In her jacket pocket', 'On her bedroom desk'],
    answer: 2,
    evidence: 'Grace remembers: "taking it out to check the time while doing homework at my bedroom desk. That’s where it must be!"',
    explanationZh: 'Grace 想起自己在臥室書桌（bedroom desk）寫作業看時間時拿出來放在那裡。'
  },

  // --- Part 2 (5 Questions: Note-Taking / Text Entry) ---
  // Script: Monologue by librarian about Summer Reading Challenge
  {
    id: 'l2-6',
    paper: 'listening',
    part: 2,
    format: 'textEntry',
    synthetic: true,
    title: 'Part 2: Summer Reading Challenge Notes',
    script: 'Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!',
    passage: 'SUMMER READING CHALLENGE\nStart date: 12th July\nNumber of books to read: [26]\nWeekly workshop day: [27]\nWorkshop time: [28] a.m.\nLocation of workshop: library [29]\nCoordinator surname: Mr [30]',
    question: 'Complete question 6: Number of books to read',
    accepted: ['6', 'six'],
    evidence: 'The librarian says: "Every participant must read at least six books"',
    explanationZh: '館員說明每位參加者必須至少閱讀 6 本書（six）。'
  },
  {
    id: 'l2-7',
    paper: 'listening',
    part: 2,
    format: 'textEntry',
    synthetic: true,
    title: 'Part 2: Summer Reading Challenge Notes',
    script: 'Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!',
    passage: 'SUMMER READING CHALLENGE\nWeekly workshop day: [27]',
    question: 'Complete question 7: Day of the weekly workshop',
    accepted: ['tuesday'],
    evidence: 'The librarian says: "Our special reading workshop meets every Tuesday morning"',
    explanationZh: '每週的工作坊是在星期二（Tuesday）早晨。'
  },
  {
    id: 'l2-8',
    paper: 'listening',
    part: 2,
    format: 'textEntry',
    synthetic: true,
    title: 'Part 2: Summer Reading Challenge Notes',
    script: 'Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!',
    passage: 'SUMMER READING CHALLENGE\nWorkshop time: [28] a.m.',
    question: 'Complete question 8: Workshop start time',
    accepted: ['10', '10.00', '10:00', 'ten'],
    evidence: 'The librarian says: "at ten o’clock in the library garden."',
    explanationZh: '時間是早上十點（10 / ten）。'
  },
  {
    id: 'l2-9',
    paper: 'listening',
    part: 2,
    format: 'textEntry',
    synthetic: true,
    title: 'Part 2: Summer Reading Challenge Notes',
    script: 'Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!',
    passage: 'SUMMER READING CHALLENGE\nLocation: library [29]',
    question: 'Complete question 9: Meeting place inside/outside the library',
    accepted: ['garden'],
    evidence: 'The librarian states: "in the library garden."',
    explanationZh: '地點在圖書館的花園（garden）。'
  },
  {
    id: 'l2-10',
    paper: 'listening',
    part: 2,
    format: 'textEntry',
    synthetic: true,
    title: 'Part 2: Summer Reading Challenge Notes',
    script: 'Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!',
    passage: 'SUMMER READING CHALLENGE\nCoordinator surname: Mr [30]',
    question: 'Complete question 10: Coordinator surname (spelt out)',
    accepted: ['barlow'],
    evidence: 'The librarian spells out: "Mr Barlow, that’s B-A-R-L-O-W."',
    explanationZh: '館員拼出姓氏：B-A-R-L-O-W（Barlow）。'
  },

  // --- Part 3 (5 Questions: Longer Dialogue) ---
  // Script: Conversation between Chloe and Ben about a school science fair
  {
    id: 'l3-11',
    paper: 'listening',
    part: 3,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 3: School Science Fair',
    script: 'Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!',
    question: 'What is Ben building for this year’s competition?',
    choices: ['A volcano model', 'A solar-powered model car', 'A weather station'],
    answer: 1,
    evidence: 'Ben says: "this time I’m building a small solar-powered model car."',
    explanationZh: 'Ben 提到去年做火山模型，今年要製作的是太陽能模型車（solar-powered model car）。'
  },
  {
    id: 'l3-12',
    paper: 'listening',
    part: 3,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 3: School Science Fair',
    script: 'Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!',
    question: 'Who will work together with Ben on the project?',
    choices: ['His cousin Jack', 'His classmate Toby', 'His science teacher'],
    answer: 1,
    evidence: 'Ben explains: "Jack... is busy with tennis practice. So my classmate Toby is joining me."',
    explanationZh: 'Jack 要練網球沒空，所以由同班同學 Toby 與他合作。'
  },
  {
    id: 'l3-13',
    paper: 'listening',
    part: 3,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 3: School Science Fair',
    script: 'Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!',
    question: 'Where will Ben and his partner build their project?',
    choices: ['In Toby’s garage', 'In the school lab', 'In Ben’s kitchen'],
    answer: 2,
    evidence: 'Ben says: "Toby’s garage is too cold, so we will use my kitchen table on Saturdays."',
    explanationZh: 'Toby 的車庫太冷，所以他們決定每週六在 Ben 家的廚房餐桌製作。'
  },
  {
    id: 'l3-14',
    paper: 'listening',
    part: 3,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 3: School Science Fair',
    script: 'Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!',
    question: 'What is the final day to hand in the project?',
    choices: ['Wednesday the 18th', 'Friday the 20th', 'Saturday the 21st'],
    answer: 0,
    evidence: 'Ben clarifies: "The teacher said Wednesday the 18th is the final deadline, not Friday the 20th."',
    explanationZh: '老師明確規定截止日是 18 號週三（Wednesday the 18th），而非 20 號。'
  },
  {
    id: 'l3-15',
    paper: 'listening',
    part: 3,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 3: School Science Fair',
    script: 'Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!',
    question: 'What will the winner of the competition receive?',
    choices: ['A science encyclopedia book', 'An electronic tablet', 'A free trip to London'],
    answer: 1,
    evidence: 'Ben states: "The winner receives a brand new electronic tablet!"',
    explanationZh: '第一名得主將獲得一台全新的電子平板電腦（electronic tablet）。'
  },

  // --- Part 4 (5 Questions: Short Monologues / Dialogues - Gist & Opinion) ---
  {
    id: 'l4-16',
    paper: 'listening',
    part: 4,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 4: Boy talking about his new jacket',
    script: 'Boy: My aunt bought me this winter coat for my birthday. The green colour is really nice and it has lots of useful pockets for my phone and keys. But it is made of such heavy wool that it feels uncomfortable to wear when I ride my bicycle to school. I might ask to exchange it for a lighter one.',
    question: 'What does the boy dislike about his new coat?',
    choices: ['The colour', 'The number of pockets', 'The heavy weight'],
    answer: 2,
    evidence: 'The boy complains: "it is made of such heavy wool that it feels uncomfortable to wear"',
    explanationZh: '男孩喜歡綠色和多口袋，但不滿意外套太厚重（heavy weight），騎腳踏車不舒服。'
  },
  {
    id: 'l4-17',
    paper: 'listening',
    part: 4,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 4: Announcement at train station',
    script: 'Announcer: Attention all passengers on platform two. The eleven-fifteen service to Manchester Piccadilly has been cancelled due to fallen branches on the track near Crewe. Passengers holding tickets may board the eleven-forty-five express on platform four without extra charge.',
    question: 'What problem does the announcer report?',
    choices: ['The train fare has increased.', 'A train service has been cancelled.', 'Platform four is closed.'],
    answer: 1,
    evidence: 'The announcer states: "The eleven-fifteen service to Manchester Piccadilly has been cancelled"',
    explanationZh: '廣播通報 11:15 前往曼徹斯特的班次因為軌道有樹枝掉落而已被取消（cancelled）。'
  },
  {
    id: 'l4-18',
    paper: 'listening',
    part: 4,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 4: Two friends talking about a party',
    script: 'Girl: Did you have a good time at Lucas’s party on Saturday? Boy: The music was fantastic and the food was delicious. But there were over forty people packed into his tiny living room, so nobody could even sit down. It was way too crowded. Girl: Oh, I see what you mean!',
    question: 'How did the boy feel about the party?',
    choices: ['He thought it was too crowded.', 'He did not like the food.', 'The music was too quiet.'],
    answer: 0,
    evidence: 'The boy explains: "over forty people packed into his tiny living room... It was way too crowded."',
    explanationZh: '男孩表示音樂和食物都很棒，但四十個人擠在小客廳太擁擠了（too crowded）。'
  },
  {
    id: 'l4-19',
    paper: 'listening',
    part: 4,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 4: Girl talking to her brother about a film',
    script: 'Girl: I just finished watching the mystery movie you recommended. The actors were brilliant and the scenery in the mountains looked stunning. But the ending made no sense at all—they never explained who took the jewels! It was rather disappointing.',
    question: 'What disappointed the girl about the movie?',
    choices: ['The acting', 'The ending', 'The mountain scenery'],
    answer: 1,
    evidence: 'The girl says: "the ending made no sense at all... It was rather disappointing."',
    explanationZh: '女孩稱讚演員和風景，但覺得結局（ending）莫名其妙，令人失望。'
  },
  {
    id: 'l4-20',
    paper: 'listening',
    part: 4,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 4: Teacher talking to class',
    script: 'Teacher: Class, quiet please! You all did very well on your history test yesterday. However, several students forgot to write their names on the question sheets. Please remember that if there is no name, I cannot record your grade into the school system!',
    question: 'What is the teacher reminding students to do?',
    choices: ['Study harder for tests', 'Write their names on test papers', 'Return their history textbooks'],
    answer: 1,
    evidence: 'The teacher reminds: "several students forgot to write their names on the question sheets."',
    explanationZh: '老師提醒幾位同學在測驗試卷上寫下自己的名字（write names）。'
  },

  // --- Part 5 (5 Questions: Dialogue Matching A to H) ---
  // Script: Emma telling her dad what each member of her family chose at the hobby fair
  // Options A to H:
  // A = Cooking class
  // B = Sailing club
  // C = Chess group
  // D = Photography club
  // E = Drama workshop
  // F = Rock climbing
  // G = Pottery class
  // H = Skateboarding
  {
    id: 'l5-21',
    paper: 'listening',
    part: 5,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 5: Hobby Fair Matching',
    script: 'Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!',
    passage: 'HOBBIES CHOICES:\nA Cooking class  B Sailing club  C Chess group  D Photography  E Drama workshop  F Rock climbing  G Pottery class  H Skateboarding\nMatch each person with their hobby.',
    question: 'Which hobby did Noah choose?',
    choices: ['A (Cooking class)', 'B (Sailing club)', 'C (Chess group)', 'D (Photography)', 'E (Drama workshop)', 'F (Rock climbing)', 'G (Pottery class)', 'H (Skateboarding)'],
    answer: 1,
    evidence: 'Emma says: "My brother Noah immediately signed up for the sailing club at the reservoir."',
    explanationZh: 'Emma 說哥哥 Noah 報名了水庫的帆船俱樂部（Sailing club - 選項 B）。'
  },
  {
    id: 'l5-22',
    paper: 'listening',
    part: 5,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 5: Hobby Fair Matching',
    script: 'Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!',
    passage: 'Choices: A Cooking, B Sailing, C Chess, D Photography, E Drama, F Climbing, G Pottery, H Skateboarding',
    question: 'Which hobby did Ella choose?',
    choices: ['A (Cooking class)', 'B (Sailing club)', 'C (Chess group)', 'D (Photography)', 'E (Drama workshop)', 'F (Rock climbing)', 'G (Pottery class)', 'H (Skateboarding)'],
    answer: 4,
    evidence: 'Emma says: "Ella loves acting, so she joined the drama workshop."',
    explanationZh: 'Ella 喜歡演戲，所以參加了戲劇工作坊（Drama workshop - 選項 E）。'
  },
  {
    id: 'l5-23',
    paper: 'listening',
    part: 5,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 5: Hobby Fair Matching',
    script: 'Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!',
    passage: 'Choices: A Cooking, B Sailing, C Chess, D Photography, E Drama, F Climbing, G Pottery, H Skateboarding',
    question: 'Which hobby did Max choose?',
    choices: ['A (Cooking class)', 'B (Sailing club)', 'C (Chess group)', 'D (Photography)', 'E (Drama workshop)', 'F (Rock climbing)', 'G (Pottery class)', 'H (Skateboarding)'],
    answer: 2,
    evidence: 'Emma explains: "Max wanted rock climbing... but it was fully booked. So he chose the chess group instead"',
    explanationZh: '攀岩額滿，所以 Max 選擇了西洋棋小組（Chess group - 選項 C）。'
  },
  {
    id: 'l5-24',
    paper: 'listening',
    part: 5,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 5: Hobby Fair Matching',
    script: 'Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!',
    passage: 'Choices: A Cooking, B Sailing, C Chess, D Photography, E Drama, F Climbing, G Pottery, H Skateboarding',
    question: 'Which hobby did Holly choose?',
    choices: ['A (Cooking class)', 'B (Sailing club)', 'C (Chess group)', 'D (Photography)', 'E (Drama workshop)', 'F (Rock climbing)', 'G (Pottery class)', 'H (Skateboarding)'],
    answer: 6,
    evidence: 'Emma says: "Holly loves working with clay, so she chose the pottery class."',
    explanationZh: 'Holly 喜歡玩黏土，所以選擇了陶藝課（Pottery class - 選項 G）。'
  },
  {
    id: 'l5-25',
    paper: 'listening',
    part: 5,
    format: 'multipleChoice',
    synthetic: true,
    title: 'Part 5: Hobby Fair Matching',
    script: 'Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!',
    passage: 'Choices: A Cooking, B Sailing, C Chess, D Photography, E Drama, F Climbing, G Pottery, H Skateboarding',
    question: 'Which hobby did Emma choose for herself?',
    choices: ['A (Cooking class)', 'B (Sailing club)', 'C (Chess group)', 'D (Photography)', 'E (Drama workshop)', 'F (Rock climbing)', 'G (Pottery class)', 'H (Skateboarding)'],
    answer: 0,
    evidence: 'Emma concludes: "And for me, I registered for the cooking class to learn Italian pasta!"',
    explanationZh: 'Emma 自己報名了烹飪課（Cooking class - 選項 A）學習義大利麵。'
  }
];

// Speaking Tasks (Parts 1 & 2)
export const speakingExamParts = [
  {
    part: 1,
    title: 'Part 1: Personal Questions & Daily Life',
    timing: '3–4 minutes',
    instructions: 'The examiner will ask you individual questions about your name, school, hobbies, and everyday routine.',
    phases: [
      {
        phase: 'Phase 1: Getting to Know You',
        questions: [
          'What is your name and how old are you?',
          'Where do you live? Do you live in a house or a flat?',
          'Tell me about your school. What is your favourite subject and why?'
        ],
        sampleAnswers: [
          'My name is Mei-Ling and I am twelve years old.',
          'I live in Taipei in a flat near a beautiful park.',
          'My school has a large sports field. My favourite subject is Science because we do fun experiments.'
        ]
      },
      {
        phase: 'Phase 2: Everyday Life & Habits',
        questions: [
          'What do you usually do on Saturday mornings?',
          'What food do you enjoy eating with your family?',
          'Tell me about your best friend. What do you like doing together?'
        ],
        sampleAnswers: [
          'I usually ride my bicycle with my father or read library books.',
          'I enjoy eating dumplings and hot soup with my family on Sunday evenings.',
          'My best friend is Kevin. We both enjoy playing basketball and drawing comics together.'
        ]
      }
    ],
    stems: [
      'I live in ... with my family.',
      'My favourite subject is ... because ...',
      'At the weekend, I usually ...',
      'I enjoy ... because it is fun.'
    ],
    explanationZh: 'Speaking Part 1 著重於自我介紹與日常生活的流暢回答。請盡量用 2 到 3 句完整句子回答，不必害怕文法小失誤。'
  },
  {
    part: 2,
    title: 'Part 2: Collaborative Discussion with Partner',
    timing: '5–6 minutes',
    instructions: 'Discuss different leisure activities with your partner. Say which activities you like or dislike and give reasons. Remember to ask your partner what they think!',
    situation: 'Here are some pictures of different after-school activities: playing football, learning the guitar, reading books, painting pictures, and playing computer games. Talk together about whether you like these activities.',
    activities: [
      {name: 'Playing football', stem: 'Do you like playing football? I think it is exciting because you play in a team.'},
      {name: 'Learning the guitar', stem: 'Do you like learning a musical instrument? I think it is relaxing.'},
      {name: 'Reading books', stem: 'Do you enjoy reading adventure books? It helps me learn new words.'},
      {name: 'Painting pictures', stem: 'Do you like painting? It allows me to be creative.'},
      {name: 'Playing computer games', stem: 'Do you play video games? I enjoy playing strategy games with friends.'}
    ],
    partnerPrompts: [
      'Do you agree with me?',
      'What about you? Do you enjoy this activity?',
      'Which of these activities do you like best?'
    ],
    sampleDialogue: 'Candidate A: Do you like playing football after school?\nCandidate B: Yes, I love football because I can run outside with my friends. What about you?\nCandidate A: I prefer playing the guitar because it is peaceful at home.\nCandidate B: Do you think painting pictures is interesting?\nCandidate A: Yes, I like painting animals. Do you agree?\nCandidate B: I agree, it is very relaxing.',
    explanationZh: 'Speaking Part 2 著重在「與搭檔互動、表達喜好與理由、並詢問搭檔想法」。關鍵句型包含：What about you?、Do you agree?、I prefer... because...'
  }
];

export const examQuestions = [...rwObjectiveQuestions, ...listeningObjectiveQuestions];
