import React from 'react';

const PortfolioTableItem = ({ stock }) => {
    return (
        <tr key={stock.id}>
            <td className="text-center">{stock.ticker.toUpperCase()}</td>
            <td className="stock__shares text-center">{stock.quantity} {stock.quantity > 1 ? 'shares' : 'share'}</td>
            <td className="text-center">
                <span className={stock.change}>{stock.latestPrice}</span>
            </td>
        </tr>
    );
};
  
export default PortfolioTableItem;
