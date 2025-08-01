import React, { useEffect, useState } from 'react';

export default function ArticlePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (index) => {
    const updated = [...articles];
    updated.splice(index, 1);
    setArticles(updated);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ fontSize: '28px', marginBottom: '30px' }}>閱讀文章記錄</h2>

      {articles.length === 0 ? (
        <p style={{ fontSize: '18px' }}>尚未儲存任何文章</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {articles.map((a, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '24px',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <p style={{ marginBottom: '10px' }}><strong>日期：</strong>{a.date}</p>
              <p style={{ whiteSpace: 'pre-wrap' }}><strong>內容：</strong>{a.content}</p>

              <button
                onClick={() => handleDelete(i)}
                style={{
                  marginTop: '16px',
                  padding: '8px 16px',
                  background: 'rgba(255,77,109,0.8)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                刪除這篇文章
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
