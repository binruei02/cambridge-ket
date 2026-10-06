// Cambridge A2 Key for Schools Official Practice Paper - Set 2
// 100% English prompts, passages, choices, and evidence.
// Rich explanations in Traditional Chinese.

export const rwObjectiveQuestionsSet2 = [
  // --- Part 1 (6 Questions: Notices, Signs, Short Messages) ---
  {
    id: 'rw2_1-1',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Morning Bakery Notice',
    passage: 'MORNING BAKERY SPECIAL\nBuy any freshly baked bread before 9.00 a.m. and receive a free apple muffin! Offer limited to one per customer.',
    question: 'How can a customer get a free apple muffin?',
    choices: [
      'By visiting the bakery after 9.00 a.m.',
      'By buying fresh bread early in the morning',
      'By purchasing two loaves of bread'
    ],
    answer: 1,
    evidence: 'The notice states: "Buy any freshly baked bread before 9.00 a.m. and receive a free apple muffin!"',
    explanationZh: '告示說明只要在早上 9:00 前購買剛出爐的新鮮麵包，就能免費獲得一個蘋果瑪芬（符合選項 B：一大早買新鮮麵包）。'
  },
  {
    id: 'rw2_1-2',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Text Message from Oliver',
    passage: 'Hi Lucas,\nMy bicycle helmet is still at my cousin’s flat. Could I borrow your spare helmet for our forest ride on Saturday?\nOliver',
    question: 'Why did Oliver send this message?',
    choices: [
      'To invite Lucas to his cousin’s flat',
      'To ask if he can borrow a cycling helmet',
      'To change the day of their bike ride'
    ],
    answer: 1,
    evidence: 'Oliver asks: "Could I borrow your spare helmet for our forest ride on Saturday?"',
    explanationZh: 'Oliver 傳訊息詢問是否能借用 Lucas 備用的腳踏車安全帽（選項 B）。'
  },
  {
    id: 'rw2_1-3',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Railway Platform Screen',
    passage: 'PLATFORM 4\nPassengers travelling to Oxford should board carriages 5 to 8. The front four carriages will separate at Reading.',
    question: 'What should passengers for Oxford do?',
    choices: [
      'Sit in the rear four carriages of the train',
      'Change trains immediately at Platform 4',
      'Wait for the next train arriving at Reading'
    ],
    answer: 0,
    evidence: 'The screen advises: "Passengers travelling to Oxford should board carriages 5 to 8. The front four carriages will separate at Reading."',
    explanationZh: '前往牛津的旅客應搭乘第 5 到 8 節車廂（後四節車廂），因為前四節會在 Reading 分開。因此選 A。'
  },
  {
    id: 'rw2_1-4',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Sports Shop Service Sign',
    passage: 'GREEN VALLEY SPORTS\nTennis racket restringing service takes three working days. Please collect all finished rackets from the customer service desk.',
    question: 'What does this notice tell customers?',
    choices: [
      'Rackets can be collected immediately after payment.',
      'Restrung rackets will be ready after three days.',
      'Tennis coaching sessions are available at the desk.'
    ],
    answer: 1,
    evidence: 'The sign explains: "Tennis racket restringing service takes three working days."',
    explanationZh: '告示說明網球拍穿線需要三個工作天（選項 B）。'
  },
  {
    id: 'rw2_1-5',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Noticeboard Volunteer Sign',
    passage: 'SCHOOL CHARITY FAIR\nStudents interested in helping at the games booths should sign their names outside the main hall by Thursday midday.',
    question: 'What must student volunteers do?',
    choices: [
      'Bring games equipment to the school on Thursday',
      'Put their names on the list before 12.00 p.m. on Thursday',
      'Organise the booths inside the main hall today'
    ],
    answer: 1,
    evidence: 'The notice asks volunteers to: "sign their names outside the main hall by Thursday midday."',
    explanationZh: 'midday 代表正午 12:00，有意願協助的學生必須在週四中午前在名單上簽名登記（選項 B）。'
  },
  {
    id: 'rw2_1-6',
    paper: 'readingWriting',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Museum Silent Room Rule',
    passage: 'HISTORICAL ARCHIVE ROOM\nSilent study area. Mobile phones must be switched off. Bottled water is permitted, but eating is not allowed.',
    question: 'Which rule applies to the Historical Archive Room?',
    choices: [
      'Visitors may bring cold sandwiches inside.',
      'Visitors may drink bottled water quietly.',
      'Visitors may answer urgent telephone calls.'
    ],
    answer: 1,
    evidence: 'The notice confirms: "Bottled water is permitted, but eating is not allowed."',
    explanationZh: '規定註明允許飲用瓶裝水（Bottled water is permitted），禁止飲食與通話。因此選 B。'
  },

  // --- Part 2 (7 Questions: Matching 3 texts A, B, C) ---
  // Topic: Three Young Musicians
  // A = Maya (violinist, plays in town square on sunny weekends, raises money for animal charity)
  // B = Leo (plays trumpet in school brass band, learned from uncle, loves playing loud upbeat jazz)
  // C = Zoe (creates electronic synth tunes on computer in bedroom, uploads songs, composes late at night)
  {
    id: 'rw2_2-7',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya: "I take my acoustic violin to the town square every sunny Saturday. People often gather around while I play classical tunes. All the coins people leave in my violin case go directly to the local cat shelter."\nB Leo: "I play trumpet in our school jazz band. My uncle gave me my first trumpet and taught me the basic notes when I was nine. I love the exciting energy of performing on a bright stage!"\nC Zoe: "I use a small keyboard connected to my laptop in my bedroom. I compose electronic melodies late at night when the house is completely quiet. I upload my songs to an online youth music website."',
    question: 'Which musician gives the money they earn to a charity?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 0,
    evidence: 'Maya states: "All the coins people leave in my violin case go directly to the local cat shelter."',
    explanationZh: 'Maya 將琴盒裡收到的零錢全數捐給當地的貓咪收容所（慈善機構）。'
  },
  {
    id: 'rw2_2-8',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (street violinist, donates to shelter)\nB Leo (school jazz band trumpet, taught by uncle)\nC Zoe (bedroom electronic music, creates at night)',
    question: 'Which musician composes their music late in the evening?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 2,
    evidence: 'Zoe explains: "I compose electronic melodies late at night when the house is completely quiet."',
    explanationZh: 'Zoe 提到她總是在深夜家裡安靜時創作電子旋律。'
  },
  {
    id: 'rw2_2-9',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (outdoors in market square)\nB Leo (member of school group)\nC Zoe (online digital releases)',
    question: 'Which musician performs as part of a school music group?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 1,
    evidence: 'Leo explains: "I play trumpet in our school jazz band."',
    explanationZh: 'Leo 在學校爵士樂團擔任小號手。'
  },
  {
    id: 'rw2_2-10',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (violin, solo outdoor performance)\nB Leo (trumpet lessons from family member)\nC Zoe (computer keyboard in bedroom)',
    question: 'Which musician learned to play their instrument from a family member?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 1,
    evidence: 'Leo says: "My uncle gave me my first trumpet and taught me the basic notes when I was nine."',
    explanationZh: 'Leo 的舅舅給了他第一把小號並教他基本音階。'
  },
  {
    id: 'rw2_2-11',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (plays live outside in public square)\nB Leo (live stage concerts with band)\nC Zoe (shares music tracks on the internet)',
    question: 'Which musician shares their tracks with listeners over the internet?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 2,
    evidence: 'Zoe says: "I upload my songs to an online youth music website."',
    explanationZh: 'Zoe 將自己的歌曲上傳到線上青少年音樂網站。'
  },
  {
    id: 'rw2_2-12',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (performs in town square when weather is fine)\nB Leo (rehearses inside music room and stage)\nC Zoe (creates inside bedroom)',
    question: 'Which musician performs outdoors when the weather is good?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 0,
    evidence: 'Maya says: "I take my acoustic violin to the town square every sunny Saturday."',
    explanationZh: 'Maya 在每個晴朗的週六到鎮上的廣場戶外演奏小提琴。'
  },
  {
    id: 'rw2_2-13',
    paper: 'readingWriting',
    part: 2,
    set: 2,
    format: 'multipleChoice',
    title: 'Three Young Musicians',
    passage: 'A Maya (classical violin)\nB Leo (upbeat jazz with trumpets)\nC Zoe (modern synth melodies)',
    question: 'Which musician plays upbeat jazz music on a brass instrument?',
    choices: ['A (Maya)', 'B (Leo)', 'C (Zoe)'],
    answer: 1,
    evidence: 'Leo explains: "I play trumpet in our school jazz band... I love the exciting energy of performing on a bright stage!"',
    explanationZh: 'Leo 吹奏銅管樂器小號，並在學校爵士樂團演奏充滿活力的爵士樂。'
  },

  // --- Part 3 (5 Questions: Longer Text Comprehension) ---
  // Text: A Day with an Island Ranger
  {
    id: 'rw2_3-14',
    paper: 'readingWriting',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'A Day with an Island Ranger',
    passage: 'Thirteen-year-old Callum spent three days on Ramsey Island during his summer holiday. Ramsey Island is a rocky nature reserve off the coast of Wales. Callum’s aunt is a full-time wildlife ranger there, and she invited Callum to assist her with daily tasks.\n\nOn the first morning, Callum helped count the colonies of Atlantic puffins nesting on the steep cliffs. "Before the trip, I thought puffins were slow and clumsy," Callum says. "In reality, they flap their small wings hundreds of times a minute and fly extremely fast across the waves!"\n\nLater in the afternoon, the ranger showed Callum how plastic debris washed ashore during winter storms threatens seabirds. Together, they spent two hours collecting broken fishing nets and plastic bottles from a narrow cove. By evening, their large collection bags were completely full. Callum felt proud seeing the clean pebbles.\n\n"Living on the island without shops or television was surprisingly peaceful," Callum remarks. Next summer, he plans to return to help build protective wooden nest boxes for young birds.',
    question: 'Why did Callum travel to Ramsey Island?',
    choices: [
      'To take photographs for a school contest',
      'To help his aunt with wildlife ranger work',
      'To spend a beach holiday with his classmates'
    ],
    answer: 1,
    evidence: 'The text notes: "Callum’s aunt is a full-time wildlife ranger there, and she invited Callum to assist her with daily tasks."',
    explanationZh: '第一段提到 Callum 的姑姑是全職野生動物巡護員，邀請 Callum 來協助日常工作。'
  },
  {
    id: 'rw2_3-15',
    paper: 'readingWriting',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'A Day with an Island Ranger',
    passage: '(See passage in Question 14)',
    question: 'What surprised Callum about the puffins on the cliffs?',
    choices: [
      'They could fly across the sea with great speed.',
      'They were much larger than he had expected.',
      'They made loud songs during the night.'
    ],
    answer: 0,
    evidence: 'Callum explains: "In reality, they flap their small wings hundreds of times a minute and fly extremely fast across the waves!"',
    explanationZh: 'Callum 原本以為海雀笨拙緩慢，沒想到牠們扇動翅膀極快，能在海面上飛速掠過。'
  },
  {
    id: 'rw2_3-16',
    paper: 'readingWriting',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'A Day with an Island Ranger',
    passage: '(See passage in Question 14)',
    question: 'What task did Callum and his aunt do in the afternoon?',
    choices: [
      'They fixed broken wooden boats on the beach.',
      'They cleared plastic rubbish and nets from a cove.',
      'They fed the seabirds with fresh small fish.'
    ],
    answer: 1,
    evidence: 'The text says: "Together, they spent two hours collecting broken fishing nets and plastic bottles from a narrow cove."',
    explanationZh: '下午他們花了兩小時在狹窄的海灣撿拾被海浪沖上岸的廢棄漁網與塑膠瓶。'
  },
  {
    id: 'rw2_3-17',
    paper: 'readingWriting',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'A Day with an Island Ranger',
    passage: '(See passage in Question 14)',
    question: 'How did Callum feel about island life without shops or television?',
    choices: [
      'He found it boring after the first day.',
      'He missed communicating with his friends.',
      'He enjoyed how quiet and calm it was.'
    ],
    answer: 2,
    evidence: 'Callum remarks: "Living on the island without shops or television was surprisingly peaceful"',
    explanationZh: 'peaceful 表示寧靜和平靜，Callum 覺得沒有商店和電視的生活出乎意料地平靜享受。'
  },
  {
    id: 'rw2_3-18',
    paper: 'readingWriting',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'A Day with an Island Ranger',
    passage: '(See passage in Question 14)',
    question: 'What does Callum hope to do next summer?',
    choices: [
      'Build wooden nest boxes on the island',
      'Open a birdwatching blog for tourists',
      'Study marine science at a university'
    ],
    answer: 0,
    evidence: 'The text concludes: "Next summer, he plans to return to help build protective wooden nest boxes for young birds."',
    explanationZh: '文章最後一段提到他計畫明年夏天回到島上協助替雛鳥建造防護木製巢箱。'
  },

  // --- Part 4 (6 Questions: Multiple-Choice Cloze) ---
  // Text: The Honeybee's Amazing Dance
  {
    id: 'rw2_4-19',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'Honeybees are famous for making honey, but they also have a fascinating way to communicate. When a worker bee discovers a patch of flowers, it flies _____ back to the darkness of the hive.',
    question: 'Choose the correct word for gap 19.',
    choices: ['straight', 'nearly', 'slowly'],
    answer: 0,
    evidence: 'The adverb "straight" means directly back without delay.',
    explanationZh: '副詞 straight 在此表示「直接、筆直地」飛回蜂巢。'
  },
  {
    id: 'rw2_4-20',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'Inside the hive, the bee performs a special dance in circles to _____ the other bees where the sweet nectar is located.',
    question: 'Choose the correct word for gap 20.',
    choices: ['speak', 'tell', 'say'],
    answer: 1,
    evidence: 'The verb "tell" takes an indirect object ("the other bees").',
    explanationZh: 'tell sb something 為固定用法，接對象 other bees，故選 tell。'
  },
  {
    id: 'rw2_4-21',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'The angle of the waggle dance indicates the exact _____ to the blossoms relative to the sun.',
    question: 'Choose the correct word for gap 21.',
    choices: ['direction', 'journey', 'address'],
    answer: 0,
    evidence: 'The dance points toward the "direction" of the flowers relative to the position of the sun.',
    explanationZh: 'direction 表示「方向」，蜜蜂擺尾舞的角度指示相對於太陽的花朵方向。'
  },
  {
    id: 'rw2_4-22',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'The Austrian scientist Karl von Frisch received a Nobel Prize _____ explaining how this bee language works.',
    question: 'Choose the correct word for gap 22.',
    choices: ['for', 'with', 'about'],
    answer: 0,
    evidence: 'The preposition "for" follows "received a prize for doing something".',
    explanationZh: 'receive a prize for + V-ing 表示「因……而獲獎」，介系詞用 for。'
  },
  {
    id: 'rw2_4-23',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'Bees are vital for our planet because they carry pollen between blossoms, allowing plants to produce _____ vegetables and fruit.',
    question: 'Choose the correct word for gap 23.',
    choices: ['delicious', 'thirsty', 'polite'],
    answer: 0,
    evidence: 'Vegetables and fruit are "delicious" foods grown by plants.',
    explanationZh: '形容蔬菜與水果美味可口，選 delicious。'
  },
  {
    id: 'rw2_4-24',
    paper: 'readingWriting',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'The Honeybee’s Amazing Dance',
    passage: 'Today, gardeners plant colourful lavender and sunflowers to _____ bees during warm summer months.',
    question: 'Choose the correct word for gap 24.',
    choices: ['support', 'waste', 'forget'],
    answer: 0,
    evidence: 'Gardeners plant flowers to help and "support" bees with nectar.',
    explanationZh: '園丁種植花朵是為了幫助與支持（support）蜜蜂採蜜生存。'
  },

  // --- Part 5 (6 Questions: Open Cloze / Text Entry) ---
  // Text: Email to Dylan about Weekend Camping
  {
    id: 'rw2_5-25',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'Hi Dylan,\nI am writing to ask if you are still coming on our weekend camping trip. My uncle _____ borrowed a four-person tent.',
    question: 'Write ONE word in gap 25.',
    accepted: ['has', '\'s'],
    evidence: 'Present perfect tense requires auxiliary verb "has" before past participle "borrowed".',
    explanationZh: '現在完成式：主詞 My uncle 為第三人稱單數，接助動詞 has（或簡寫 \'s）+ borrowed。'
  },
  {
    id: 'rw2_5-26',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'We are leaving early _____ Saturday morning at seven o’clock.',
    question: 'Write ONE word in gap 26.',
    accepted: ['on'],
    evidence: 'The preposition "on" is required before specific days and dates like "Saturday morning".',
    explanationZh: '星期與特定日期的早晨前面使用介系詞 on（on Saturday morning）。'
  },
  {
    id: 'rw2_5-27',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'Remember to pack a warm jacket _____ it gets quite cold near the river at night.',
    question: 'Write ONE word in gap 27.',
    accepted: ['because', 'as', 'since'],
    evidence: 'A subordinating causal conjunction ("because", "as", or "since") introduces the reason.',
    explanationZh: '連接詞表原因：「因為」晚上河邊會變冷，填 because（或 as、since）。'
  },
  {
    id: 'rw2_5-28',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'Do you have _____ torch, or should I bring an extra one for you?',
    question: 'Write ONE word in gap 28.',
    accepted: ['a', 'your'],
    evidence: 'Singular countable noun "torch" requires indefinite article "a" or possessive "your".',
    explanationZh: '單數可數名詞 torch 前面填冠詞 a 或所有格 your。'
  },
  {
    id: 'rw2_5-29',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'My mum is making some cheese sandwiches _____ our lunch on the trail.',
    question: 'Write ONE word in gap 29.',
    accepted: ['for'],
    evidence: 'Preposition "for" indicates purpose ("for our lunch").',
    explanationZh: '介系詞 for 表用途（做三明治當作我們健行的午餐）。'
  },
  {
    id: 'rw2_5-30',
    paper: 'readingWriting',
    part: 5,
    set: 2,
    format: 'textEntry',
    title: 'Email about Camping Trip',
    passage: 'Please send me a message _____ you need any more information.\nSee you soon!\nLucas',
    question: 'Write ONE word in gap 30.',
    accepted: ['if', 'when'],
    evidence: 'Conditional conjunction "if" introduces the condition ("if you need any more information").',
    explanationZh: '條件連接詞：「如果你需要更多資訊」，填 if。'
  }
];

