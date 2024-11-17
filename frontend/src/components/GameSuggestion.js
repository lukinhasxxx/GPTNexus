import React from 'react';
import './GameSuggestion.css';

const GameSuggestion = ({ games }) => {
    if (!games || games.length === 0) {
        return (
            <div className="game-suggestion-error p-4 text-center">
                <span className="error-icon text-5xl">🎮</span>
                <p className="text-xl text-gray-700">Não encontramos jogos na categoria escolhida.</p>
            </div>
        );
    }

    const getPlatformIcon = (platform) => {
        switch (platform.toLowerCase()) {
            case 'pc':
                return '💻';
            case 'ps5':
                return '🎮';
            case 'xbox':
                return '🎯';
            default:
                return '🕹️';
        }
    };

    return (
        <div className="game-suggestions-container max-w-7xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-extrabold text-gray-800">Jogos Sugeridos</h2>
                <div className="h-1 bg-gray-300 w-24 mx-auto my-4"></div>
            </div>

            <div className="suggestions-grid">
                {games.map((game, index) => (
                    <div key={index} className="game-card">
                        <div className="game-card-content">
                            <div className="game-header flex justify-between items-center mb-4">
                                <h3 className="text-2xl font-semibold text-gray-900">{game.name}</h3>
                                <span className="multiplayer-badge text-lg text-gray-600" title="Multiplayer">
                                    {game.multiplayer ? '👥' : '👤'}
                                </span>
                            </div>

                            <div className="game-synopsis-section mb-4">
                                <p className="text-gray-700">{game.synopsis}</p>
                            </div>

                            <div className="game-details mb-6">
                                <div className="platforms-list flex gap-2 mb-2">
                                    {game.platforms.map((platform, idx) => (
                                        <span key={idx} className="platform-tag text-gray-800 text-sm">
                                            {getPlatformIcon(platform)} {platform}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="price-tag text-lg text-gray-800">
                                {game.store}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameSuggestion;
