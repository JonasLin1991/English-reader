import React, { useState } from 'react';

function VocabularyQuiz({ sentence }) {
  const [questionWord, setQuestionWord] = useState('');
  const [answer, setAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  const extractWords = (text) => {
    if (!text || typeof text !== 'string') return [];
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
      setAnswer(' 無有效單字');
      return;
    }
    setQuestionWord(randomWord);

    try {
      const res = await fetch('https://englishproxy.vercel.app/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: randomWord })
      });
      const data = await res.json();
      setAnswer(data.traditional || data.translation || ' 無翻譯');
    } catch (err) {
      console.error(err);
      setAnswer(' 翻譯錯誤，請確認 Proxy Server 是否有啟動');
    }
  };

  const handleSaveWord = () => {
    const saved = JSON.parse(localStorage.getItem('savedWords') || '[]');
    if (!saved.includes(questionWord)) {
      saved.push(questionWord);
      localStorage.setItem('savedWords', JSON.stringify(saved));
      alert(` 已收藏單字: ${questionWord}`);
    } else {
      alert(' 此單字已收藏過');
    }
  };

  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(questionWord);
    utter.lang = 'en-US';
    synth.speak(utter);
  };

  return (
    <div style={{ marginTop: '30px' }}>
      <button onClick={handleGenerate}> 出題</button>

      {questionWord && (
        <>
          <p style={{ marginTop: '10px', fontSize: '18px' }}>
            請問「<strong>{questionWord}</strong>」的中文是？
            <button onClick={handleSpeak} style={{ marginLeft: '10px' }}>🔊</button>
            <button onClick={handleSaveWord} style={{ marginLeft: '10px' }}>⭐ 收藏</button>
          </p>

          <button onClick={() => setShowAnswer(true)}> 顯示解答</button>

          {showAnswer && (
            <p style={{ fontSize: '18px', color: '#007bff' }}>
               中文意思：<strong>{answer}</strong>
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default VocabularyQuiz;
