import React, { useState, useEffect } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import GameInfo from './components/GameInfo';
import { useTheme } from './ThemeContext';

const ChatApp = () => {
    const { theme } = useTheme();
    const [messages, setMessages] = useState([]);
    const [gameInfo, setGameInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0); // Para controlar as etapas do chat
    const [gameName, setGameName] = useState(""); // Para armazenar o nome do jogo

    useEffect(() => {
        if (theme === 'sakura') { // Verifica se o tema é "sakura"
            // Adiciona os elementos de background para o parallax
            const container = document.querySelector('.chat-container');
            if (!container) return;

            // Adiciona a imagem de Sakura ao fundo, caso ainda não tenha sido adicionada
            if (!document.querySelector('.sakura-image')) {
                const sakuraImg = document.createElement('div');
                sakuraImg.className = 'sakura-image';
                container.appendChild(sakuraImg);
            }
            
            // Adiciona a imagem do Monte Fuji ao fundo, caso ainda não tenha sido adicionada
            if (!document.querySelector('.fuji-image')) {
                const fujiImg = document.createElement('div');
                fujiImg.className = 'fuji-image';
                container.appendChild(fujiImg);
            }

            // Função para criar pétalas flutuantes
            const createPetal = () => {
                const petal = document.createElement('div');
                petal.className = 'sakura-petal';
                petal.style.left = `${Math.random() * 100}vw`; // Posição aleatória na tela
                petal.style.animationDuration = `${Math.random() * 3 + 4}s`; // Duração aleatória da animação
                petal.style.animationDelay = `${Math.random() * 5}s`; // Atraso aleatório da animação
                container.appendChild(petal);
                
                petal.addEventListener('animationend', () => {
                    petal.remove(); // Remove a pétala após o fim da animação
                    createPetal(); // Cria uma nova pétala
                });
            };

            // Cria 15 pétalas iniciais
            for (let i = 0; i < 15; i++) {
                createPetal();
            }
        }
    }, [theme]);


    useEffect(() => {
        // Exibir a primeira pergunta assim que o componente montar
        const initialQuestion = { sender: 'gpt', text: "Qual é o nome do jogo?" };
        setMessages([initialQuestion]);
    }, []);

    const handleSend = (message) => {
        const userMessage = { sender: 'user', text: message };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setIsLoading(true);

        setTimeout(() => {
            let gptMessage;

            if (step === 0) {
                // Armazena o nome do jogo
                setGameName(message);
                // Pergunta sobre a plataforma após o nome do jogo
                gptMessage = { sender: 'gpt', text: `Ótimo! Agora, qual plataforma você está usando para jogar "${message}"?` };
                setStep(1); // Avançar para a próxima etapa
            } else {
                // Aqui você pode definir as informações do jogo para exibir
                const platform = message; // A plataforma é a resposta do usuário
                const gameInfoData = {
                    title: gameName, // Usa o nome do jogo armazenado
                    platform: platform,
                    priceComparison: [
                        { store: "Steam", price: "$29.99" },
                        { store: "Epic Games", price: "$19.99" },
                    ],
                    tips: "Dica: Sempre verifique as avaliações antes de comprar o jogo!",
                    routes: "Para avançar, você pode explorar a loja Steam ou a Epic Games.",
                };

                setGameInfo(gameInfoData);

                // Exibir mensagem final com as informações do jogo
                gptMessage = { sender: 'gpt', text: `Aqui estão as informações para o jogo "${gameInfoData.title}".` };
                setStep(2); // Avançar para a etapa de informações do jogo
            }

            setMessages((prevMessages) => [...prevMessages, gptMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleNewSearch = () => {
        // Reinicia todos os estados para permitir uma nova busca
        setMessages([]);
        setGameInfo(null);
        setIsLoading(false);
        setStep(0);
        setGameName("");

        // Reexibir a pergunta inicial
        const initialQuestion = { sender: 'gpt', text: "Qual é o nome do jogo?" };
        setMessages([initialQuestion]);
    };

    return (
        <div className={`chat-container theme-${theme}`}> {/* Aplicando o tema no container */}
            <h1 className="chat-title">Explorador de jogos</h1>
            <div className="chat-window">
                <ChatMessages messages={messages} />
                {(step === 0 || step === 1) && <ChatInput onSend={handleSend} />}
                {isLoading && <div className="loading">Carregando informações...</div>}
            </div>
            {gameInfo && (
                <>
                    <GameInfo gameInfo={gameInfo} />
                    <button className="new-search-button" onClick={handleNewSearch}>
                        Fazer nova busca
                    </button>
                </>
            )}
        </div>
    );
};

export default ChatApp;
