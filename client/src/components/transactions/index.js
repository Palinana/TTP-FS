import React, { Component } from 'react';
import { connect } from 'react-redux';


class Transactions extends Component {
    
    render() {

        return (
            <div className="container">
                <div className="row">
                    Transactions
                </div>
            </div>
        )
    }
}
  
export default connect(null, null)(Transactions);