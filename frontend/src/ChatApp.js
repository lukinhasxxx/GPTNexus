import React, { useState, useEffect } from 'react';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import GameSuggestion from './components/GameSuggestion';
import GameGuide from './components/GameGuide';
import { useTheme } from './ThemeContext';
import { onBuscaApi } from './network/OnBuscaApi';

const ChatApp = () => {
    const { theme } = useTheme();
    const [messages, setMessages] = useState([]);
    const [gameInfo, setGameInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [gameName, setGameName] = useState("");
    const [genre, setGenre] = useState("");
    const [option, setOption] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initialQuestion = {
            sender: 'giminine',
            text: "Você gostaria de um guia de jogo ou uma sugestão de jogo?"
        };
        setMessages([initialQuestion]);
    }, []);

    const processResponse = async (option, value) => {
        try {
            if (option === "guia") {
                const guideData = await onBuscaApi(value, "guide", setIsLoading, setError);
                console.log("Dados do guia recebidos da API:", guideData);

                // Verifica se os dados estão no formato esperado
                if (typeof guideData === 'string') {
                    try {
                        const parsedData = JSON.parse(guideData);
                        setGameInfo(parsedData);
                    } catch (e) {
                        console.error("Erro ao fazer parse dos dados do guia:", e);
                        setError("Erro ao processar os dados do jogo");
                        return;
                    }
                } else {
                    setGameInfo(guideData);
                }
                setShowComponent(true);
            } else if (option === "sugestao") {
                const suggestionsData = await onBuscaApi(value, "suggestion", setIsLoading, setError);
                console.log("Dados de sugestões recebidos da API:", suggestionsData);

                // Verifica se os dados estão no formato esperado
                if (typeof suggestionsData === 'string') {
                    try {
                        const parsedData = JSON.parse(suggestionsData);
                        if (parsedData.games && Array.isArray(parsedData.games)) {
                            setSuggestions(parsedData.games);
                        } else {
                            console.error("Dados de sugestões não contêm array de jogos:", parsedData);
                            setError("Formato de dados de sugestões inválido");
                            return;
                        }
                    } catch (e) {
                        console.error("Erro ao fazer parse dos dados de sugestões:", e);
                        setError("Erro ao processar as sugestões de jogos");
                        return;
                    }
                } else if (suggestionsData.games && Array.isArray(suggestionsData.games)) {
                    setSuggestions(suggestionsData.games);
                } else {
                    console.error("Formato de dados de sugestões inválido:", suggestionsData);
                    setError("Formato de dados de sugestões inválido");
                    return;
                }
                setShowComponent(true);
            }
        } catch (error) {
            let errorMessage;
            if (error.response) {
                const status = error.response.status;
                if (status === 400) {
                    errorMessage = {
                        sender: 'giminine',
                        text: "Houve um erro na sua solicitação. Por favor, verifique os dados e tente novamente."
                    };
                } else if (status === 500) {
                    errorMessage = {
                        sender: 'giminine',
                        text: "Desculpe, houve um erro no servidor. Tente novamente mais tarde."
                    };
                } else {
                    errorMessage = {
                        sender: 'giminine',
                        text: "Desculpe, ocorreu um erro inesperado. Tente novamente."
                    };
                }
            } else if (error.request) {
                errorMessage = {
                    sender: 'giminine',
                    text: "Desculpe, não conseguimos se comunicar com o servidor. Tente novamente mais tarde."
                };
            } else {
                errorMessage = {
                    sender: 'giminine',
                    text: "Desculpe, ocorreu um erro desconhecido. Tente novamente mais tarde."
                };
            }
            setMessages(prev => [...prev, errorMessage]);
            setShowComponent(false);
        }
    };

    const handleSend = async (message) => {
        const userMessage = { sender: 'user', text: message };
        setMessages(prev => [...prev, userMessage]);

        try {
            if (step === 0) {
                const lowercaseMsg = message.toLowerCase();
                if (lowercaseMsg === "guia" || lowercaseMsg === "sugestão" || lowercaseMsg === "sugestao") {
                    setOption(lowercaseMsg === "guia" ? "guia" : "sugestao");
                    const nextQuestion = lowercaseMsg === "guia"
                        ? "Qual é o nome do jogo que você quer o guia?"
                        : "Qual gênero de jogo você prefere (ação, aventura, RPG, etc)?";

                    const gptMessage = { sender: 'giminine', text: nextQuestion };
                    setMessages(prev => [...prev, gptMessage]);
                    setStep(1);
                } else {
                    const gptMessage = {
                        sender: 'giminine',
                        text: "Por favor, responda apenas 'guia' ou 'sugestão'."
                    };
                    setMessages(prev => [...prev, gptMessage]);
                }
            } else if (step === 1) {
                setIsLoading(true);
                if (option === "guia") {
                    setGameName(message);
                    await processResponse("guia", message);
                } else {
                    setGenre(message);
                    await processResponse("sugestao", message);
                }
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Erro ao processar mensagem:", error);
            const errorMessage = {
                sender: 'giminine',
                text: "Desculpe, ocorreu um erro ao processar sua solicitação."
            };
            setMessages(prev => [...prev, errorMessage]);
            setIsLoading(false);
        }
    };

    const handleNewSearch = () => {
        setMessages([]);
        setGameInfo(null);
        setSuggestions([]);
        setIsLoading(false);
        setStep(0);
        setGameName("");
        setGenre("");
        setOption("");
        setShowComponent(false);
        setError(null);

        const initialQuestion = {
            sender: 'giminine',
            text: "Você gostaria de um guia de jogo ou uma sugestão de jogo?"
        };
        setMessages([initialQuestion]);
    };

    return (
        <div className={`chat-container theme-${theme}`}>
            <h1 className="chat-title">Explorador de jogos</h1>
            <div className="chat-window">
                <ChatMessages messages={messages} />
                {!showComponent && <ChatInput onSend={handleSend} disabled={isLoading} />}
                {isLoading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Buscando informações...</p>
                    </div>
                )}
                {error && <div className="error-message">{error}</div>}
            </div>

            {showComponent && (
                <div className="result-container">
                    {option === "guia" && gameInfo && (
                        <>
                            {console.log("Renderizando GameGuide com dados:", gameInfo)}
                            <GameGuide game={gameInfo} />
                        </>
                    )}
                    {option === "sugestao" && suggestions.length > 0 && (
                        <>
                            {console.log("Renderizando GameSuggestion com dados:", suggestions)}
                            <GameSuggestion games={suggestions} />
                        </>
                    )}
                    <button
                        className="new-search-button"
                        onClick={handleNewSearch}
                    >
                        Fazer nova busca
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChatApp;