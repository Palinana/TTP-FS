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
        const { data } = await axios.get(`api/users/${userId}/portfolio`)
        dispatch(getStocks(data))
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
  