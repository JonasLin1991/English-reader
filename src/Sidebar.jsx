export default function Sidebar({ currentPage, onChangePage }) {
  const menuItems = [
    { name: '首頁', key: 'translator' },
    { name: '單字測驗', key: 'quiz' },
    { name: '文章記錄', key: 'article' },
    { name: '單字紀錄', key: 'words' }
  ];

  return (
    <div
      style={{
        width: '220px',
        background: 'linear-gradient(160deg, #473c99ff, #285273ff)',
        color: '#fff',
        padding: '30px 20px',
        height: '100vh',
        boxShadow: '4px 0 10px rgba(0,0,0,0.2)',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <h2 style={{ marginBottom: '30px' }}>English Tools</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.key} style={{ marginBottom: '10px' }}>
            <button
              onClick={() => onChangePage(item.key)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: currentPage === item.key ? '#ffffff22' : 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '16px',
                textAlign: 'left',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
