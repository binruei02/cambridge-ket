import os
import re
import asyncio
import edge_tts

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../dist/audio/words")
os.makedirs(OUTPUT_DIR, exist_ok=True)

VOICE = "en-GB-SoniaNeural"
SEMAPHORE = asyncio.Semaphore(12)

def get_words():
    vocab_file = os.path.join(os.path.dirname(__file__), "../dist/vocabulary-bank.mjs")
    with open(vocab_file, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Extract words before '=' in groups
    raw_pairs = re.findall(r'([a-zA-Z0-9\-\s\.\'\/\(\)]+)=', content)
    words = []
    seen = set()
    for w in raw_pairs:
        clean = w.strip()
        if clean and clean.lower() not in seen:
            seen.add(clean.lower())
            words.append(clean)
    return words

async def download_word(word: str):
    safe_name = word.lower().strip().replace(" ", "_").replace("/", "_").replace("'", "")
    target = os.path.join(OUTPUT_DIR, f"{safe_name}.mp3")
    if os.path.exists(target) and os.path.getsize(target) > 500:
        return True
    
    async with SEMAPHORE:
        try:
            communicate = edge_tts.Communicate(word, VOICE)
            await communicate.save(target)
            return True
        except Exception as e:
            print(f"Error {word}: {e}")
            return False

async def main():
    words = get_words()
    print(f"Total unique words to generate: {len(words)}")
    tasks = [download_word(w) for w in words]
    results = await asyncio.gather(*tasks)
    success = sum(1 for r in results if r)
    print(f"Successfully generated {success} / {len(words)} audio files.")

if __name__ == "__main__":
    asyncio.run(main())