export const writingExamTasksSet2 = [
  {
    id: 'rw2_6-31',
    paper: 'readingWriting',
    part: 6,
    set: 2,
    type: 'Guided Short Email',
    title: 'Part 6: Guided Short Email',
    min: 25,
    prompt: 'You want to invite your English friend, Taylor, to a science festival this Saturday. Write an email to Taylor.',
    points: [
      'Invite Taylor to come to the science festival with you.',
      'Say where and what time you should meet.',
      'Explain what exciting activity you can do there.'
    ],
    sample: 'Hi Taylor,\nWould you like to come to the science festival with me this Saturday? Let’s meet outside the library gate at ten o’clock. We can build robotic cars and try fun space VR games! Write back soon.\nBest,\nAlex',
    hintsZh: [
      '使用 Would you like to come to... 發出親切邀請。',
      '具體寫出集合時間與地點（如 library gate at 10.00）。',
      '描述一項生動的活動（例如機器人競賽或太空遊戲）。'
    ],
    explanationZh: 'Part 6 關鍵在於「精確回答三個提示點」。字數需達 25 字以上，使用正確標點與問候語（Hi / Best）。'
  },
  {
    id: 'rw2_7-32',
    paper: 'readingWriting',
    part: 7,
    set: 2,
    type: 'Picture Story Writing',
    title: 'Part 7: Picture Story Writing',
    min: 35,
    prompt: 'Look at the three pictures. Write the story shown in the pictures. Write 35 words or more.',
    scenes: [
      {
        number: 1,
        title: 'Picture 1',
        description: 'Sunny morning on a street sidewalk. Two children setting up a wooden table with a sign: "Fresh Lemonade 50p".'
      },
      {
        number: 2,
        title: 'Picture 2',
        description: 'Dark clouds gather in the sky and sudden heavy rain pours down. The children try to cover the lemonade pitcher.'
      },
      {
        number: 3,
        title: 'Picture 3',
        description: 'A smiling elderly neighbour holds a large colourful umbrella over them and invites them under the dry porch to share lemonade together.'
      }
    ],
    sample: 'One warm Saturday morning, Ben and his sister Clara set up a small lemonade stall outside their house. Suddenly, dark clouds covered the sun and heavy rain started to fall. Luckily, their kind neighbour Mr Davis arrived with a giant umbrella. He helped them move their table under his dry porch, and they happily drank refreshing lemonade together.',
    hintsZh: [
      '開頭交代時間、人物與情境（One warm Saturday morning, Ben and Clara set up...）。',
      '用 Suddenly 或 All of a sudden 描寫天氣變化的轉折。',
      '用 Luckily 或 Fortunately 描寫鄰居撐傘幫忙並皆大歡喜的收尾。'
    ],
    explanationZh: 'Part 7 要求 35 字以上的連貫故事。請務必使用過去式（set up, fell, arrived, helped, drank），並涵蓋所有三張圖的事件。'
  }
];

