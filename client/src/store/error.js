const initialState = {
    error: ''
}


const GET_ERROR = 'GET_ERROR';

const getError = error => ({
    type: GET_ERROR,
    error,
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
            return { ...state, error: action.error};
        default:
            return state;
    }
}


  
  