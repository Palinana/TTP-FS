import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchTransactions } from "../../store";

import TransactionTableItem from './transactionTableItem';

class Transactions extends Component {
    
    componentDidMount() {
        const { userId } = this.props;
        this.props.getTransactions(userId);
    }

    // changing the date format that comes from the DB
    purchaseDate = (date) => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let weekmonth = month[new Date().getMonth()];

        return `${weekmonth} ${ Number(date.slice(8)[0]) === 0 ? date.slice(9) : date.slice(8) }, ${date.slice(0,4)}`;
    }

    render() {
        const { transactions } = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-5 mb-5">
                        <span className="transactions__title">Transactions</span>
                    </div>

                    <div className="col-12 mt-3">
                        <table className="table">
                            <thead className="transactions__table-heading thead-inverse">
                                <tr>
                                    <th className="text-center">Type</th>
                                    <th className="text-center">Symbol</th>
                                    <th className="text-center">Quantity</th>
                                    <th className="text-center">Unit Price</th>
                                    <th className="text-center">Total</th>
                                    <th className="text-center">Purchase Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                { transactions && transactions.map((transaction, idx) => (
                                    <TransactionTableItem  
                                        transaction={transaction} 
                                        purchaseDate={this.purchaseDate(transaction.date)}
                                        key={idx}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapState = (state,ownProps) => {
    return {
        transactions: state.transactions.transactions
    };
};

const mapDispatch = dispatch => ({
    getTransactions: (id) => dispatch(fetchTransactions(id))
});

export default connect(mapState, mapDispatch)(Transactions);
