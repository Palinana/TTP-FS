import React from 'react';
import PortfolioTableItem from './portfolioTableItem';

const PortfolioTable = ({ stocks }) => {
    return (
        <div className="col-12 mt-3">
            <table className="table">
                <tbody>
                    { stocks ? (
                        stocks.map(stock => (
                            <PortfolioTableItem stock={stock}/>
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