import React, { Component } from 'react';
import { connect } from 'react-redux';

class PurchaseStock extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    //handle submit

    render() {

        return (
            <div className="row">
                <div className="col-md-12 mb-5">
                    <span className="purchase__title">Purchase Stocks</span>
                </div>
                <div className="col-md-12">
                    <form>
                        <div className="form-group">
                            <input
                                type="text"
                                name="ticker"
                                className="form-control form-control-lg font-weight-light"
                                placeholder="Stock Name"
                                required
                                autoFocus
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                name="quantity"
                                className="form-control form-control-lg font-weight-light"
                                placeholder="Quantity"
                                required
                            />
                        </div>
                        
                        <div>
                            <button type="submit" className="btn btn-lg btn-primary btn-block font-weight-light">Purchase</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
  
const mapState = state => {
    return {
      stocks: state.portfolio.stocks,
      userId: state.user.id,
      name: state.user.name
    };
};

const mapDispatch = dispatch => ({});

export default connect(mapState, mapDispatch)(PurchaseStock);
