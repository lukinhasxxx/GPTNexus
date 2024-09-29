import React, { useState } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

const ChatApp = () => {
    const [messages, setMessages] = useState([]);

    const handleSend = (message) => {
        const userMessage = { sender: 'user', text: message };
        setMessages([...messages, userMessage]);

        setTimeout(() => {
            const gptMessage = { sender: 'gpt', text: `Response to: ${message}` };
            setMessages((prevMessages) => [...prevMessages, gptMessage]);
        }, 1000);
    };

    return (
        <div className="container mt-4">
            <div className="chat-window">
                <ChatMessages messages={messages} />
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
};

export default ChatApp;
