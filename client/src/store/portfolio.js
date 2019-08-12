import axios from 'axios';

const initialState = {
    stocks: []
};

const GET_STOCKS = 'GET_STOCKS';

const getStocks = stocks => ({
    type: GET_STOCKS,
    stocks,
});

export const fetchStocks = userId => {
    return dispatch => {
        axios
          .get(`api/users/${userId}/portfolio`)
          .then(res => {
            return res.data
          })
          .then(stocks => {
            dispatch(getStocks(stocks))
          })
          .catch(console.error)
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
  