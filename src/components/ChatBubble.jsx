import React from 'react';

function ChatBubble() {
  const TG_LINK = 'https://t.me/moonstoremoskwa_bot';

  return (
    <div className="chat-bubble">
      <span className="chat-label">Напишите нам — мы онлайн</span>
      <a href={TG_LINK} target="_blank" rel="noopener noreferrer">
        <button className="chat-btn" title="Открыть чат">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0e0e0e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>
      </a>
    </div>
  );
}

export default ChatBubble;
