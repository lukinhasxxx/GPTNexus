import React from 'react';
import './GameInfo.css';

const GameInfo = ({ gameInfo, onNewSearch }) => {
    return (
        <div className="game-info">
            <h2>Informações do Jogo: {gameInfo.title}</h2>
            <p><strong>Plataforma:</strong> {gameInfo.platform}</p>
            <h3>Comparação de Preços</h3>
            <table className="price-comparison">
                <thead>
                <tr>
                    <th>Loja</th>
                    <th>Preço</th>
                </tr>
                </thead>
                <tbody>
                {gameInfo.priceComparison.map((item, index) => (
                    <tr key={index}>
                        <td>{item.store}</td>
                        <td>{item.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h3>Dicas</h3>
            <p>{gameInfo.tips}</p> {/* Exibindo dicas */}
            <h3>Rotas para Seguir</h3>
            <p>{gameInfo.routes}</p> {/* Exibindo rotas */}
        </div>
    );
};

export default GameInfo;
