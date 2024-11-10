import React from 'react';
import './App.css';
import './themes/originalTheme.css';
import './themes/neonTheme.css'; //temas neon dark etc que serao implementados
import './themes/blueTheme.css';
import './themes/darkTheme.css';
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
            <button className="theme-button blue" onClick={() => toggleTheme('blue')}>
                Tema Teste
            </button>
            <button className="theme-button dark" onClick={() => toggleTheme('dark')}>
                Tema Escuro
            </button>
        </div>
    );
}

function App() {
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
