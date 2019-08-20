const initialState = {
    message: '',
    color: ''
}

const GET_MESSAGE = 'GET_MESSAGE';

const getMessage = ( message, color )  => ({
    type: GET_MESSAGE,
    message,
    color
});


export const fetchMessage = (data, color) => async dispatch => {
    try {
        dispatch(getMessage(data, color))
    } catch (error) {
        console.error(error)
    }
};

// reducer
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_MESSAGE:
            return { ...state, message: action.message, color: action.color};
        default:
            return state;
    }
}
