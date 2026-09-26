import { useEffect, useRef, useState } from 'react';

/**
 * Types out each string in `words`, pauses, deletes, and moves to the next.
 */
export function useTypewriter(
  words = [],
  {
    typeSpeed = 70,
    deleteSpeed = 35,
    pause = 1800,
    pauseBeforeType = 400,
  } = {}
) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'deleting'

  const wordsRef = useRef(words);
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const list = wordsRef.current;
    if (!list || list.length === 0) return;

    const currentWord = list[index % list.length] || '';
    let timer;

    if (phase === 'typing') {
      if (text.length < currentWord.length) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase('deleting');
        }, pause);
      }
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(currentWord.slice(0, text.length - 1));
        }, deleteSpeed);
      } else {
        timer = setTimeout(() => {
          setIndex((prev) => (prev + 1) % list.length);
          setPhase('typing');
        }, pauseBeforeType);
      }
    }

    return () => clearTimeout(timer);
  }, [text, phase, index, typeSpeed, deleteSpeed, pause, pauseBeforeType]);

  return text;
}

