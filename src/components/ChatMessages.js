import React from 'react';
import './ChatMessages.css';

const ChatMessages = ({ messages }) => {
    return (
        <div className="chat-messages">
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

export default ChatMessages;
