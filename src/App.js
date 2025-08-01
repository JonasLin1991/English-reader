import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Translator from './Components/Translator';
import VocabularyQuiz from './VocabularyQuiz';
import WordsPage from './WordsPage';
import ArticlePage from './ArticlePage';
import VocabularyTestPage from './VocabularyTestPage';

function App() {
  const [currentPage, setCurrentPage] = useState('translator');
  const [inputText, setInputText] = useState('');
  const [sentences, setSentences] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [rate, setRate] = useState(1.0);
  const [savedArticles, setSavedArticles] = useState(() => {
    const stored = localStorage.getItem('savedArticles');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      let voiceList = synth.getVoices();
      if (voiceList.length) {
        setVoices(voiceList);
        setSelectedVoice(voiceList.find(v => v.lang.includes('en')) || voiceList[0]);
      }
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const handleSplitSentences = () => {
    const lines = inputText
      .split('.')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    setSentences(lines);
  };

  const playAllSentences = () => {
    sentences.forEach((sentence, idx) => {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.voice = selectedVoice;
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    });
  };

  const handleSaveArticle = () => {
    if (!inputText.trim()) return;
    const newArticle = {
      id: Date.now(),
      content: inputText,
      date: new Date().toLocaleString(),
    };
    const updated = [...savedArticles, newArticle];
    setSavedArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
    alert('✅ 文章已收藏！');
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar currentPage={currentPage} onChangePage={setCurrentPage} />
      <div style={{ flex: 1, padding: '40px', fontFamily: 'Arial' }}>
        {currentPage === 'translator' && (
          <>
            <h1>英文閱讀練習工具</h1>

            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                width: '90%',
                fontSize: '16px',
                padding: '10px',
                marginBottom: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '24px',
                transition: 'transform 0.3s ease',
              }}
            />

            <div style={{ marginBottom: '10px' }}>
              <label>語速：</label>
              <select value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}>
                <option value="0.3">超慢</option>
                <option value="0.6">慢速</option>
                <option value="1.0">正常</option>
                <option value="1.4">快速</option>
                <option value="1.8">超快</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>語音：</label>
              <select
                value={selectedVoice?.name}
                onChange={(e) => {
                  const voice = voices.find((v) => v.name === e.target.value);
                  setSelectedVoice(voice);
                }}
              >
                {voices.map((voice, idx) => (
                  <option key={idx} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
              <button
                onClick={handleSplitSentences}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: 'linear-gradient(160deg, #6f5eedff, #285273ff)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
              切句並顯示翻譯工具
              </button>

              <button
                onClick={playAllSentences}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: 'linear-gradient(160deg, #5e55a0ff, #285273ff)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
              播放全部句子
              </button>

              <button
                onClick={handleSaveArticle}
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  background: 'linear-gradient(160deg, #dcbf86ff, #b88e06ff)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                }}
              >
              收藏文章
              </button>
            </div>

            {sentences.map((sentence, idx) => (
              <div key={idx} style={{ marginBottom: '20px' }}>
                <Translator text={sentence} rate={rate} voice={selectedVoice} />
                <VocabularyQuiz sentence={sentence} />
                <hr />
              </div>
            ))}
          </>
        )}

        {currentPage === 'quiz' && <VocabularyTestPage/>}
        {currentPage === 'article' && <ArticlePage/>}
        {currentPage === 'words' && <WordsPage/>}
      </div>
    </div>
  );
}

export default App;
