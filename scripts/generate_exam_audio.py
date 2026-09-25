import os
import asyncio
import edge_tts

BASE_DIR = os.path.join(os.path.dirname(__file__), "../dist/audio")
SPEAKING_DIR = os.path.join(BASE_DIR, "speaking")
LISTENING_DIR = os.path.join(BASE_DIR, "listening")

os.makedirs(SPEAKING_DIR, exist_ok=True)
os.makedirs(LISTENING_DIR, exist_ok=True)

# Ryan: Authoritative, calm, clear British male examiner (standard RP)
VOICE_EXAMINER = "en-GB-RyanNeural"
# Maisie: Natural, bright British student/candidate
VOICE_CANDIDATE = "en-GB-MaisieNeural"
# Sonia: Clear British standard RP
VOICE_NARRATOR = "en-GB-SoniaNeural"

# Speaking Exam Part 1
SPEAKING_P1 = [
    # Phase 1
    ("p1-q1", "What is your name and how old are you?", VOICE_EXAMINER),
    ("p1-s1", "My name is Mei-Ling and I am twelve years old.", VOICE_CANDIDATE),
    ("p1-q2", "Where do you live? Do you live in a house or a flat?", VOICE_EXAMINER),
    ("p1-s2", "I live in Taipei in a flat near a beautiful park.", VOICE_CANDIDATE),
    ("p1-q3", "Tell me about your school. What is your favourite subject and why?", VOICE_EXAMINER),
    ("p1-s3", "My school has a large sports field. My favourite subject is Science because we do fun experiments.", VOICE_CANDIDATE),
    # Phase 2
    ("p1-q4", "What do you usually do on Saturday mornings?", VOICE_EXAMINER),
    ("p1-s4", "I usually ride my bicycle with my father or read library books.", VOICE_CANDIDATE),
    ("p1-q5", "What food do you enjoy eating with your family?", VOICE_EXAMINER),
    ("p1-s5", "I enjoy eating dumplings and hot soup with my family on Sunday evenings.", VOICE_CANDIDATE),
    ("p1-q6", "Tell me about your best friend. What do you like doing together?", VOICE_EXAMINER),
    ("p1-s6", "My best friend is Kevin. We both enjoy playing basketball and drawing comics together.", VOICE_CANDIDATE),
]

# Speaking Exam Part 2
SPEAKING_P2 = [
    ("p2-situation", "Now, in this part of the test you are going to talk together. Here are some pictures of different after-school activities: playing football, learning the guitar, reading books, painting pictures, and playing computer games. Talk together about whether you like these activities.", VOICE_EXAMINER),
    ("p2-act-1", "Do you like playing football? I think it is exciting because you play in a team.", VOICE_CANDIDATE),
    ("p2-act-2", "Do you like learning a musical instrument? I think it is relaxing.", VOICE_CANDIDATE),
    ("p2-act-3", "Do you enjoy reading adventure books? It helps me learn new words.", VOICE_CANDIDATE),
    ("p2-act-4", "Do you like painting? It allows me to be creative.", VOICE_CANDIDATE),
    ("p2-act-5", "Do you play video games? I enjoy playing strategy games with friends.", VOICE_CANDIDATE),
    ("p2-dialogue", "Candidate A: Do you like playing football after school? Candidate B: Yes, I love football because I can run outside with my friends. What about you? Candidate A: I prefer playing the guitar because it is peaceful at home. Candidate B: Do you think painting pictures is interesting? Candidate A: Yes, I like painting animals. Do you agree? Candidate B: I agree, it is very relaxing.", VOICE_NARRATOR),
]

