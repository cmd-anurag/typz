import { useEffect, useRef, useState } from "react";
import { generate } from "random-words";
import Caret from "./Caret";

function generateWords() {

    return generate({'exactly': 52}) as string[];
}

function TypingBox() {

    const [words, setWords] = useState<string[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [typedHistory, setTypedHistory] = useState<string[][]>([]);

    const activeCharRef = useRef<HTMLSpanElement>(null);

    const getCharacterClasses = (wordIndex: number, characterIndex: number): string => {

        const actualCharacter = words[wordIndex][characterIndex];
        const typedCharacter = typedHistory[wordIndex]?.[characterIndex];

        let classes: string[] = [];

        const skipped = wordIndex < currentWordIndex;
        const isActive = wordIndex === currentWordIndex && characterIndex === currentCharIndex;

        if(typedCharacter == null) {
            if(skipped) {
                classes = [...classes, "text-red-600", "line-through"];
            }
            else {
                classes.push("text-gray-500");
            }
        }
        else if(typedCharacter == actualCharacter) {
            classes.push("text-green-200");
        }
        else {
            classes = [...classes, "text-red-600", "underline"];
        }

        if(isActive) {
            classes.push("white-Shadow");
        }

        return classes.join(" ");
    }

    const getRenderCharacter = (wordIndex: number, characterIndex: number): string => {
        const actualWord = words[wordIndex];
        const typedWord = typedHistory[wordIndex] || [];

        if(characterIndex < actualWord.length) {
            return actualWord[characterIndex];
        }

        return typedWord[characterIndex] || "";
    }


    // for generating words.
    useEffect(()=> {
        setWords(generateWords());
    }, []);

    // for initializing/resetting typedHistory whenevr words change
    useEffect(()=> {
        if(words.length > 0) {
            setTypedHistory(words.map(() => []));
            setCurrentWordIndex(0);
            setCurrentCharIndex(0);
        }
    }, [words]);

    // for adding typing event listener and handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if(key === "Backspace") {

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
                // console.log(updated.flat().toString());

            }
            else if(key === " ") {

                if(currentCharIndex > 0) {
                    setCurrentWordIndex((prev) => prev+1);
                    setCurrentCharIndex(0);
                }
                // console.log(typedHistory.flat().toString());
            }
            else if(key.length === 1) {

                const updated = [...typedHistory];
                updated[currentWordIndex] = [...updated[currentWordIndex], key];
                setTypedHistory(updated);
                setCurrentCharIndex((prev) => prev+1);
                // console.log(updated.flat().toString());
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        }
    }, [typedHistory, currentCharIndex, currentWordIndex, words])

    return (
          
        <div className="text-[#cac4ce] text-3xl py-16 mt-16 flex flex-wrap container mx-auto relative"> 
            { words.map((word, wordIndex) => {

                const maxLength = Math.max(word.length, typedHistory[wordIndex]?.length || 0);
                const renderLength = maxLength + 1;

                return (
                    <span key={wordIndex} className="mr-6 mb-5">
                        {
                            [...Array(renderLength)].map((_, characterIndex) => {
                                const isActive = wordIndex === currentWordIndex && characterIndex === currentCharIndex;

                                return (
                                    <span key={characterIndex} className={getCharacterClasses(wordIndex, characterIndex)} ref={isActive ? activeCharRef : null}>
                                        {getRenderCharacter(wordIndex, characterIndex)}
                                    </span>
                                );
                            })
                        }
                    </span>
                );
            }) }
            <Caret targetRef={activeCharRef} currentWordIndex={currentWordIndex} currentCharIndex={currentCharIndex} />
        </div>
    )
}

export default TypingBox;