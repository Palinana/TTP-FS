import React from 'react';
import PortfolioTable from './portfolioTable';

const Portfolio = ({ stocks }) => {
    if(stocks){
        let total = stocks.reduce((sum, item) =>{
            return sum + (parseFloat(item.latestPrice) * item.quantity);
        }, 0) 

        return (
            <div className="row">
                <div className="col-12 d-flex">
                    <div className="portfolio__title mr-auto">Portfolio Value :</div>
                    <h2 className="portfolio__money text-right">${Math.floor(total).toFixed(2)}</h2>
                </div>
                    <PortfolioTable stocks={stocks}/> 
            </div>
        )
    }
    else {
        return <p>Loading...</p>
    }
};
  
export default Portfolio;
