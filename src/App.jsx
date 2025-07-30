import React, { useState } from 'react';
import VocabularyQuiz from './VocabularyQuiz';

function App() {
  const sentence = "Learning English is fun and rewarding. It helps you connect with people around the world.";
  const [rate, setRate] = useState(1.0);
  const text = sentence; // 同一句

  const [translation, setTranslation] = useState('');

  const handleTranslate = () => {
    const fakeTranslated = "這是模擬翻譯結果。";
    setTranslation(fakeTranslated);
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    synth.speak(utterance);
  };

  return (
    <div>
      <h2>📚 Vocabulary Quiz</h2>
      <VocabularyQuiz sentence={sentence} />

      <hr style={{ margin: '30px 0' }} />

      <h2>🗣️ 翻譯與朗讀</h2>
      <p style={{ fontSize: '18px' }}>
        <strong>{text}</strong>
        <button onClick={handleSpeak} style={{ marginLeft: '10px' }}>🔊</button>
        <select
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          style={{ marginLeft: '10px' }}
        >
          <option value="0.6">🐢 慢速</option>
          <option value="1.0">⚖️ 正常</option>
          <option value="1.4">🐇 快速</option>
        </select>
      </p>
      <button onClick={handleTranslate}>翻譯</button>
      {translation && (
        <p style={{ marginTop: '10px', fontSize: '16px', color: '#444' }}>
          <strong>翻譯:</strong> {translation}
        </p>
      )}
    </div>
  );
}

export default App;
