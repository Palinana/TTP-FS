import React from 'react';
import PortfolioTableItem from './portfolioTableItem';

const PortfolioTable = ({ stocks }) => {
    return (
        <div className="col-12 mt-3">
            <table className="table">
                <thead className="portfolio__table-heading thead-inverse">
                    <tr>
                        <th className="text-center">Symbol</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Latest Price</th>
                    </tr>
                </thead>
                <tbody>
                    { stocks ? (
                        stocks.map((stock, idx) => (
                            <PortfolioTableItem stock={stock} key={idx}/>
                        ))
                        ) : (
                        <p>Loading...</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};
  
export default PortfolioTable;
