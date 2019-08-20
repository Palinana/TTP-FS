import React from 'react';
import PortfolioTableItem from './portfolioTableItem';

const PortfolioTable = ({ stocks }) => {
    if(stocks.length){
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
                        { 
                            stocks.map((stock, idx) => (
                                <PortfolioTableItem stock={stock} key={idx}/>
                            ))                       
                        }
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return null
    }
};
  
export default PortfolioTable;
