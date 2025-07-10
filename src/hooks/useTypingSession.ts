import { useState, useEffect } from "react";
import { generate } from "random-words";

export function useTypingSession() {
    const [words, setWords] = useState<string[]>([]);
    const [typedHistory, setTypedHistory] = useState<string[][]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const generatedWords = generate({'exactly': 50}) as string[];
        setWords(generatedWords);
    }, []);

    useEffect(() => {
        if(words.length > 0) {
            setTypedHistory(words.map(() => []));
            setCurrentWordIndex(0);
            setCurrentCharIndex(0);
            setStartTime(null);
            setEndTime(null);
            setIsFinished(false);
        }
    }, [words])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;

            setStartTime((prev) => prev ?? Date.now());

            if(key == "Backspace") {
                if(currentWordIndex === 0 && currentCharIndex === 0) {
                    return;
                }

                const updated = [...typedHistory];


                if(currentCharIndex > 0) {
                    updated[currentWordIndex].pop();
                    setTypedHistory(updated);
                    setCurrentCharIndex((prev) => prev-1);
                }
                else {
                    updated[currentWordIndex].pop();
                    setTypedHistory(updated);
                    setCurrentWordIndex((prev) => prev-1);
                    setCurrentCharIndex(updated[currentWordIndex-1].length);
                }
            }
            else if(key == " ") {
                if(currentCharIndex > 0) {
                    setCurrentWordIndex((prev) => prev+1);
                    setCurrentCharIndex(0);

                    // if(currentWordIndex + 1 >= words.length) {
                    //     setIsFinished(true);
                    //     setEndTime(Date.now());
                    //     console.log("finished");
                    // }
                }
            }
            else if(key.length === 1) {
                const updated = [...typedHistory];
                updated[currentWordIndex] = [...updated[currentWordIndex], key];

                if(currentWordIndex == words.length-1 && currentCharIndex == words[currentWordIndex].length-1) {
                    setIsFinished(true);
                    setEndTime(Date.now());
                    console.log("finished");
                }

                setTypedHistory(updated);
                setCurrentCharIndex((prev) => prev+1);

            }
        }
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [typedHistory, currentCharIndex, currentWordIndex, startTime, isFinished, words]);

    return {
        words, 
        typedHistory,
        currentWordIndex,
        currentCharIndex,
        isFinished,
        startTime,
        endTime
    };
}