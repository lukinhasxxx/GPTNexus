import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            setMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-input-container">
            <input
                type="text"
                className="chat-input"
                placeholder="Mensagem..."
                value={message}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
            />
            <button className="send-button" onClick={handleSend}>
                Enviar
            </button>
        </div>
    );
};

export default ChatInput;
