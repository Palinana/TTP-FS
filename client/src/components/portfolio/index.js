import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchStocks, purchaseStock, fetchError, fetchSuccess } from "../../store";

import UserPanel from './userPanel';
import Portfolio from './portfolio';
import PurchaseStock from './purchaseStock';

class PortfolioDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPortfolioValue: 0,
            ticker: '',
            quantity: '',
        };
    }

    componentDidMount() {
        const { userId } = this.props;
        this.props.getStocks(userId);
        this.props.getError("");
        this.props.getSuccess("");
    }

    handleChange = e => this.setState({ [e.target.name]: e.target.value });
    
    handleSubmit = e => {
        e.preventDefault();
        const { ticker, quantity } = this.state;
        const userStock = { ticker, quantity, id: this.props.userId, type: 'buy'}
        this.props.buyStock(userStock);
        this.setState({ ticker: '', quantity: '' });
    }

    getDate = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let weekDay = days[new Date().getDay()];
        let date = `${new Date().toString().slice(4,10)}, ${new Date().toString().slice(11,15)}`
        return { weekDay, date}
    }

    render() {
        const { user, stocks, error, success } = this.props;
        stocks.sort((a, b) => a.ticker !== b.ticker ? a.ticker < b.ticker ? -1 : 1 : 0);

        if(stocks){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-5 mb-5 mb-md-0">
                            <UserPanel user={user} weekDay={this.getDate().weekDay} date={this.getDate().date}/>
                        </div>
                        <div className="portfolio col-md-8 pr-md-5 mt-5">
                            <Portfolio stocks={stocks}/>
                        </div>

                        <div className="col-md-4 pl-md-5 mt-5">
                            <PurchaseStock 
                                handleSubmit={this.handleSubmit} 
                                onChange={this.handleChange}
                                tickerValue={this.state.ticker}
                                quantityValue={this.state.quantity}                            
                                error={error}
                                success={success}
                            />
                        </div>
                    </div>
                </div>
            )    
        }
        else {
            return <p>Loading...</p>
        }
    }
};
  
const mapState = (state,ownProps) => {
    console.log('state ', state)
    return {
      stocks: state.portfolio.stocks,
      userId: state.user.id,
      user: state.user,
      error: state.error.errorMessage,
      success: state.success.successMessage,
    };
};

const mapDispatch = dispatch => ({
    getStocks: (id) => dispatch(fetchStocks(id)),
    buyStock: (ticker, quantity, id) => {
        dispatch(purchaseStock(ticker, quantity, id))
    },
    getError: (data) => dispatch(fetchError(data)),
    getSuccess: (data) => dispatch(fetchSuccess(data))
});

export default connect(mapState, mapDispatch)(PortfolioDashboard);
