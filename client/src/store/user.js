import axios from 'axios';
import history from '../history';

const GET_USER = 'GET_USER';
const REMOVE_USER = 'REMOVE_USER';

const defaultUser = {};

const getUser = user => ({type: GET_USER, user});
const removeUser = () => ({type: REMOVE_USER});

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/login', {
      email,
      password,
    });
  } catch (error) {
    return dispatch(getUser({ error }));
  }
  try {
    dispatch(getUser(res.data));
    history.push('/portfolio');
  } catch (error) {
    console.error(error);
  }
};

export const signup = (username, email, password) => async dispatch => {
  let res;
  try {
    res = await axios.post('/auth/signup', {
      username,
      email,
      password,
    });
  } catch (error) {
    return dispatch(getUser({ error }));
  }

  try {
    dispatch(getUser(res.data));
    history.push('/portfolio');
  } catch (error) {
    console.error(error);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
