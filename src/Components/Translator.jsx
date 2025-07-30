import React, { useState } from 'react';

function Translator({ text, rate, voice }) {
  const [translation, setTranslation] = useState('');
  const [traditional, setTraditional] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
  setLoading(true);
  setTranslation("翻譯中...");




  try {
    const res = await fetch("https://englishproxy.vercel.app", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    });

    const data = await res.json();
    const translated = data.translation;
    setTranslation(translated || "⚠️ 翻譯失敗");
    setTraditional(data.traditional || "");
  } catch (err) {
    console.error(err);
    setTranslation("⚠️ 發生錯誤，請確認 Proxy Server 有啟動");
  }

  setLoading(false);
};


  const handleSpeak = () => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice?.lang || 'en-US';
    utterance.rate = rate;
    synth.speak(utterance);
  };

  return (
    <div>
      <p style={{ fontSize: '18px' }}>
        <strong>{text}</strong>
        <button onClick={handleSpeak} style={{ marginLeft: '10px' }}>🔊</button>
      </p>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "翻譯中..." : "翻譯"}
      </button>

    

{traditional && (
  <p style={{ fontSize: '16px', color: '#222' }}>
    <strong>繁體翻譯:</strong> {traditional}
  </p>
)}
    </div>
  );
}

export default Translator;
