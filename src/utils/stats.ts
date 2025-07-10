export function calculateDuration(startTime: number | null, endTime: number | null): number {
    if(!startTime || !endTime) return 0;
    return (endTime - startTime) / 1000;
}

export function calculateRawWPM(typedHistory: string[][], durationSeconds: number): number {
    const totalTypedChars = typedHistory.flat().length;
    const words = totalTypedChars / 5;
    return durationSeconds === 0 ? 0 : Math.round(words / (durationSeconds / 60));
}

export function calculateCorrectCharacters(typedHistory: string[][], words: string[]): number {
    let correctChars = 0;
    
    for(let i = 0; i < typedHistory.length; ++i) {
        const typed = typedHistory[i] || [];
        const actual = words[i] || "";
    
        for(let j = 0; j < Math.min(typed.length, actual.length); ++j) {
            if(typed[j] === actual[j]) {
                correctChars++;
            }
        }
    }
    
    return correctChars;
}

export function calculateTotalExpectedChars(words: string[]): number {
  return words.join(" ").length;
}

export function calculateAccuracy(typedHistory: string[][], words: string[]): number {
    let correctChars = 0;
    let totalCharsConsidered = 0;
    
    const maxWordsToConsider = Math.max(typedHistory.length, words.length);
    
    for(let i = 0; i < maxWordsToConsider; ++i) {
        const typed = typedHistory[i] || [];
        const actual = words[i] || "";
        
        const charsInThisWord = Math.max(typed.length, actual.length);
        totalCharsConsidered += charsInThisWord;
        
        for(let j = 0; j < Math.min(typed.length, actual.length); ++j) {
            if(typed[j] === actual[j]) {
                correctChars++;
            }
        }
    }
    
    if (totalCharsConsidered === 0) return 0;
    
    return Math.round((correctChars / totalCharsConsidered) * 100);
}

export function calculateNetWPM(typedHistory: string[][], words: string[], durationSeconds: number): number {
    const correctChars = calculateCorrectCharacters(typedHistory, words);
    const wordCount = correctChars / 5;
    return durationSeconds === 0 ? 0 : Math.round(wordCount / (durationSeconds / 60));
}