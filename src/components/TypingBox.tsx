import { useEffect, useState } from "react";

function TypingBox() {

    const words = [
        "sky", "imagination", "rust", "keyboard", "infinite",
        "mug", "serendipity", "dog", "velocity", "truth",
        "fire", "architecture", "whisper", "moonlight", "cat",
        "entropy", "blink", "ocean", "circuit", "paradox",
        "cliff", "wander", "quantum", "echo", "storm",
        "canvas", "null", "fractal", "gravity", "syntax",
        "glitch", "pulse", "dream", "crystal", "fog",
        "script", "neuron", "flame", "island", "latch",
        "threshold", "breeze", "warp", "flicker", "void",
        "signal", "maze", "shatter", "prism", "blur"
    ];


    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const typedHistoryInitial: string[][] = words.map(() => [])
    const [typedHistory, setTypedHistory] = useState<string[][]>(typedHistoryInitial);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if(key === "Backspace") {

                const updated = [...typedHistory];
                if(currentCharIndex > 0) {
                    updated[currentWordIndex].pop();
                    setTypedHistory(updated);
                    setCurrentCharIndex((prev) => prev-1);
                }

            }
            else if(key === " ") {

                setCurrentWordIndex((prev) => prev+1);
                setCurrentCharIndex(0);

            }
            else if(key.length === 1) {

                const updated = [...typedHistory];
                updated[currentWordIndex] = [...updated[currentWordIndex], key];
                setTypedHistory(updated);
                setCurrentCharIndex((prev) => prev+1);

            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [typedHistory, currentCharIndex, currentWordIndex])

    return (
        <>  
            <div className="text-[#cac4ce] text-3xl py-16 mt-16 flex flex-wrap container mx-auto"> 
                {words.map((word, wordIndex) => {
                    return <span key={wordIndex} className="mr-6 mb-5">
                            {
                                Array.from(word).map((character, characterIndex) => {
                                    return <span key={characterIndex}>{character}</span>
                                })
                            }
                        </span>;
                })}
            </div>
        </>
    )
}

export default TypingBox;