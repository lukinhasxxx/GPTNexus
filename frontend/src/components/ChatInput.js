import React, { useState } from 'react';
import './ChatInput.css';

const ChatInput = ({ onSend }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSendClick = () => {
        if (inputValue.trim() !== '') {
            onSend(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSendClick();
        }
    };

    return (
        <div className="chat-input-container">
            <input
                className="chat-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} // Adiciona o evento onKeyDown
                placeholder="Digite sua mensagem..."
            />
            <button className="send-button" onClick={handleSendClick}>
                Enviar
            </button>
        </div>
    );
};

export default ChatInput;
