// ArticleQuizPage.jsx
import React, { useEffect, useState } from 'react';

export default function ArticleQuizPage() {
  const [articles, setArticles] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);

  const handleSelectChange = (e) => {
    const selected = articles.find(a => a.date === e.target.value);
    if (selected) {
      setSelectedDate(selected.date);
      const wordList = selected.content
        .replace(/[^a-zA-Z\s]/g, '')  // 移除標點符號
        .split(/\s+/)
        .filter(w => w.length > 1 && isNaN(w))
        .map(w => w.toLowerCase());
      setWords(wordList);
      setCurrentIndex(0);
      setShowAnswer(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 根據文章測驗單字</h2>

      {articles.length === 0 ? (
        <p>尚未儲存任何文章</p>
      ) : (
        <>
          <label>
            選擇文章日期：
            <select onChange={handleSelectChange} value={selectedDate}>
              <option value="">請選擇文章</option>
              {articles.map((a, i) => (
                <option key={i} value={a.date}>{a.date}</option>
              ))}
            </select>
          </label>

          {words.length > 0 && (
            <div style={{ marginTop: '30px' }}>
              <h3>第 {currentIndex + 1} 題 / 共 {words.length} 題</h3>
              <p style={{ fontSize: '24px' }}>
                ❓ 請問「{words[currentIndex]}」的中文是什麼？
              </p>

              {showAnswer ? (
                <p style={{ fontSize: '20px', color: 'green' }}>
                  ✅ 中文：{words[currentIndex]}（請自行查閱或整合字典 API）
                </p>
              ) : (
                <button onClick={() => setShowAnswer(true)}>顯示答案</button>
              )}

              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={() => {
                    setCurrentIndex((prev) => Math.min(prev + 1, words.length - 1));
                    setShowAnswer(false);
                  }}
                  disabled={currentIndex === words.length - 1}
                >
                  下一題
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
