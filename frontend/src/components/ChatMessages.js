import React, {useRef} from 'react';
import './ChatMessages.css';

const ChatMessages = ({ messages }) => {const chatRef = useRef(null);

    const handleResize = (e) => {
        const startY = e.clientY;
        const chatElement = chatRef.current;
        const startHeight = chatElement.clientHeight; // Usa clientHeight para capturar a altura interna

        const onMouseMove = (event) => {
            requestAnimationFrame(() => {
                const newHeight = startHeight + (event.clientY - startY);

                // Respeitar a altura mínima e máxima
                if (newHeight > 100 && newHeight <= window.innerHeight * 0.7) {
                    chatElement.style.height = `${newHeight}px`; // Define a nova altura
                }
            });
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    return (
        <div className="chat-messages" ref={chatRef}>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`message ${msg.sender === 'user' ? 'user-message' : 'gpt-message'}`}
                >
                    {msg.text}
                </div>
            ))}
            <div
                className="resize-bar resize-bar-bottom-right"
                onMouseDown={handleResize}
            ></div>
            <div
                className="resize-bar resize-bar-bottom"
                onMouseDown={handleResize}
            ></div>
        </div>
    );
};

export default ChatMessages;
