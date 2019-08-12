import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStocks } from "../../store";

import PortfolioTable from './portfolioTable';

class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPortfolioValue: 0,
        };
    }

    componentDidMount() {
        const { userId } = this.props;
        this.props.getStocks(userId);
    }

    calculatePortfolioValue() { 

    }

    render() {
        const { stocks } = this.props;

        if(stocks){
            return (
                <div className="row">
                    <div className="col-12 d-flex">
                        <div className="portfolio__title mr-auto">Portfolio</div>
                        <h2 className="portfolio__money text-right">$5000.00</h2>
                    </div>
                    { stocks.length ? 
                        <PortfolioTable stocks={stocks}/> 
                        : 
                        <div className="col-12 d-flex">
                            <div className="m-auto">You don't have any stocks yet</div>
                        </div>
                    }
                </div>
            )
        }
        else {
            return <p>Loading...</p>
        }
    }
}
  
const mapState = state => {
    console.log('state ', state)
    return {
      stocks: state.portfolio.stocks,
      userId: state.user.id,
      name: state.user.name
    };
};

const mapDispatch = dispatch => ({
    getStocks: (id) => dispatch(fetchStocks(id)),
});

export default connect(mapState, mapDispatch)(Portfolio);
