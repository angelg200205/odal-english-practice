import type { DialogueLine } from '../types';
import { speakEnglish, stopSpeaking } from '../lib/tts';

interface Props {
  lines: DialogueLine[];
}

export function DialogueBox({ lines }: Props) {
  const fullText = lines.map((l) => `${l.speaker === 'staff' ? 'Staff' : 'Customer'}: ${l.text}`).join('. ');

  return (
    <div className="stack-gap">
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn-secondary" onClick={() => speakEnglish(fullText)}>
          Listen
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => stopSpeaking()}>
          Stop
        </button>
      </div>
      <div className="dialogue">
        {lines.map((line, i) => (
          <div key={`${line.speaker}-${i}`} className={`bubble ${line.speaker}`}>
            <div className="who">{line.speaker === 'staff' ? 'Staff' : 'Customer'}</div>
            <div className="text">{line.text}</div>
            {line.hints && line.hints.length > 0 && (
              <div className="hints">
                {line.hints.map((h) => (
                  <span key={h.word} className="hint">
                    {h.word}: {h.ja}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
