const initialState = {
    successMessage: ''
}

const GET_SUCCESS = 'GET_SUCCESS';

const getSuccess = successMessage => ({
    type: GET_SUCCESS,
    successMessage,
});


export const fetchSuccess = (data) => async dispatch => {
    try {
        dispatch(getSuccess(data))
    } catch (error) {
        console.error(error)
    }
};

// reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_SUCCESS:
            return { ...state, successMessage: action.successMessage};
        default:
            return state;
    }
}


  
  