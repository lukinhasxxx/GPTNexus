import React, {useEffect} from 'react';
import './App.css';
import './themes/originalTheme.css';
import './themes/neonTheme.css'; //temas neon dark etc que serao implementados
import './themes/lightSkyTheme.css';
import './themes/darkTheme.css';
import './themes/8bitTheme.css';
import './themes/sakuraTheme.css';
import ChatApp from "./ChatApp";
import { ThemeProvider, useTheme } from './ThemeContext';

function ThemeButtons() {
    const { toggleTheme } = useTheme();
    return (
        <div className="theme-buttons">
            <button className="theme-button original" onClick={() => toggleTheme('original')}>
                Tema Original
            </button>
            <button className="theme-button neon" onClick={() => toggleTheme('neon')}>
                Tema Neon
            </button>
            <button className="theme-button blue" onClick={() => toggleTheme('lightsky')}>
                Tema Light Sky
            </button>
            <button className="theme-button dark" onClick={() => toggleTheme('dark')}>
                Tema Escuro
            </button>
            <button className="theme-button eight-bit" onClick={() => toggleTheme('8bit')}>
                Tema 8-bit
            </button>
            <button className="theme-button sakura" onClick={() => toggleTheme('sakura')}>
             Tema Sakura
            </button>

        </div>
    );
}

function App() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!document.querySelector('.theme-sakura')) return;
            
            const windowWidth = window.innerWidth;
            const mouseX = e.clientX;
            
            // Calcula a porcentagem da posição do mouse na tela
            const mousePercent = (mouseX / windowWidth) * 100;
            
            // Calcula o deslocamento baseado na posição do mouse
            // Quando o mouse está no centro (50%), o deslocamento é 0
            const offset = (mousePercent - 50) * 0.3;
            
            // Aplica o efeito parallax nas imagens
            const sakuraImage = document.querySelector('.sakura-image');
            const fujiImage = document.querySelector('.fuji-image');
            
            if (sakuraImage && fujiImage) {
                // Move a sakura na direção oposta ao mouse com menos intensidade
                sakuraImage.style.transform = `translateX(${-offset * 1.2}px)`;
                // Move o Fuji na mesma direção do mouse com mais intensidade
                fujiImage.style.transform = `translateX(${offset * 0.8}px)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <ThemeProvider>
            <div className="App">
                <ThemeButtons />
                <ChatApp />
            </div>
        </ThemeProvider>
    );
}

export default App;
