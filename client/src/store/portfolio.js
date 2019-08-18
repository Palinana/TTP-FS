import axios from 'axios';

const initialState = {
    stocks: []
};

const GET_STOCKS = 'GET_STOCKS';

const getStocks = stocks => ({
    type: GET_STOCKS,
    stocks,
});

export const fetchStocks = userId => async dispatch => {
    try {
        const { data } = await axios.get(`api/users/${userId}/portfolio`);
        let userPortfolioStocks = [];
        userPortfolioStocks = await Promise.all(
            data.map(async stock => {
                const { data } = await axios.get(`/api/transactions/${stock.ticker}`);

                let change;
                if(data.open < data.latestPrice) change = "stock-up"
                if(data.open > data.latestPrice) change = "stock-down"
                if(data.open === data.latestPrice) change = "stock-same"

                return {
                    ticker: stock.ticker,
                    quantity: stock.quantity,
                    latestPrice: data.latestPrice,
                    change
                };
          })
        );
        dispatch(getStocks(userPortfolioStocks))
    } catch (error) {
        console.error(error)
    }
};

// reducer
export default function(state = initialState, action) {
    switch (action.type) {
      case GET_STOCKS:
        return { ...state, stocks: action.stocks};
      default:
        return state;
    }
}
  