// Original A2-level practice material. Not official Cambridge examination questions.
import {vocabularyBank} from './vocabulary-bank.mjs';
const legacyTopics=['學校與學習','時間與日常','食物與飲料','旅行與交通','休閒與運動','自然與天氣'];
const rows=[
 ['subject','科目','My favourite subject is English.','我最喜歡的科目是英文。',0,'noun'],
 ['library','圖書館','I borrow books from the library.','我從圖書館借書。',0,'noun'],
 ['timetable','課表；時間表','Check your timetable before school.','上學前看看你的課表。',0,'noun'],
 ['practice','練習','I need more practice before the test.','考試前我需要多練習。',0,'noun'],
 ['borrow','借入','Can I borrow your pencil?','我可以借你的鉛筆嗎？',0,'verb'],
 ['homework','家庭作業','I do my homework after dinner.','我晚餐後做作業。',0,'noun'],
 ['usually','通常','I usually get up at seven.','我通常七點起床。',1,'adverb'],
 ['neighbour','鄰居','Our neighbour has a friendly dog.','我們鄰居有一隻友善的狗。',1,'noun'],
 ['appointment','預約','I have an appointment at three.','我三點有個預約。',1,'noun'],
 ['tidy','整齊的','Please keep your room tidy.','請保持你的房間整齊。',1,'adjective'],
 ['remember','記得','Remember to bring your coat.','記得帶你的外套。',1,'verb'],
 ['message','訊息','I sent a message to my friend.','我傳了一則訊息給朋友。',1,'noun'],
 ['receipt','收據','Keep the receipt after you pay.','付錢後保留收據。',2,'noun'],
 ['customer','顧客','The customer bought two apples.','那位顧客買了兩顆蘋果。',2,'noun'],
 ['delicious','美味的','This soup is delicious.','這碗湯很好喝。',2,'adjective'],
 ['enough','足夠的','We have enough food for everyone.','我們有足夠的食物給每個人。',2,'determiner'],
 ['cheap','便宜的','These shoes are quite cheap.','這雙鞋相當便宜。',2,'adjective'],
 ['menu','菜單','Could we see the menu, please?','可以請你給我們看菜單嗎？',2,'noun'],
 ['journey','旅程','The journey took two hours.','這趟旅程花了兩小時。',3,'noun'],
 ['suitcase','行李箱','My clothes are in my suitcase.','我的衣服在行李箱裡。',3,'noun'],
 ['platform','月台','Our train leaves from platform four.','我們的火車從第四月台出發。',3,'noun'],
 ['straight','筆直地','Go straight on and turn left.','直走，然後左轉。',3,'adverb'],
 ['arrive','抵達','We arrive at the station at nine.','我們九點抵達車站。',3,'verb'],
 ['ticket','票','I bought a ticket for the bus.','我買了一張公車票。',3,'noun'],
 ['adventure','冒險','Our camping trip was a great adventure.','我們的露營旅行是一次很棒的冒險。',4,'noun'],
 ['competition','比賽','She won the swimming competition.','她贏了游泳比賽。',4,'noun'],
 ['invite','邀請','I want to invite you to my party.','我想邀請你來我的派對。',4,'verb'],
 ['hobby','嗜好','My hobby is taking photos.','我的嗜好是拍照。',4,'noun'],
 ['prefer','比較喜歡','I prefer cycling to running.','比起跑步，我比較喜歡騎腳踏車。',4,'verb'],
 ['concert','音樂會','We went to a concert on Saturday.','我們星期六去聽音樂會。',4,'noun'],
 ['forest','森林','We walked through the forest.','我們走過森林。',5,'noun'],
 ['weather','天氣','The weather is warm today.','今天天氣暖和。',5,'noun'],
 ['island','島嶼','There is a small island in the lake.','湖裡有一座小島。',5,'noun'],
 ['dangerous','危險的','It is dangerous to swim here.','在這裡游泳很危險。',5,'adjective'],
 ['cloudy','多雲的','It was cloudy in the morning.','早上天氣多雲。',5,'adjective'],
 ['recycle','回收','We recycle paper and bottles.','我們回收紙張和瓶子。',5,'verb']
];
const detailedWords=new Map(rows.map(([word,zh,example,translation,topic,pos])=>[word.toLowerCase(),{word,zh,example,translation,topic:legacyTopics[topic],pos}]));
export const vocabulary=vocabularyBank.map((entry,i)=>({id:`v${i+1}`,example:'',translation:'',...entry,...(detailedWords.get(entry.word.toLowerCase())||{})}));
export const topics=[...new Set(vocabulary.map(v=>v.topic))];
export const vocabQuestions=vocabulary.map((v,i)=>{
 const distractors=[];
 for(let offset=1;distractors.length<2;offset+=37){
  const candidate=vocabulary[(i+offset)%vocabulary.length];
  if(candidate.zh!==v.zh&&!distractors.some(item=>item.zh===candidate.zh))distractors.push(candidate);
 }
 const choices=distractors.map(w=>w.zh);const answer=i%3;choices.splice(answer,0,v.zh);
 return {id:`vq${i+1}`,category:'vocabulary',topic:v.topic,question:`What does “${v.word}” mean?`,passage:v.example||`A2 Key vocabulary · ${v.topic}`,choices,answer,explanation:v.example?`${v.word} 是「${v.zh}」。例句意思是：${v.translation}`:`${v.word} 是「${v.zh}」，屬於「${v.topic}」主題。`};
});
export const reading=[
 {id:'r1',topic:'校園公告',passage:'SCHOOL LIBRARY\nPlease return all books by Friday. The library will be closed next week for painting.',question:'What should students do?',choices:['Bring their books back before next week.','Paint the library on Friday.','Borrow books from the library next week.'],answer:0,explanation:'return 表示「歸還」，by Friday 是「最晚星期五」。下週圖書館因油漆而關閉，所以要先還書。'},
 {id:'r2',topic:'朋友訊息',passage:'Hi Mia,\nThe film starts at 4.30, not 4.00. Let’s meet outside the cinema at 4.15.\nLucy',question:'When should Mia meet Lucy?',choices:['At 4.00.','At 4.15.','At 4.30.'],answer:1,explanation:'4.30 是電影開始的時間；Let’s meet ... at 4.15 才是碰面的時間。留意題目問的是 meet。'},
 {id:'r3',topic:'商店告示',passage:'TODAY ONLY\nBuy two sandwiches and get a drink free.',question:'How can you get a free drink?',choices:['Buy any drink today.','Buy one sandwich.','Buy two sandwiches today.'],answer:2,explanation:'Buy two sandwiches 是獲得免費飲料的條件，Today only 表示優惠只有今天。'},
 {id:'r4',topic:'社團通知',passage:'Hi everyone,\nIt’s raining, so football practice will be in the sports hall today. Please bring clean shoes.\nMr Green',question:'Why is football practice moving inside?',choices:['Because the weather is bad.','Because the sports hall is new.','Because the students need new shoes.'],answer:0,explanation:'It’s raining, so ... 表示「因為下雨，所以……」。clean shoes 是要帶的物品，不是更換地點的原因。'},
 {id:'r5',topic:'生活短文',passage:'On Saturdays, Emma helps her uncle in his café. She starts at nine and makes sandwiches. At twelve, another helper arrives, and Emma goes home for lunch. She enjoys meeting the customers.',question:'What does Emma like about working at the café?',choices:['Eating lunch with her uncle.','Meeting the people who come in.','Starting work late.'],answer:1,explanation:'最後一句 enjoys meeting the customers，指的是她喜歡認識來店裡的顧客。'},
 {id:'r6',topic:'旅遊短文',passage:'Ben wanted to visit the beach, but his sister wanted to see the castle. Their parents chose the castle because it was too cold to swim. Ben was surprised: the castle was really interesting!',question:'How did Ben feel about the castle after visiting?',choices:['He wished he had stayed at home.','He thought it was too cold inside.','He liked it more than he expected.'],answer:2,explanation:'Ben was surprised 和 really interesting 表示他發現城堡比原先預期的有趣。'},
 {id:'r7',topic:'選字填空',passage:'I didn’t take the bus yesterday. I _____ to school with my brother.',question:'Choose the correct word.',choices:['walked','walk','walking'],answer:0,explanation:'yesterday 是過去時間，動詞用過去式 walked。前句的 didn’t 只影響前句的 take。'},
 {id:'r8',topic:'選字填空',passage:'This bag is _____ than that one, so I can carry it easily.',question:'Choose the correct word.',choices:['lightest','lighter','light'],answer:1,explanation:'看到 than，表示兩者比較。light 的比較級是 lighter，意思是「比較輕」。'},
 {id:'r9',topic:'電子郵件',passage:'Dear Alex,\nThanks for inviting me to your party. I can come, but I’ll be late because my music lesson finishes at six. I’ll bring some juice.\nSam',question:'Why will Sam arrive late?',choices:['He needs to buy some juice.','He cannot find the party.','He has a music lesson first.'],answer:2,explanation:'because 後面直接交代原因：音樂課六點才結束。帶果汁是另一件事。'},
 {id:'r10',topic:'場所公告',passage:'SWIMMING POOL\nChildren under 12 must be with an adult.',question:'Who needs an adult to go with them?',choices:['An eleven-year-old child.','A thirteen-year-old child.','Every visitor.'],answer:0,explanation:'under 12 表示「未滿十二歲」。十一歲符合條件，十三歲則不在此限制內。'},
 {id:'r11',topic:'生活短文',passage:'Lily’s old bike was too small, so she saved money for a new one. She washed her neighbours’ cars for three months. In July, she finally bought a blue bike from the shop near her school.',question:'How did Lily get money for her new bike?',choices:['Her school gave it to her.','She washed cars.','She sold her old bike.'],answer:1,explanation:'She washed her neighbours’ cars 說明她透過幫鄰居洗車來存錢。文中沒有提到賣舊車。'},
 {id:'r12',topic:'選字填空',passage:'We haven’t got _____ milk. Can you buy some on your way home?',question:'Choose the correct word.',choices:['many','a','any'],answer:2,explanation:'否定句常用 any；milk 是不可數名詞，不能直接用 a 或 many 修飾。'}
].map(q=>({...q,category:'reading'}));
export const listening=[
 {id:'l1',topic:'碰面時間',script:'Girl: Shall we meet at two o’clock? Boy: I have lunch with my family then. How about half past two? Girl: That’s fine. See you outside the library.',question:'What time will they meet?',choices:['2.00','2.30','3.30'],answer:1,explanation:'一開始提到 two o’clock，但後來改為 half past two（兩點半），女孩也同意了。'},
 {id:'l2',topic:'購物價格',script:'Customer: How much is this T-shirt? Shop assistant: It was fifteen pounds, but today it’s twelve pounds. Customer: Great. I’ll take it.',question:'How much does the T-shirt cost today?',choices:['£15','£20','£12'],answer:2,explanation:'was fifteen pounds 是原價，today it’s twelve pounds 才是今天的價格。'},
 {id:'l3',topic:'交通方式',script:'Boy: Did you come to school by bus today, Anna? Girl: No, my dad drove me. It was raining too much to ride my bike.',question:'How did Anna get to school?',choices:['By car.','By bus.','By bike.'],answer:0,explanation:'my dad drove me 表示爸爸開車載她。公車是男孩的猜測，腳踏車則因下雨沒有騎。'},
 {id:'l4',topic:'週末活動',script:'Girl: Did you go swimming on Sunday, Jack? Boy: The pool was closed. I played tennis with my cousin instead. Next Sunday, we’re going swimming.',question:'What did Jack do last Sunday?',choices:['He went swimming.','He played tennis.','He watched a film.'],answer:1,explanation:'played tennis 是上個星期日做的事；swimming 是原定活動，也是下週的計畫。'},
 {id:'l5',topic:'地點指引',script:'Girl: Excuse me. Where is the bookshop? Man: Go past the bank. The bookshop is on your left, opposite the supermarket.',question:'What is opposite the bookshop?',choices:['The bank.','The school.','The supermarket.'],answer:2,explanation:'opposite the supermarket 意思是「在超市對面」。bank 是途中會經過的地標。'},
 {id:'l6',topic:'校外教學',script:'Teacher: For tomorrow’s trip, please bring a sandwich and a bottle of water. You don’t need any money because the museum is free. Meet at the school gate at nine.',question:'What should students bring to eat?',choices:['A sandwich.','Some fruit.','A cake.'],answer:0,explanation:'老師說 bring a sandwich and a bottle of water。問題問吃的東西，所以選三明治。'},
 {id:'l7',topic:'天氣預報',script:'Presenter: It will be cloudy this morning, but the sun will come out after lunch. There won’t be any rain today.',question:'What will the weather be like this afternoon?',choices:['Rainy.','Sunny.','Snowy.'],answer:1,explanation:'the sun will come out after lunch 表示午餐後會出太陽。cloudy 是早上的天氣。'},
 {id:'l8',topic:'生日禮物',script:'Boy: What did your grandparents give you for your birthday? Girl: I asked for a watch, but they bought me a camera. I’m really happy because I love taking photos.',question:'What did the girl get from her grandparents?',choices:['A watch.','A phone.','A camera.'],answer:2,explanation:'asked for a watch 是她原本想要的；bought me a camera 才是實際收到的禮物。'},
 {id:'l9',topic:'社團安排',script:'Teacher: The art club usually meets on Tuesday. This week, our room is being cleaned, so we’ll meet on Thursday instead. The time is still four o’clock.',question:'When is the art club meeting this week?',choices:['Thursday.','Tuesday.','Wednesday.'],answer:0,explanation:'usually ... Tuesday 是平常的安排；this week 改成 Thursday，注意 instead 表示「改為」。'},
 {id:'l10',topic:'遺失物品',script:'Girl: I can’t find my keys. Boy: Are they in your coat pocket? Girl: No, I’ve checked. Oh, there they are, under my notebook on the kitchen table.',question:'Where are the girl’s keys?',choices:['In her coat.','Under her notebook.','In her school bag.'],answer:1,explanation:'最後找到的位置是 under my notebook on the kitchen table。外套口袋已經找過，沒有找到。'}
].map(q=>({...q,category:'listening'}));
export const writing=[
 {id:'w1',title:'邀朋友一起野餐',type:'短訊息',min:25,prompt:'Write an email to your English friend, Alex. Invite Alex to a picnic.',points:['Say when the picnic is.','Say where you will meet.','Tell Alex what to bring.'],hints:['說明野餐的日期或時間。','告訴 Alex 在哪裡碰面。','請 Alex 帶一樣東西。'],sample:'Hi Alex,\nWould you like to have a picnic with me on Saturday? Let’s meet at the park entrance at eleven. Please bring a sandwich and some water. See you there!\nLucy',tip:'先回答三個重點，再檢查時間、地點和拼字。'},
 {id:'w2',title:'介紹你喜歡的社團',type:'短訊息',min:25,prompt:'Your English friend, Sam, wants to join a club. Write an email about your school club.',points:['Say which club you go to.','Say when the club meets.','Explain why you like it.'],hints:['介紹你參加的社團。','說明社團活動時間。','解釋你喜歡它的原因。'],sample:'Hi Sam,\nI go to the art club at school. We meet every Wednesday at four o’clock. I like it because I can paint with my friends. Would you like to come with me?\nBest wishes,\nKim',tip:'用 because 讓喜歡的理由更完整。'},
 {id:'w3',title:'一次難忘的出遊',type:'故事暖身',min:35,prompt:'Write a short story using these three moments. This is a text-based warm-up for story writing, not an official picture task.',points:['Tom and his sister go to the park with a ball.','The ball lands in a tree.','Their dad helps them get the ball back.'],hints:['先介紹人物和地點。','描述球卡在樹上的問題。','交代爸爸如何幫忙，並寫出結尾。'],sample:'Last Sunday, Tom and his sister went to the park. They played with a red ball. Suddenly, the ball landed in a tree. Their dad was tall, so he got it down for them. They were happy and played again.',tip:'用過去式描述故事，並用 Suddenly、Then 或 Finally 連接事件。'},
 {id:'w4',title:'回覆朋友的拜訪',type:'短訊息',min:25,prompt:'Your English friend, Pat, is visiting your town. Write an email to Pat.',points:['Suggest a place to visit.','Say how you can get there.','Say what you can do there.'],hints:['推薦一個參觀的地方。','說明交通方式。','介紹可以一起做的活動。'],sample:'Hi Pat,\nLet’s visit the science museum on Saturday. We can take the number six bus from my house. At the museum, we can learn about space and try some interesting games. I think you’ll enjoy it!\nLove,\nAmy',tip:'可以使用 Let’s ... 和 We can ... 提出建議。'}
];
export const speaking=[
 {id:'s1',title:'聊聊學校',topic:'個人問答',question:'What is your favourite subject at school? Why?',zh:'你最喜歡哪個學校科目？為什麼？',follow:'When do you have this subject?',sample:'My favourite subject is English because I enjoy learning new words. I have English on Mondays and Thursdays.',stems:['My favourite subject is ...','I like it because ...']},
 {id:'s2',title:'我的週末',topic:'個人問答',question:'What do you usually do at the weekend?',zh:'你週末通常做什麼？',follow:'Who do you spend time with?',sample:'I usually ride my bike in the park with my dad. Sometimes I visit my grandparents and have lunch with them.',stems:['I usually ...','Sometimes I ...']},
 {id:'s3',title:'喜歡的食物',topic:'個人問答',question:'What food do you like? Can you cook it?',zh:'你喜歡什麼食物？你會做嗎？',follow:'Who usually cooks in your family?',sample:'I like noodles with vegetables. I can cook simple noodles, but my mum usually helps me. They are delicious!',stems:['I really like ...','I can / can’t cook ...']},
 {id:'s4',title:'放學後的活動',topic:'偏好討論',question:'Do you prefer reading books or playing sports after school? Why?',zh:'放學後，你比較喜歡看書還是運動？為什麼？',follow:'Ask your partner: What about you?',sample:'I prefer playing sports because I like being outside. I often play basketball with my friends. What about you?',stems:['I prefer ... because ...','What about you?']},
 {id:'s5',title:'旅行的選擇',topic:'偏好討論',question:'Would you like to visit the beach or the mountains? Why?',zh:'你想去海邊還是山上？為什麼？',follow:'What would you like to do there?',sample:'I would like to visit the beach because I love swimming. I’d also like to build a sandcastle with my sister.',stems:['I would like to visit ...','I’d like to ...']},
 {id:'s6',title:'住的地方',topic:'個人問答',question:'Tell me about the place where you live.',zh:'說說你住的地方。',follow:'What do you like about your town?',sample:'I live in a town near the sea. There is a park next to my home. I like it because I can walk there with my family.',stems:['I live in ...','There is / are ...']},
 {id:'s7',title:'上次的假日',topic:'個人問答',question:'What did you do last Sunday?',zh:'你上個星期日做了什麼？',follow:'Did you enjoy it? Why?',sample:'Last Sunday, I went to the cinema with my cousin. We watched a funny film. I enjoyed it because we laughed a lot.',stems:['Last Sunday, I ...','I enjoyed it because ...']},
 {id:'s8',title:'一起挑禮物',topic:'偏好討論',question:'Is a book or a game a better birthday present for a friend? Why?',zh:'送朋友生日禮物，書還是遊戲比較好？為什麼？',follow:'Ask your partner: Do you agree?',sample:'I think a game is a good present because we can play it together. My friend likes board games. Do you agree?',stems:['I think ... is a good present.','Do you agree?']}
];
export const questions=[...vocabQuestions,...reading,...listening];