# Bilingual Study Speaking (s1 - s8)
BILINGUAL_SPEAKING = [
    ("bilingual-s1-q", "What is your favourite subject at school? Why?", VOICE_EXAMINER),
    ("bilingual-s1-s", "My favourite subject is English because I enjoy learning new words. I have English on Mondays and Thursdays.", VOICE_CANDIDATE),
    ("bilingual-s2-q", "What do you usually do at the weekend?", VOICE_EXAMINER),
    ("bilingual-s2-s", "I usually ride my bike in the park with my dad. Sometimes I visit my grandparents and have lunch with them.", VOICE_CANDIDATE),
    ("bilingual-s3-q", "What food do you like? Can you cook it?", VOICE_EXAMINER),
    ("bilingual-s3-s", "I like noodles with vegetables. I can cook simple noodles, but my mum usually helps me. They are delicious!", VOICE_CANDIDATE),
    ("bilingual-s4-q", "Do you prefer reading books or playing sports after school? Why?", VOICE_EXAMINER),
    ("bilingual-s4-s", "I prefer playing sports because I like being outside. I often play basketball with my friends. What about you?", VOICE_CANDIDATE),
    ("bilingual-s5-q", "Would you like to visit the beach or the mountains? Why?", VOICE_EXAMINER),
    ("bilingual-s5-s", "I would like to visit the beach because I love swimming. I’d also like to build a sandcastle with my sister.", VOICE_CANDIDATE),
    ("bilingual-s6-q", "Tell me about the place where you live.", VOICE_EXAMINER),
    ("bilingual-s6-s", "I live in a town near the sea. There is a park next to my home. I like it because I can walk there with my family.", VOICE_CANDIDATE),
    ("bilingual-s7-q", "What did you do last Sunday?", VOICE_EXAMINER),
    ("bilingual-s7-s", "Last Sunday, I went to the cinema with my cousin. We watched a funny film. I enjoyed it because we laughed a lot.", VOICE_CANDIDATE),
    ("bilingual-s8-q", "Is a book or a game a better birthday present for a friend? Why?", VOICE_EXAMINER),
    ("bilingual-s8-s", "I think a game is a good present because we can play it together. My friend likes board games. Do you agree?", VOICE_CANDIDATE),
]

# Official Exam Listening
EXAM_LISTENING = [
    ("exam-l-p1-q1", "Boy: Excuse me, does the next train to Oxford leave at quarter to three? Woman: It was scheduled for two forty-five, but there is a ten-minute delay today. It will depart at quarter to four? No, sorry, at five to three. Boy: Five to three. Thank you!", VOICE_NARRATOR),
    ("exam-l-p1-q2", "Girl: Mr Henderson, how much do we need to pay for the museum visit? Teacher: The bus ticket is five pounds and the museum entry is normally ten pounds. But because we are a school group, the museum gives us half price. So the total is ten pounds altogether. Girl: Okay, ten pounds. I will bring the money tomorrow.", VOICE_NARRATOR),
    ("exam-l-p1-q3", "Girl: Hi Oliver! Are you still playing the guitar in the school orchestra? Boy: I stopped playing the guitar last term because my fingers hurt. I tried the trumpet for two weeks, but I didn’t like it. Now I play the drums and love it! Girl: Wow, that sounds exciting!", VOICE_NARRATOR),
    ("exam-l-p1-q4", "Man: The weather report says Saturday will be windy with heavy rain throughout the morning. However, by Sunday, the clouds will clear completely and we will enjoy bright, warm sunshine all day long. Perfect for a walk in the hills!", VOICE_EXAMINER),
    ("exam-l-p1-q5", "Dad: Grace, have you seen your smartphone? It’s not on the kitchen counter. Grace: Oh dear! I thought I left it in my jacket pocket, but then I remember taking it out to check the time while doing homework at my bedroom desk. That’s where it must be!", VOICE_NARRATOR),
    ("exam-l-p2-q6", "Librarian: Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!", VOICE_NARRATOR),
    ("exam-l-p3-q11", "Chloe: Hi Ben! Are you going to enter the school science competition this year? Ben: Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car. Chloe: Wow, that’s clever! Who is working with you? Ben: I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me. Chloe: Where do you plan to prepare your project? Ben: Toby’s garage is too cold, so we will use my kitchen table on Saturdays. Chloe: When do we have to hand in our projects? Ben: The teacher said Wednesday the 18th is the final deadline, not Friday the 20th. Chloe: And what is the first prize? Ben: The winner receives a brand new electronic tablet!", VOICE_NARRATOR),
    ("exam-l-p4-q16", "Boy: My aunt bought me this winter coat for my birthday. The green colour is really nice and it has lots of useful pockets for my phone and keys. But it is made of such heavy wool that it feels uncomfortable to wear when I ride my bicycle to school. I might ask to exchange it for a lighter one.", VOICE_NARRATOR),
    ("exam-l-p4-q17", "Announcer: Attention all passengers on platform two. The eleven-fifteen service to Manchester Piccadilly has been cancelled due to fallen branches on the track near Crewe. Passengers holding tickets may board the eleven-forty-five express on platform four without extra charge.", VOICE_EXAMINER),
    ("exam-l-p4-q18", "Girl: Did you have a good time at Lucas’s party on Saturday? Boy: The music was fantastic and the food was delicious. But there were over forty people packed into his tiny living room, so nobody could even sit down. It was way too crowded. Girl: Oh, I see what you mean!", VOICE_NARRATOR),
    ("exam-l-p4-q19", "Girl: I just finished watching the mystery movie you recommended. The actors were brilliant and the scenery in the mountains looked stunning. But the ending made no sense at all—they never explained who took the jewels! It was rather disappointing.", VOICE_CANDIDATE),
    ("exam-l-p4-q20", "Teacher: Class, quiet please! You all did very well on your history test yesterday. However, several students forgot to write their names on the question sheets. Please remember that if there is no name, I cannot record your grade into the school system!", VOICE_EXAMINER),
    ("exam-l-p5-q21", "Dad: How was the school hobby exhibition, Emma? Emma: It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water! Dad: And your sister Ella? Emma: Ella loves acting, so she joined the drama workshop. Dad: That fits her personality! What about your best friend Max? Emma: Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments. Dad: Great! And your cousin Holly? Emma: Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!", VOICE_NARRATOR),
]

