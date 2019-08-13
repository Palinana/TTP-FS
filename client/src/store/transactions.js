import axios from 'axios';
import { fetchStocks } from "./index";

const initialState = {
    transactions: [],
    error: ''
}

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

const BUY_STOCK = 'BUY_STOCK';

const GET_ERROR = 'GET_ERROR';

const getError = error => ({
    type: GET_ERROR,
    error,
});

const getTransactions = transactions => ({
    type: GET_TRANSACTIONS,
    transactions,
});

const buyStock = transaction => ({
    type: BUY_STOCK,
    transaction,
});


export const fetchTransactions = userId => async dispatch => {
    try {
        const { data } = await axios.get(`api/users/${userId}/transactions`)
        dispatch(getTransactions(data))
    } catch (error) {
        console.error(error)
    }
};

export const purchaseStock = transactionData => async dispatch => {
    let res;
    try {
        res = await axios.post('api/transactions', transactionData);
    } catch (error) {
        // in case if there is an error with user input, the error message will be sent and placed under transactions -> error
        return dispatch(getError( error.response.data ));
    }
    // otherwise, a new transaction will be placed
    try {
        dispatch(buyStock(res.data));
        dispatch(fetchStocks(transactionData.id))
      } catch (error) {
        console.error(error);
    }
};

// reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_TRANSACTIONS:
            return { ...state, transactions: action.transactions};
        case BUY_STOCK:
            return {
                ...state,
                transactions: [...state.transactions, action.transaction],
            };
        case GET_ERROR:
            return { ...state, error: action.error};
        default:
            return state;
    }
}

  
  