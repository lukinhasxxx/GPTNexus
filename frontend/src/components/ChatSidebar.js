import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, X } from 'lucide-react';
import './ChatSidebar.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatSidebar = ({ onSelectHistory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLogs = async () => {
        if (!isOpen) return;

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/logs');
            let data = response.data;

            if (data.logs && Array.isArray(data.logs)) {
                setLogs(data.logs);
            } else {
                setError('Formato de dados inválido');
            }
        } catch (err) {
            setError('Erro ao carregar histórico de conversas');
            console.error('Erro ao buscar logs:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [isOpen]);

    const copyToClipboard = (log) => {
        const inputString = log.prompt;
        let textToCopy = '';

        if (inputString && typeof inputString === 'string') {
            const regex = /(game|duads)\s+\[([^\]]+)\]/;
            const match = inputString.match(regex);

            textToCopy = match ? match[2] : inputString;
        }

        if (textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                toast.success("Texto copiado com sucesso!");
            }).catch((err) => {
                console.error('Erro ao copiar o texto:', err);
            });
        }
    };

    return (
        <div className="drawer-container">
            <div className="drawer-header">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="drawer-toggle"
                    aria-label="Toggle history drawer"
                >
                    <Menu size={24} />
                </button>
                <span className="drawer-title">Histórico</span>

                {isOpen && (
                    <button
                        onClick={() => setIsOpen(false)}
                        className="drawer-close"
                        aria-label="Fechar histórico"
                    >
                        <X size={24} />
                    </button>
                )}
            </div>

            <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
                <div className="drawer-content">
                    {isLoading ? (
                        <div className="drawer-loading">
                            <div className="loading-spinner"></div>
                            <span>Carregando histórico...</span>
                        </div>
                    ) : error ? (
                        <div className="drawer-error">
                            {error}
                        </div>
                    ) : (
                        <div className="history-list">
                            <div className="history-list-header">
                                <h3 className="history-list-title">Logs do Histórico</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="drawer-close"
                                    aria-label="Fechar histórico"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {logs.length > 0 ? (
                                logs.map((log) => (
                                    <button
                                        key={log.cod_id}
                                        onClick={() => copyToClipboard(log)}
                                        className="history-item"
                                    >
                                        <div className="history-card">
                                            <span className="history-title">
                                                {
                                                    (() => {
                                                        const inputString = log.prompt;

                                                        if (inputString && typeof inputString === 'string') {
                                                            const regex = /(game|duads)\s+\[([^\]]+)\]/;
                                                            const match = inputString.match(regex);

                                                            const searchTerm = match ? match[2] : null;

                                                            const prompt = log.prompt && log.prompt.length > 80
                                                                ? log.prompt.slice(0, 80) + '...'
                                                                : log.prompt || 'Texto não disponível';

                                                            return searchTerm ? searchTerm : prompt;
                                                        }
                                                        return 'Texto não disponível';
                                                    })()
                                                }
                                            </span>
                                            <span className="history-date">
                                                {new Date(log.date).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
                                            </span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="no-history">
                                    Nenhum chat encontrado
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} />
        </div>
    );
};

export default ChatSidebar;
