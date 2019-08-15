const initialState = {
    errorMessage: ''
}


const GET_ERROR = 'GET_ERROR';

const getError = errorMessage => ({
    type: GET_ERROR,
    errorMessage,
});

export const fetchError = (data) => async dispatch => {
    try {
        dispatch(getError(data))
    } catch (error) {
        console.error(error)
    }
};

// reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ERROR:
            return { ...state, errorMessage: action.errorMessage};
        default:
            return state;
    }
}


  
  