import os
import re
import asyncio
import edge_tts

BASE_DIR = os.path.join(os.path.dirname(__file__), "../dist/audio/listening")
os.makedirs(BASE_DIR, exist_ok=True)

# Voice personas:
VOICE_MAP = {
    # Young male students / boys
    "boy": "en-GB-ThomasNeural",
    "ben": "en-GB-ThomasNeural",
    "oliver": "en-GB-ThomasNeural",
    "customer": "en-GB-ThomasNeural",
    # Young female students / girls
    "girl": "en-GB-MaisieNeural",
    "grace": "en-GB-MaisieNeural",
    "chloe": "en-GB-MaisieNeural",
    "emma": "en-GB-MaisieNeural",
    "anna": "en-GB-MaisieNeural",
    # Adult female
    "woman": "en-GB-SoniaNeural",
    "librarian": "en-GB-SoniaNeural",
    "shop assistant": "en-GB-SoniaNeural",
    "presenter": "en-GB-SoniaNeural",
    # Adult male
    "man": "en-GB-RyanNeural",
    "dad": "en-GB-RyanNeural",
    "teacher": "en-GB-RyanNeural",
    "announcer": "en-GB-RyanNeural",
    "default": "en-GB-SoniaNeural",
}

SCRIPTS = {
    # Official Exam Listening Part 1
    "exam-l-part1-1": [
        ("Boy", "Excuse me, does the next train to Oxford leave at quarter to three?"),
        ("Woman", "It was scheduled for two forty-five, but there is a ten-minute delay today. It will depart at quarter to four? No, sorry, at five to three."),
        ("Boy", "Five to three. Thank you!"),
    ],
    "exam-l-part1-2": [
        ("Girl", "Mr Henderson, how much do we need to pay for the museum visit?"),
        ("Teacher", "The bus ticket is five pounds and the museum entry is normally ten pounds. But because we are a school group, the museum gives us half price. So the total is ten pounds altogether."),
        ("Girl", "Okay, ten pounds. I will bring the money tomorrow."),
    ],
    "exam-l-part1-3": [
        ("Girl", "Hi Oliver! Are you still playing the guitar in the school orchestra?"),
        ("Boy", "I stopped playing the guitar last term because my fingers hurt. I tried the trumpet for two weeks, but I didn’t like it. Now I play the drums and love it!"),
        ("Girl", "Wow, that sounds exciting!"),
    ],
    "exam-l-part1-4": [
        ("Man", "The weather report says Saturday will be windy with heavy rain throughout the morning. However, by Sunday, the clouds will clear completely and we will enjoy bright, warm sunshine all day long. Perfect for a walk in the hills!"),
    ],
    "exam-l-part1-5": [
        ("Dad", "Grace, have you seen your smartphone? It’s not on the kitchen counter."),
        ("Grace", "Oh dear! I thought I left it in my jacket pocket, but then I remember taking it out to check the time while doing homework at my bedroom desk. That’s where it must be!"),
    ],

    # Official Exam Listening Part 2
    "exam-l-part2": [
        ("Librarian", "Good morning students! Welcome to our annual Summer Reading Challenge. This year, the challenge begins on Friday the twelfth of July and finishes on the twenty-fifth of August. Every participant must read at least six books to earn a gold certificate. You can choose any adventure or mystery story. Our special reading workshop meets every Tuesday morning at ten o’clock in the library garden. If you have questions, please write an email to our coordinator, Mr Barlow, that’s B-A-R-L-O-W. Happy reading!"),
    ],

    # Official Exam Listening Part 3
    "exam-l-part3": [
        ("Chloe", "Hi Ben! Are you going to enter the school science competition this year?"),
        ("Ben", "Yes Chloe, I registered yesterday. Last year I made a volcano model, but this time I’m building a small solar-powered model car."),
        ("Chloe", "Wow, that’s clever! Who is working with you?"),
        ("Ben", "I asked my cousin Jack first, but he is busy with tennis practice. So my classmate Toby is joining me."),
        ("Chloe", "Where do you plan to prepare your project?"),
        ("Ben", "Toby’s garage is too cold, so we will use my kitchen table on Saturdays."),
        ("Chloe", "When do we have to hand in our projects?"),
        ("Ben", "The teacher said Wednesday the 18th is the final deadline, not Friday the 20th."),
        ("Chloe", "And what is the first prize?"),
        ("Ben", "The winner receives a brand new electronic tablet!"),
    ],

    # Official Exam Listening Part 4
    "exam-l-part4-16": [
        ("Boy", "My aunt bought me this winter coat for my birthday. The green colour is really nice and it has lots of useful pockets for my phone and keys. But it is made of such heavy wool that it feels uncomfortable to wear when I ride my bicycle to school. I might ask to exchange it for a lighter one."),
    ],
    "exam-l-part4-17": [
        ("Announcer", "Attention all passengers on platform two. The eleven-fifteen service to Manchester Piccadilly has been cancelled due to fallen branches on the track near Crewe. Passengers holding tickets may board the eleven-forty-five express on platform four without extra charge."),
    ],
    "exam-l-part4-18": [
        ("Girl", "Did you have a good time at Lucas’s party on Saturday?"),
        ("Boy", "The music was fantastic and the food was delicious. But there were over forty people packed into his tiny living room, so nobody could even sit down. It was way too crowded."),
        ("Girl", "Oh, I see what you mean!"),
    ],
    "exam-l-part4-19": [
        ("Girl", "I just finished watching the mystery movie you recommended. The actors were brilliant and the scenery in the mountains looked stunning. But the ending made no sense at all—they never explained who took the jewels! It was rather disappointing."),
    ],
    "exam-l-part4-20": [
        ("Teacher", "Class, quiet please! You all did very well on your history test yesterday. However, several students forgot to write their names on the question sheets. Please remember that if there is no name, I cannot record your grade into the school system!"),
    ],

    # Official Exam Listening Part 5
    "exam-l-part5": [
        ("Dad", "How was the school hobby exhibition, Emma?"),
        ("Emma", "It was fantastic, Dad! Everyone in our group found something exciting. My brother Noah immediately signed up for the sailing club at the reservoir. He can’t wait to get on the water!"),
        ("Dad", "And your sister Ella?"),
        ("Emma", "Ella loves acting, so she joined the drama workshop."),
        ("Dad", "That fits her personality! What about your best friend Max?"),
        ("Emma", "Max wanted rock climbing at first, but it was fully booked. So he chose the chess group instead; he wants to compete in tournaments."),
        ("Dad", "Great! And your cousin Holly?"),
        ("Emma", "Holly loves working with clay, so she chose the pottery class. And for me, I registered for the cooking class to learn Italian pasta!"),
    ],

    # Bilingual Study Listening
    "bilingual-l1": [
        ("Girl", "Shall we meet at two o’clock?"),
        ("Boy", "I have lunch with my family then. How about half past two?"),
        ("Girl", "That’s fine. See you outside the library."),
    ],
    "bilingual-l2": [
        ("Customer", "How much is this T-shirt?"),
        ("Shop assistant", "It was fifteen pounds, but today it’s twelve pounds."),
        ("Customer", "Great. I’ll take it."),
    ],
    "bilingual-l3": [
        ("Boy", "Did you come to school by bus today, Anna?"),
        ("Anna", "No, my dad drove me. It was raining too much to ride my bike."),
    ],
    "bilingual-l4": [
        ("Girl", "Did you go swimming on Sunday, Jack?"),
        ("Boy", "The pool was closed. I played tennis with my cousin instead. Next Sunday, we’re going swimming."),
    ],
    "bilingual-l5": [
        ("Girl", "Excuse me. Where is the bookshop?"),
        ("Man", "Go past the bank. The bookshop is on your left, opposite the supermarket."),
    ],
    "bilingual-l6": [
        ("Teacher", "For tomorrow’s trip, please bring a sandwich and a bottle of water. You don’t need any money because the museum is free. Meet at the school gate at nine."),
    ],
    "bilingual-l7": [
        ("Presenter", "It will be cloudy this morning, but the sun will come out after lunch. There won’t be any rain today."),
    ],
    "bilingual-l8": [
        ("Boy", "What did your grandparents give you for your birthday?"),
        ("Girl", "I asked for a watch, but they bought me a camera. I’m really happy because I love taking photos."),
    ],
    "bilingual-l9": [
        ("Teacher", "The art club usually meets on Tuesday. This week, our room is being cleaned, so we’ll meet on Thursday instead. The time is still four o’clock."),
    ],
    "bilingual-l10": [
        ("Girl", "I can’t find my keys."),
        ("Boy", "Are they in your coat pocket?"),
        ("Girl", "No, I’ve checked. Oh, there they are, under my notebook on the kitchen table."),
    ],
}

async def generate_dialogue(file_key, dialogue_lines):
    audio_chunks = []
    for speaker, text in dialogue_lines:
        voice = VOICE_MAP.get(speaker.lower(), VOICE_MAP["default"])
        communicate = edge_tts.Communicate(text, voice)
        chunk_data = b""
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                chunk_data += chunk["data"]
        audio_chunks.append(chunk_data)
    
    final_data = b"".join(audio_chunks)
    target_path = os.path.join(BASE_DIR, f"{file_key}.mp3")
    with open(target_path, "wb") as f:
        f.write(final_data)
    print(f"Generated multi-voice: {file_key}.mp3 ({len(dialogue_lines)} lines, {len(final_data)} bytes)")
    return True

async def main():
    print(f"Synthesizing {len(SCRIPTS)} authentic multi-voice exam listening files...")
    tasks = [generate_dialogue(k, v) for k, v in SCRIPTS.items()]
    await asyncio.gather(*tasks)
    print("All authentic multi-voice listening audio files generated successfully!")

if __name__ == "__main__":
    asyncio.run(main())
