import React from 'react';

const PurchaseStock = ({ handleSubmit, onChange, tickerValue, quantityValue, error, success }) => {
    // const last = null;
    return (
        <div className="row">
            <div className="col-md-12 mb-5">
                <span className="purchase__title">Purchase Stocks</span>
            </div>
            <div className="col-md-12">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="ticker"
                            className="form-control form-control-lg font-weight-light"
                            placeholder="Stock Name"
                            required
                            value={tickerValue}
                            onChange={onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="number"
                            name="quantity"
                            min="1"
                            className="form-control form-control-lg font-weight-light"
                            placeholder="Quantity"
                            required
                            value={quantityValue}
                            onChange={onChange}
                        />
                    </div>  
                    {error && <div className="form-error"> {error} </div>}
                    {success && <div className="form-success"> {success} </div>}

                    <div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block font-weight-light">Purchase</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PurchaseStock;

