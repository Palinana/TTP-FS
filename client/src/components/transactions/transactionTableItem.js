import React from 'react';

const TransactionListItem = ({ transaction, purchaseDate }) => {
    return (
        <tr>
            <td className="transaction__type text-center">{transaction.type.toUpperCase()}</td>
            <td className="text-center">{transaction.ticker.toUpperCase()}</td>
            <td className="transaction__quantity text-center">{transaction.quantity} {transaction.quantity> 1 ? 'shares' : 'share'}</td>
            <td className="text-center">${transaction.price}</td>
            <td className="transaction__total text-center">${Math.floor(transaction.quantity * transaction.price).toFixed(2)}</td>
            <td className="text-center">{purchaseDate}</td>
        </tr>
    );
};
  
export default TransactionListItem;