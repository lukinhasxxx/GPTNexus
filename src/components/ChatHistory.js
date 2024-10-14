import React from 'react';
import './ChatHistory.css';

const ChatHistory = ({ messages }) => {
    return (
        <div className="chat-history">
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.sender === 'user' ? 'user-message' : 'gpt-message'}`}
                >
                    {msg.text}
                </div>
            ))}
        </div>
    );
};

export default ChatHistory;
