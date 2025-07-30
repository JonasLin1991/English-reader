import React, { useState } from 'react';

function VocabularyQuiz({ sentence }) {
  const [questionWord, setQuestionWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const extractWords = (text) => {
    if (!text || typeof text !== 'string') return []; // 防止 undefined 錯誤
    const words = text.replace(/[.,!?]/g, '').split(' ');
    return words.filter(w => w.length > 2);
  };

  const getRandomWord = (words) => {
    if (!words || words.length === 0) return '';
    return words[Math.floor(Math.random() * words.length)];
  };

  const handleGenerate = async () => {
    setShowAnswer(false);
    const words = extractWords(sentence);
    const randomWord = getRandomWord(words);
    if (!randomWord) {
      setAnswer('⚠️ 無有效單字');
      return;
    }
    setQuestionWord(randomWord);

    try {
      const res = await fetch('http://localhost:5000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: randomWord })
      });
      const data = await res.json();
      setAnswer(data.traditional || data.translation || '⚠️ 無翻譯');
    } catch (err) {
      console.error(err);
      setAnswer('⚠️ 翻譯錯誤，請確認 Proxy Server 是否有啟動');
    }
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={handleGenerate}>🎯 出題</button>

      {questionWord && (
        <p style={{ marginTop: '10px', fontSize: '18px' }}>
          ❓ 請問「<strong>{questionWord}</strong>」的中文是？
        </p>
      )}

      {questionWord && (
        <button onClick={() => setShowAnswer(true)}>👁️ 顯示解答</button>
      )}

      {showAnswer && (
        <p style={{ fontSize: '18px', color: '#007bff' }}>
          ✅ 中文意思：<strong>{answer}</strong>
        </p>
      )}
    </div>
  );
}

export default VocabularyQuiz;
