import React, { useState, useEffect } from "react";
import Translator from "./Components/Translator";
import VocabularyQuiz from'./VocabularyQuiz';



function App() {
  const [inputText, setInputText] = useState(`Learning English is fun and rewarding. It helps you connect with people around the world and improves your career opportunities.`);
  const [sentences, setSentences] = useState([]);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voiceList = synth.getVoices();
      setVoices(voiceList);
      const defaultVoice = voiceList.find(v => v.lang.startsWith('en')) || voiceList[0];
      setSelectedVoice(defaultVoice);
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  const handleSplitSentences = () => {
    const result = inputText
      .split('.')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s + '.');
    setSentences(result);
  };

  // ✅ 放進 App 裡面
  const playAllSentences = async () => {
    if (!sentences.length || !selectedVoice) return;

    const synth = window.speechSynthesis;

    for (let i = 0; i < sentences.length; i++) {
      const utterance = new SpeechSynthesisUtterance(sentences[i]);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang || 'en-US';
      utterance.rate = rate;

      await new Promise((resolve) => {
        utterance.onend = resolve;
        synth.speak(utterance);
      });
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "800px", margin: "auto" }}>
      <h1>🌍 英文朗讀練習工具</h1>

      <textarea
        rows={6}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "100%", fontSize: "16px", padding: "10px", marginBottom: "10px" }}
      />

      {/* 全域語速控制 */}
      <div style={{ marginBottom: "10px" }}>
        <label style={{ fontSize: "16px", marginRight: "10px" }}>🎛️ 語速：</label>
        <select value={rate} onChange={(e) => setRate(parseFloat(e.target.value))}>
          <option value="0.3">🐢 超慢</option>
          <option value="0.6">🐢 慢速</option>
          <option value="1.0">⚖️ 正常</option>
          <option value="1.4">🐇 快速</option>
          <option value="1.8">🚀 超快</option>
        </select>
      </div>

      {/* 全域語音控制 */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", marginRight: "10px" }}>🎙️ 語音：</label>
        <select
          value={selectedVoice?.name}
          onChange={(e) => {
            const voice = voices.find(v => v.name === e.target.value);
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
            padding: "10px 20px",
            fontSize: "16px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          ✂️ 切句並顯示翻譯工具
        </button>

        <button
          onClick={playAllSentences}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            background: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "4px"
          }}
        >
          🔁 播放全部句子
        </button>
      </div>

     {sentences.map((sentence, idx) => (
  <div key={idx} style={{ marginBottom: "20px" }}>
    <Translator text={sentence} rate={rate} voice={selectedVoice} />
    <VocabularyQuiz sentence={sentence} />
    <hr />
  </div>
))}

    </div>
  );
}

export default App;
