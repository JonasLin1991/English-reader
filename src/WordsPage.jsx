import React, { useEffect, useState } from 'react';

export default function WordsPage() {
  const [words, setWords] = useState([]);

  // 載入 localStorage 中的單字
  useEffect(() => {
    const updated = JSON.parse(localStorage.getItem('savedWords')) || [];
    setWords(updated);
  }, []);

  // 單字朗讀
  const handleSpeak = (word) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // 刪除單字
  const handleDelete = (wordToRemove) => {
    const updated = words.filter(w => w !== wordToRemove);
    setWords(updated);
    localStorage.setItem('savedWords', JSON.stringify(updated)); // ✅ 修正拼字
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📚 收藏單字</h2>

      {words.length === 0 ? (
        <p>尚未收藏任何單字</p>
      ) : (
        <ul>
          {words.map((w, i) => (
            <li key={i} style={{ fontSize: '18px', marginBottom: '6px' }}>
              {w}
              <button
                style={{ marginLeft: '10px' }}
                onClick={() => handleSpeak(w)}
              >
                🔊
              </button>
              <button
                style={{ marginLeft: '10px', color: 'red' }}
                onClick={() => handleDelete(w)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}