export const listeningObjectiveQuestionsSet2 = [
  // --- Part 1 (5 Questions: Short Dialogues with 3 Choices) ---
  {
    id: 'l2_1-1',
    paper: 'listening',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 1: Which carriage should passengers board?',
    script: 'Station Guard: Are you looking for the train to Bristol? Passenger: Yes, my ticket says carriage four. Station Guard: Carriage four was taken off for repairs this morning. All passengers with carriage four tickets should now board carriage six instead. Passenger: Thank you, I will walk down to carriage six right away.',
    question: 'Which carriage should the passenger board?',
    choices: ['Carriage 4', 'Carriage 6', 'Carriage 8'],
    answer: 1,
    evidence: 'Station Guard states: "All passengers with carriage four tickets should now board carriage six instead."',
    explanationZh: '站務員說明原本的第四車廂在維修，持有第四車廂票的乘客請改上第六車廂（Carriage 6）。'
  },
  {
    id: 'l2_1-2',
    paper: 'listening',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 1: How much was the museum ticket?',
    script: 'Boy: Did you visit the dinosaur museum yesterday? Girl: Yes, it was brilliant! The full adult ticket is ten pounds, but because I had my school card, I only paid six pounds. My little brother got in for four pounds.',
    question: 'How much did the girl pay for her ticket?',
    choices: ['£4', '£6', '£10'],
    answer: 1,
    evidence: 'The girl says: "because I had my school card, I only paid six pounds."',
    explanationZh: '女孩憑學生卡付了 6 鎊（£6）。大人是 10 鎊，弟弟是 4 鎊。'
  },
  {
    id: 'l2_1-3',
    paper: 'listening',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 1: Which instrument does Leo practice today?',
    script: 'Mother: Leo, are you practicing the drums again? It is very loud! Leo: No, Mum, that was my friend Harry on video call. Today I am practicing my new acoustic guitar for the concert. Mother: That sounds much gentler!',
    question: 'Which instrument is Leo practicing today?',
    choices: ['The drums', 'The guitar', 'The piano'],
    answer: 1,
    evidence: 'Leo explains: "Today I am practicing my new acoustic guitar for the concert."',
    explanationZh: 'Leo 說明吵鬧的打鼓聲是朋友視訊，他今天自己練習的是木吉他（guitar）。'
  },
  {
    id: 'l2_1-4',
    paper: 'listening',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 1: What activity will the family do on Sunday?',
    script: 'Father: Shall we go sailing on the lake this Sunday? Daughter: The weather forecast says the wind will be too light for sailing. Why don’t we go hiking in the pine forest instead? Father: That’s a wonderful idea. Let’s pack our walking boots.',
    question: 'What activity will the family do on Sunday?',
    choices: ['Go sailing on the lake', 'Go hiking in the forest', 'Go swimming in the pool'],
    answer: 1,
    evidence: 'Daughter suggests: "Why don’t we go hiking in the pine forest instead? Father: That’s a wonderful idea."',
    explanationZh: '湖上風太小不適合帆船，父親同意女兒提議的去松樹林健行（hiking in the forest）。'
  },
  {
    id: 'l2_1-5',
    paper: 'listening',
    part: 1,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 1: Where did Chloe leave her sports water bottle?',
    script: 'Chloe: Dad, I can’t find my sports bottle. Did I leave it on the tennis court? Dad: No, I checked your sports bag and the court. Oh, look, you left it right beside your bicycle in the garage! Chloe: Ah, thank goodness!',
    question: 'Where did Chloe find her water bottle?',
    choices: ['On the tennis court', 'Inside her sports bag', 'In the garage beside her bicycle'],
    answer: 2,
    evidence: 'Dad finds it: "you left it right beside your bicycle in the garage!"',
    explanationZh: '爸爸在車庫的腳踏車旁邊找到水壺（In the garage beside her bicycle）。'
  },

  // --- Part 2 (5 Questions: Note-Taking / Gap Fill) ---
  // Monologue: Junior Cooking Workshop Notes
  {
    id: 'l2_2-6',
    paper: 'listening',
    part: 2,
    set: 2,
    format: 'textEntry',
    title: 'Part 2: Junior Cooking Workshop Notes',
    script: 'Chef: Welcome everyone! Let me share details about our upcoming Junior Cooking Workshop. The workshop will take place this Saturday, the fifteenth of October. We will begin at ten thirty in the morning sharp in Kitchen Hall C. This week, we will learn how to make traditional Italian pasta from fresh flour and eggs. Please make sure to bring your own clean apron. The total cost for the two-hour workshop is fourteen pounds, which includes all fresh ingredients and a recipe booklet to take home.',
    passage: 'JUNIOR COOKING WORKSHOP NOTES\nDay of workshop: Saturday\nStarting time: (26) _____ a.m.\nDish to cook: (27) _____ \nItem to bring: (28) _____ \nRoom: Kitchen Hall C\nPrice per student: £(29) _____ \nRegistration deadline: (30) _____',
    question: 'What is the starting time of the workshop? (e.g. 10.30)',
    accepted: ['10.30', '10:30', 'half past ten'],
    evidence: 'Chef announces: "We will begin at ten thirty in the morning sharp"',
    explanationZh: '大廚說明工作坊於早上 10:30 開始（ten thirty）。'
  },
  {
    id: 'l2_2-7',
    paper: 'listening',
    part: 2,
    set: 2,
    format: 'textEntry',
    title: 'Part 2: Junior Cooking Workshop Notes',
    script: '(See audio script for Question 6)',
    passage: 'JUNIOR COOKING WORKSHOP NOTES\nDish to cook: (27) _____',
    question: 'Which dish will students learn to cook?',
    accepted: ['pasta', 'italian pasta'],
    evidence: 'Chef states: "This week, we will learn how to make traditional Italian pasta"',
    explanationZh: '本週要學習製作的料理是義大利麵（pasta）。'
  },
  {
    id: 'l2_2-8',
    paper: 'listening',
    part: 2,
    set: 2,
    format: 'textEntry',
    title: 'Part 2: Junior Cooking Workshop Notes',
    script: '(See audio script for Question 6)',
    passage: 'JUNIOR COOKING WORKSHOP NOTES\nItem students must bring: (28) _____',
    question: 'What item must each student bring?',
    accepted: ['apron', 'an apron'],
    evidence: 'Chef advises: "Please make sure to bring your own clean apron."',
    explanationZh: '大廚提醒學員務必自備乾淨圍裙（apron）。'
  },
  {
    id: 'l2_2-9',
    paper: 'listening',
    part: 2,
    set: 2,
    format: 'textEntry',
    title: 'Part 2: Junior Cooking Workshop Notes',
    script: '(See audio script for Question 6)',
    passage: 'JUNIOR COOKING WORKSHOP NOTES\nPrice per student: £(29) _____',
    question: 'How much does the workshop cost per student in pounds?',
    accepted: ['14', 'fourteen'],
    evidence: 'Chef concludes: "The total cost for the two-hour workshop is fourteen pounds"',
    explanationZh: '工作坊費用為 14 鎊（fourteen / 14）。'
  },
  {
    id: 'l2_2-10',
    paper: 'listening',
    part: 2,
    set: 2,
    format: 'textEntry',
    title: 'Part 2: Junior Cooking Workshop Notes',
    script: 'Chef: If you wish to sign up, please give your registration form to Mrs Jenkins in the school office before Thursday afternoon at four o’clock.',
    passage: 'JUNIOR COOKING WORKSHOP NOTES\nRegistration day deadline: (30) _____',
    question: 'On which day must registration forms be handed in?',
    accepted: ['thursday'],
    evidence: 'Chef states: "please give your registration form to Mrs Jenkins in the school office before Thursday afternoon"',
    explanationZh: '報名表繳交截止日為星期四（Thursday）。'
  },

  // --- Part 3 (5 Questions: Longer Dialogue) ---
  // Dialogue: Ella and Marcus organising the School Charity Book Fair
  {
    id: 'l2_3-11',
    paper: 'listening',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 3: School Charity Book Fair',
    script: 'Ella: Hi Marcus, have you heard about our school charity book fair next month? Marcus: Yes, Ella! Mr Harris announced it yesterday. All the money raised will be used to buy new computers for the library. Ella: That’s fantastic, our old computers are so slow. Where will we put the stalls? Marcus: The sports hall was the original choice, but it is being painted. So we are setting up twenty tables in the central courtyard outside. Ella: Wonderful, fresh air will be great if it stays sunny! How many donated books do we have so far? Marcus: My class collected eighty novels, and year eight contributed another fifty books. Ella: That’s over a hundred books already! What price will each book be? Marcus: Most paperbacks will be just one pound each, though hardbacks with photos will cost three pounds. Ella: That’s very affordable for students. What can I help with? Marcus: We need colourful posters to advertise the event around the school corridors before Friday. Ella: I love painting, I’ll design three big posters tonight!',
    question: 'What will the money raised from the book fair buy?',
    choices: [
      'New story books for younger students',
      'New computers for the library',
      'Sports equipment for the playground'
    ],
    answer: 1,
    evidence: 'Marcus says: "All the money raised will be used to buy new computers for the library."',
    explanationZh: 'Marcus 說明募得的款項將全數用來購買圖書館的新電腦。'
  },
  {
    id: 'l2_3-12',
    paper: 'listening',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 3: School Charity Book Fair',
    script: '(See audio script for Question 11)',
    question: 'Where will the book stalls be located?',
    choices: [
      'Inside the school sports hall',
      'In the central courtyard outside',
      'Along the main front entrance'
    ],
    answer: 1,
    evidence: 'Marcus confirms: "The sports hall was the original choice, but it is being painted. So we are setting up twenty tables in the central courtyard outside."',
    explanationZh: '因為體育館在油漆粉刷，書攤改設在中庭花園戶外（central courtyard）。'
  },
  {
    id: 'l2_3-13',
    paper: 'listening',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 3: School Charity Book Fair',
    script: '(See audio script for Question 11)',
    question: 'How many books did Marcus’s class collect?',
    choices: ['50 books', '80 books', '130 books'],
    answer: 1,
    evidence: 'Marcus says: "My class collected eighty novels, and year eight contributed another fifty books."',
    explanationZh: 'Marcus 的班級收集了 80 本小說（eighty novels）。'
  },
  {
    id: 'l2_3-14',
    paper: 'listening',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 3: School Charity Book Fair',
    script: '(See audio script for Question 11)',
    question: 'How much will most paperback books cost?',
    choices: ['£1 each', '£2 each', '£3 each'],
    answer: 0,
    evidence: 'Marcus says: "Most paperbacks will be just one pound each, though hardbacks with photos will cost three pounds."',
    explanationZh: '平裝書一本只要 1 鎊（one pound each）。'
  },
  {
    id: 'l2_3-15',
    paper: 'listening',
    part: 3,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 3: School Charity Book Fair',
    script: '(See audio script for Question 11)',
    question: 'What task did Ella offer to do?',
    choices: [
      'Carry heavy boxes of books to the tables',
      'Count the money collected at the stalls',
      'Design colourful advertising posters'
    ],
    answer: 2,
    evidence: 'Ella offers: "I love painting, I’ll design three big posters tonight!"',
    explanationZh: 'Ella 喜歡畫畫，自告奮勇要設計宣傳海報（design colourful posters）。'
  },

  // --- Part 4 (5 Questions: Short Monologues & Dialogues) ---
  {
    id: 'l2_4-16',
    paper: 'listening',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 4: Boy talking about his new running trainers',
    script: 'Boy: My parents bought me these running shoes for my track team trials. My old trainers were heavy and hurt my toes on long runs. These new ones feel as light as feathers, which really helps me sprint faster on the track!',
    question: 'What does the boy like most about his new trainers?',
    choices: [
      'The bright modern colour',
      'How lightweight they feel',
      'How cheap they were in the shop'
    ],
    answer: 1,
    evidence: 'The boy emphasizes: "These new ones feel as light as feathers, which really helps me sprint faster"',
    explanationZh: '男孩特別稱讚新跑鞋輕如羽毛（light as feathers），非常輕便（lightweight）。'
  },
  {
    id: 'l2_4-17',
    paper: 'listening',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 4: Announcement at railway station',
    script: 'Announcer: Attention all passengers waiting for the eleven forty-five service to Manchester Piccadilly. Due to fallen tree branches on the track near Stockport after last night’s storm, this train is delayed by approximately twenty-five minutes. We apologise for the inconvenience.',
    question: 'Why is the Manchester train delayed?',
    choices: [
      'Bad storm weather today',
      'Tree branches on the railway track',
      'Too many passengers boarding'
    ],
    answer: 1,
    evidence: 'Announcer explains: "Due to fallen tree branches on the track near Stockport... this train is delayed"',
    explanationZh: '廣播指出是因為昨晚暴風雨後有樹枝倒在軌道上（fallen tree branches on the track）造成誤點。'
  },
  {
    id: 'l2_4-18',
    paper: 'listening',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 4: Two friends talking about an art gallery',
    script: 'Boy: What did you think of the landscape paintings in room two? Girl: The gallery guide said the artist spent five years in the Scottish mountains. I was amazed by how bright the blues and greens looked under the gallery lamps. It made the mountains look truly alive!',
    question: 'What impressed the girl most about the paintings?',
    choices: [
      'The vivid and bright colours',
      'The large size of the frames',
      'The cheap price of the exhibition guide'
    ],
    answer: 0,
    evidence: 'Girl notes: "I was amazed by how bright the blues and greens looked under the gallery lamps."',
    explanationZh: '女孩對燈光下明亮生動的藍綠色彩印象非常深刻（vivid and bright colours）。'
  },
  {
    id: 'l2_4-19',
    paper: 'listening',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 4: Girl talking about a wildlife documentary',
    script: 'Girl: My science teacher recommended watching that new documentary about ocean dolphins last night. At first, I thought an hour-long nature show might be slow, but seeing the dolphins coordinate their hunting underwater was surprisingly exciting and fun to watch!',
    question: 'How did the girl feel about the documentary?',
    choices: [
      'She found it surprisingly exciting.',
      'She thought it was too long and boring.',
      'She wished it showed land animals instead.'
    ],
    answer: 0,
    evidence: 'Girl concludes: "seeing the dolphins coordinate their hunting underwater was surprisingly exciting and fun to watch!"',
    explanationZh: '女孩原以為會沈悶，但看到海豚合作捕獵時覺得「出奇地精彩刺激」（surprisingly exciting）。'
  },
  {
    id: 'l2_4-20',
    paper: 'listening',
    part: 4,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 4: Teacher talking to her class',
    script: 'Teacher: Year seven, before we enter the national transport museum, please remember that this is a public building. Many other groups are here today. You must stay with your assigned partner at all times, and do not run between the old steam trains.',
    question: 'What is the teacher warning students to do?',
    choices: [
      'Take detailed notes on every steam engine',
      'Always stay together with their partner',
      'Buy their lunch before entering the building'
    ],
    answer: 1,
    evidence: 'Teacher instructs: "You must stay with your assigned partner at all times"',
    explanationZh: '老師告誡學生在參觀時必須全程和分配的搭檔在一起（stay together with their partner）。'
  },

  // --- Part 5 (5 Questions: Matching 5 People to 8 Options A–H) ---
  // Topic: Family members and their weekend volunteer jobs
  // People: Dad, Mum, Oliver, Jessica, Uncle David
  // Options:
  // A Walking rescue dogs
  // B Planting tree saplings
  // C Painting community fences
  // D Serving hot tea to elders
  // E Sorting recycled clothes
  // F Repairing library books
  // G Guiding nature trail visitors
  // H Baking bread for charity
  {
    id: 'l2_5-21',
    paper: 'listening',
    part: 5,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 5: Family Volunteer Jobs Matching',
    script: 'Aunt: It’s wonderful how your entire family helped at the community volunteer weekend, Megan! Megan: Yes! Everyone had a different job. My dad loves being out in nature, so he spent Saturday morning planting young oak saplings in the new community forest. Aunt: That will make the park so green in the future! What about your mum? Megan: Mum volunteered at the donation centre sorting bags of clean winter clothes for families in need. Aunt: Such important work! And your brother Oliver? Megan: Oliver loves animals, so he took shelter dogs for long runs around the meadow. Aunt: And your sister Jessica? Megan: Jessica loves reading, so she spent her afternoon carefully taping and repairing torn pages in old library books. Aunt: Wonderful! And your uncle David? Megan: Uncle David helped with maintenance—he repainted the wooden fences around the children’s playground with fresh green paint!',
    passage: 'Choices: A Walking rescue dogs, B Planting tree saplings, C Painting community fences, D Serving hot tea, E Sorting recycled clothes, F Repairing library books, G Guiding visitors, H Baking bread',
    question: 'Which volunteer job did Dad do?',
    choices: ['A (Walking rescue dogs)', 'B (Planting tree saplings)', 'C (Painting community fences)', 'D (Serving hot tea)', 'E (Sorting recycled clothes)', 'F (Repairing library books)', 'G (Guiding visitors)', 'H (Baking bread)'],
    answer: 1,
    evidence: 'Megan says: "My dad loves being out in nature, so he spent Saturday morning planting young oak saplings in the new community forest."',
    explanationZh: '爸爸在社區森林種植小樹苗（Planting tree saplings - 選項 B）。'
  },
  {
    id: 'l2_5-22',
    paper: 'listening',
    part: 5,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 5: Family Volunteer Jobs Matching',
    script: '(See audio script for Question 21)',
    passage: 'Choices: A Walking rescue dogs, B Planting tree saplings, C Painting community fences, D Serving hot tea, E Sorting recycled clothes, F Repairing library books, G Guiding visitors, H Baking bread',
    question: 'Which volunteer job did Mum do?',
    choices: ['A (Walking rescue dogs)', 'B (Planting tree saplings)', 'C (Painting community fences)', 'D (Serving hot tea)', 'E (Sorting recycled clothes)', 'F (Repairing library books)', 'G (Guiding visitors)', 'H (Baking bread)'],
    answer: 4,
    evidence: 'Megan says: "Mum volunteered at the donation centre sorting bags of clean winter clothes for families in need."',
    explanationZh: '媽媽在捐贈中心整理回收衣物（Sorting recycled clothes - 選項 E）。'
  },
  {
    id: 'l2_5-23',
    paper: 'listening',
    part: 5,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 5: Family Volunteer Jobs Matching',
    script: '(See audio script for Question 21)',
    passage: 'Choices: A Walking rescue dogs, B Planting tree saplings, C Painting community fences, D Serving hot tea, E Sorting recycled clothes, F Repairing library books, G Guiding visitors, H Baking bread',
    question: 'Which volunteer job did Oliver do?',
    choices: ['A (Walking rescue dogs)', 'B (Planting tree saplings)', 'C (Painting community fences)', 'D (Serving hot tea)', 'E (Sorting recycled clothes)', 'F (Repairing library books)', 'G (Guiding visitors)', 'H (Baking bread)'],
    answer: 0,
    evidence: 'Megan says: "Oliver loves animals, so he took shelter dogs for long runs around the meadow."',
    explanationZh: 'Oliver 帶收容所的小狗去散步慢跑（Walking rescue dogs - 選項 A）。'
  },
  {
    id: 'l2_5-24',
    paper: 'listening',
    part: 5,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 5: Family Volunteer Jobs Matching',
    script: '(See audio script for Question 21)',
    passage: 'Choices: A Walking rescue dogs, B Planting tree saplings, C Painting community fences, D Serving hot tea, E Sorting recycled clothes, F Repairing library books, G Guiding visitors, H Baking bread',
    question: 'Which volunteer job did Jessica do?',
    choices: ['A (Walking rescue dogs)', 'B (Planting tree saplings)', 'C (Painting community fences)', 'D (Serving hot tea)', 'E (Sorting recycled clothes)', 'F (Repairing library books)', 'G (Guiding visitors)', 'H (Baking bread)'],
    answer: 5,
    evidence: 'Megan says: "Jessica loves reading, so she spent her afternoon carefully taping and repairing torn pages in old library books."',
    explanationZh: 'Jessica 在圖書館修補破損的書本頁面（Repairing library books - 選項 F）。'
  },
  {
    id: 'l2_5-25',
    paper: 'listening',
    part: 5,
    set: 2,
    format: 'multipleChoice',
    title: 'Part 5: Family Volunteer Jobs Matching',
    script: '(See audio script for Question 21)',
    passage: 'Choices: A Walking rescue dogs, B Planting tree saplings, C Painting community fences, D Serving hot tea, E Sorting recycled clothes, F Repairing library books, G Guiding visitors, H Baking bread',
    question: 'Which volunteer job did Uncle David do?',
    choices: ['A (Walking rescue dogs)', 'B (Planting tree saplings)', 'C (Painting community fences)', 'D (Serving hot tea)', 'E (Sorting recycled clothes)', 'F (Repairing library books)', 'G (Guiding visitors)', 'H (Baking bread)'],
    answer: 2,
    evidence: 'Megan says: "Uncle David helped with maintenance—he repainted the wooden fences around the children’s playground with fresh green paint!"',
    explanationZh: '大衛叔叔替兒童遊樂場周圍的木頭圍籬重新油漆上色（Painting community fences - 選項 C）。'
  }
];

