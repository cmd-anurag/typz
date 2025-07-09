import { useEffect, useRef } from "react";

type CaretProps = {
    targetRef: React.RefObject<HTMLSpanElement | null>;
    currentWordIndex: number;
    currentCharIndex: number;
};

function Caret({targetRef, currentWordIndex, currentCharIndex} : CaretProps) {

    const caretRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const caret = caretRef.current;
        const target = targetRef.current;

        if(caret && target) {
            const { offsetLeft, offsetTop, offsetHeight } = target;

            caret.style.left = `${offsetLeft}px`;
            caret.style.top = `${offsetTop}px`;
            caret.style.height = `${offsetHeight}px`;
        }
    }, [targetRef, currentWordIndex, currentCharIndex]);

    return (
        <div
            ref={caretRef}
            className="absolute w-[2px] bg-white animate-pulse transition-all"
        />
    );
}

export default Caret;