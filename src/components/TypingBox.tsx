import { useRef } from "react";
import { useTypingSession } from "../hooks/useTypingSession";
import {
  calculateAccuracy,
  calculateDuration,
  calculateNetWPM,
  calculateRawWPM,
} from "../utils/stats";

import Caret from "./Caret";


function TypingBox() {

    const {
        words,
        typedHistory,
        currentWordIndex,
        currentCharIndex,
        isFinished,
        startTime,
        endTime
    } = useTypingSession();

    let duration = 0;
    let rawWPM = 0;
    let netWPM = 0;
    let accuracy = 0;



    if(isFinished) {
        duration = calculateDuration(startTime, endTime);
        rawWPM = calculateRawWPM(typedHistory, duration);
        netWPM = calculateNetWPM(typedHistory, words, duration);
        accuracy = calculateAccuracy(typedHistory, words);
    }

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
            classes.push("text-white");
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

    return (
        <>
        <div className="text-[#cac4ce] text-3xl py-16 pl-8 mt-8 flex flex-wrap container mx-auto relative"> 
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
        {/* for now let the results be nested insde typingbox i'll refactor this later by moving typing state to a common parent */}
        {isFinished && 
            (<div className="container mx-auto text-7xl flex justify-between items-center">
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-700 mr-5">alarm</span>
                    <span className="text-white text-5xl">{Math.round(duration)}s</span>
                </div>
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-700 mr-5">electric_bolt</span>
                    <span className="text-white text-5xl">{rawWPM}</span>
                </div>
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-700 mr-5">keyboard</span>
                    <span className="text-white text-5xl">{netWPM}</span>
                </div>
                <div className="flex items-center">
                    <span className="material-symbols-outlined text-gray-700 mr-5">target</span>
                    <span className="text-white text-5xl">{Math.max(0, accuracy)}%</span>
                </div>
                
            </div>)}
        </>
    )
}

export default TypingBox;