# Bilingual Study Listening
BILINGUAL_LISTENING = [
    ("bilingual-l1", "Girl: Shall we meet at two o’clock? Boy: I have lunch with my family then. How about half past two? Girl: That’s fine. See you outside the library.", VOICE_NARRATOR),
    ("bilingual-l2", "Customer: How much is this T-shirt? Shop assistant: It was fifteen pounds, but today it’s twelve pounds. Customer: Great. I’ll take it.", VOICE_NARRATOR),
    ("bilingual-l3", "Boy: Did you come to school by bus today, Anna? Girl: No, my dad drove me. It was raining too much to ride my bike.", VOICE_NARRATOR),
    ("bilingual-l4", "Girl: Did you go swimming on Sunday, Jack? Boy: The pool was closed. I played tennis with my cousin instead. Next Sunday, we’re going swimming.", VOICE_NARRATOR),
    ("bilingual-l5", "Girl: Excuse me. Where is the bookshop? Man: Go past the bank. The bookshop is on your left, opposite the supermarket.", VOICE_NARRATOR),
    ("bilingual-l6", "Teacher: For tomorrow’s trip, please bring a sandwich and a bottle of water. You don’t need any money because the museum is free. Meet at the school gate at nine.", VOICE_EXAMINER),
    ("bilingual-l7", "Presenter: It will be cloudy this morning, but the sun will come out after lunch. There won’t be any rain today.", VOICE_NARRATOR),
    ("bilingual-l8", "Boy: What did your grandparents give you for your birthday? Girl: I asked for a watch, but they bought me a camera. I’m really happy because I love taking photos.", VOICE_NARRATOR),
    ("bilingual-l9", "Teacher: The art club usually meets on Tuesday. This week, our room is being cleaned, so we’ll meet on Thursday instead. The time is still four o’clock.", VOICE_EXAMINER),
    ("bilingual-l10", "Girl: I can’t find my keys. Boy: Are they in your coat pocket? Girl: No, I’ve checked. Oh, there they are, under my notebook on the kitchen table.", VOICE_NARRATOR),
]

SEMAPHORE = asyncio.Semaphore(6)

async def synthesize(out_dir, item_id, text, voice):
    target = os.path.join(out_dir, f"{item_id}.mp3")
    if os.path.exists(target) and os.path.getsize(target) > 500:
        return True
    async with SEMAPHORE:
        try:
            communicate = edge_tts.Communicate(text, voice)
            await communicate.save(target)
            print(f"Generated: {item_id}.mp3 ({voice})")
            return True
        except Exception as e:
            print(f"Error {item_id}: {e}")
            return False

async def main():
    tasks = []
    # Speaking
    for item_id, text, voice in SPEAKING_P1 + SPEAKING_P2 + BILINGUAL_SPEAKING:
        tasks.append(synthesize(SPEAKING_DIR, item_id, text, voice))
    
    # Listening
    for item_id, text, voice in EXAM_LISTENING + BILINGUAL_LISTENING:
        tasks.append(synthesize(LISTENING_DIR, item_id, text, voice))
        
    print(f"Total audio to generate: {len(tasks)}")
    res = await asyncio.gather(*tasks)
    print(f"Finished generating: {sum(1 for r in res if r)} / {len(tasks)}")

if __name__ == "__main__":
    asyncio.run(main())
