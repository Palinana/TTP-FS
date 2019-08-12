import React from 'react';

const PortfolioTableItem = ({ stock }) => {
    return (
        <tr key={stock.id}>
            <td>{stock.ticker}</td>
            <td className="stock__shares text-center">{stock.quantity} {stock.quantity > 1 ? 'shares' : 'share'}</td>
            <td className="text-right">
                <span></span>
            </td>
        </tr>
    );
};
  
export default PortfolioTableItem;