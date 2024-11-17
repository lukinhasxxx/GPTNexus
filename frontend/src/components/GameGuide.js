import React from 'react';
import './GameGuide.css';

const GameGuide = ({ game }) => {
    console.log("GameGuide recebeu os dados:", game);

    if (!game) {
        console.error("Não foi possível processar os dados do jogo");
        return <p className="text-red-600 p-4">Erro ao processar dados do jogo.</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-xl hover:scale-105 transform transition-all duration-300">
            <div className="mb-6 text-center">
                <h2 className="text-4xl font-extrabold text-white mb-2">{game.name}</h2>
                <div className="h-1 bg-gray-200 my-4 mx-auto w-1/4"></div>
                <p className="text-lg text-gray-300">{game.story}</p>
            </div>

            <div className="space-y-8">
                {game.continuation && (
                    <div className="flex gap-6 items-center">
                        <div className="text-5xl text-white">🔄</div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-100 mb-2">Continuação</h3>
                            <p className="text-lg text-gray-300">{game.continuation}</p>
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex gap-6 items-center">
                        <div className="text-5xl text-white">🗺️</div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-100 mb-2">Mapas</h3>
                            <p className="text-lg text-gray-300">{game.maps}</p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-center">
                        <div className="text-5xl text-white">⚔️</div>
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-100 mb-2">Equipamentos</h3>
                            <p className="text-lg text-gray-300">{game.equipment}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameGuide;
