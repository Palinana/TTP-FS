// import axios from 'axios';
// import { fetchStocks, me, fetchError, fetchSuccess } from "./index";

// const initialState = {
//     transactions: []
// }

// const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

// const BUY_STOCK = 'BUY_STOCK';

// const getTransactions = transactions => ({
//     type: GET_TRANSACTIONS,
//     transactions,
// });

// const buyStock = transaction => ({
//     type: BUY_STOCK,
//     transaction,
// });

// export const fetchTransactions = userId => async dispatch => {
//     try {
//         const { data } = await axios.get(`api/users/${userId}/transactions`)
//         dispatch(getTransactions(data))
//     } catch (error) {
//         console.error(error)
//     }
// };

// export const purchaseStock = transactionData => async dispatch => {
//     let res;
//     try {
//         res = await axios.post('api/transactions', transactionData);
//     } catch (error) {
//         // in case if there is an error with user input, the error message will be sent and placed under transactions -> error
//         return dispatch(fetchError( error.response.data ));
//     }
//     // otherwise, a new transaction will be placed
//     try {
//         dispatch(buyStock(res.data));
//         dispatch(fetchStocks(transactionData.id)) //updating stocks data
//         dispatch(fetchTransactions(transactionData.id)) //updating transactions data
//         dispatch(me()) //updating user data(balance)
//         console.log('res.data ', transactionData)
//         dispatch(fetchSuccess(`You successfully purchased  ${transactionData.quantity} ${transactionData.quantity > 1 ? 'shares' : 'share'} of ${transactionData.ticker.toUpperCase()}!`)) 

//         // dispatch(fetchSuccess('Successfully purchased!')) 
//       } catch (error) {
//         console.error(error);
//     }
// };

// // reducer
// export default function(state = initialState, action) {
//     switch (action.type) {
//         case GET_TRANSACTIONS:
//             return { ...state, transactions: action.transactions};
//         case BUY_STOCK:
//             return {
//                 ...state,
//                 transactions: [...state.transactions, action.transaction],
//             };
//         default:
//             return state;
//     }
// }


  
  
import axios from 'axios';
import { fetchStocks, me, fetchMessage } from "./index";

const initialState = {
    transactions: []
}

const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

const BUY_STOCK = 'BUY_STOCK';

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
        return dispatch(fetchMessage( error.response.data, 'form-error' ));
    }
    // otherwise, a new transaction will be placed
    try {
        dispatch(buyStock(res.data));
        dispatch(fetchStocks(transactionData.id)) //updating stocks data
        dispatch(fetchTransactions(transactionData.id)) //updating transactions data
        dispatch(me()) //updating user data(balance)
        console.log('res.data ', transactionData)
        dispatch(fetchMessage(`You successfully purchased  ${transactionData.quantity} ${transactionData.quantity > 1 ? 'shares' : 'share'} of ${transactionData.ticker.toUpperCase()}!`, 'form-success')) 

        // dispatch(fetchSuccess('Successfully purchased!')) 
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
        default:
            return state;
    }
}


  
  