export const speakingExamPartsSet2 = [
  {
    id: 'spk2-1',
    set: 2,
    part: 1,
    title: 'Part 1: Personal Questions & Daily Life (Set 2)',
    timing: '3–4 minutes',
    instructions: 'The examiner will ask you individual questions about your hometown, seasons, animals, and hobbies.',
    phases: [
      {
        phase: 'Phase 1: Getting to Know You',
        questions: [
          'What is your name and how do you spell your family name?',
          'Do you live in a big city or in a small town?',
          'Which day of the school week do you like best? Why?'
        ],
        sampleAnswers: [
          'My name is Oliver and my surname is Chen, C-H-E-N.',
          'I live in a bustling town near the hills with my parents and sister.',
          'I like Friday best because we have art and music lessons, and the weekend starts soon!'
        ]
      },
      {
        phase: 'Phase 2: Everyday Life & Hobbies',
        questions: [
          'Which season of the year do you enjoy most? Why?',
          'What do you like doing on a sunny afternoon?',
          'Tell me about an animal that you like. Why do you like it?'
        ],
        sampleAnswers: [
          'I enjoy autumn most because the weather is pleasantly cool and the forest leaves turn orange.',
          'On sunny afternoons, I love skateboarding in the park with my classmates.',
          'I really like dolphins because they are intelligent, friendly, and swim gracefully in the sea.'
        ]
      }
    ],
    stems: [
      'I live in ... with ...',
      'I like ... best because ...',
      'On sunny days, I usually ...',
      'My favourite animal is ... because it is ...'
    ],
    explanationZh: 'Speaking Part 1 評量日常自我表達。回答時多用 because、and 補充理由或細節，每題維持 2-3 句流暢回答即可。'
  },
  {
    id: 'spk2-2',
    set: 2,
    part: 2,
    title: 'Part 2: Collaborative Discussion with Partner (Set 2)',
    timing: '5–6 minutes',
    instructions: 'Discuss different holiday destinations with your partner. Say which places you would like to visit and give reasons. Ask your partner what they think!',
    situation: 'Here are some pictures of different holiday destinations: camping in a forest tent, staying at a seaside beach hotel, exploring an interactive science museum, visiting a busy capital city, and spending time on a traditional farm. Talk together about whether you like these holiday ideas.',
    activities: [
      {name: 'Camping in a forest', stem: 'Do you like camping in a forest? I think it is adventurous because you sleep under the stars.'},
      {name: 'Seaside beach hotel', stem: 'Do you enjoy staying near the beach? I love swimming in the sea and eating ice cream.'},
      {name: 'Science museum trip', stem: 'Do you like interactive science centres? It is fun because you can try exciting experiments.'},
      {name: 'Big capital city', stem: 'Would you like to explore a big city? There are tall buildings, museums, and huge shops.'},
      {name: 'Animal farm holiday', stem: 'Do you like visiting an animal farm? It is nice because you can feed friendly sheep and horses.'}
    ],
    partnerPrompts: [
      'Do you agree with me?',
      'Which holiday would you prefer?',
      'What about you? Do you enjoy nature holidays?'
    ],
    sampleDialogue: 'Candidate A: Do you enjoy camping in the forest?\nCandidate B: Yes, I love camping because roasting marshmallows over a campfire is so exciting! What about you?\nCandidate A: I prefer staying at a beach hotel because I love swimming in the warm ocean.\nCandidate B: That sounds wonderful! Do you think visiting an animal farm is fun for teenagers?\nCandidate A: Yes, I like feeding baby animals. Do you agree?\nCandidate B: Absolutely, it is very relaxing.',
    explanationZh: 'Speaking Part 2 著重於「與搭檔的互動交談」：提出觀點（I prefer...）、說明原因（because...）、詢問對方想法（What about you? / Do you agree?）。'
  }
];
