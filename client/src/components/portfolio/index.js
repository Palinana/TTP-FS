import React from 'react';
import Portfolio from './portfolio';

const PortfolioDashboard = props => {
    return (
        <div className="container">
            <div className="row">
                <div className="portfolio col-md-8 pr-md-5 mt-5">
                    <Portfolio/>
                </div>

                <div className="col-md-4 pl-md-5 mt-5">
                    Purchase Stocks
                </div>
            </div>
        </div>
    );
};
  
export default PortfolioDashboard;