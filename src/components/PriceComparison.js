import React from 'react';
import './PriceComparison.css';

const PriceComparison = ({ prices }) => {
    return (
        <div className="price-comparison">
            <h3>Comparação de Preços</h3>
            <ul>
                {prices.map((price, index) => (
                    <li key={index}>{price.loja}: R${price.valor}</li>
                ))}
            </ul>
        </div>
    );
};

export default PriceComparison;
