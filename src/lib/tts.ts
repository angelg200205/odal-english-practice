let speaking = false;

export function speakEnglish(text: string): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = 0.92;
  speaking = true;
  utter.onend = () => {
    speaking = false;
  };
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking(): void {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  speaking = false;
}

export function isSpeaking(): boolean {
  return speaking;
}
