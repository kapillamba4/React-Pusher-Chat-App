import constants from '../Constants';

const { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, CONNECT, DISCONNECT, CONNECTION_REQUEST,
  CREATE_USER_SUCCESS, CREATE_USER_FAILURE, CREATE_USER } = constants;

const defaultState = {
  user: null,
  roomId: null,
  username: null,
  name: null,
  createUserStarted: false,
  loginStarted: false,
  credentials: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginStarted: true
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        credentials: action.payload,
        loginStarted: false
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loginStarted: false
      };
    case CONNECT:
      return {
        ...state,
        user: action.payload
      };
    case DISCONNECT:
      return {
        ...state,
        user: null
      };
    case CONNECTION_REQUEST:
      return {
        ...state
      };
    case CREATE_USER:
      return {
        ...state,
        createUserStarted: true
      };
    case CREATE_USER_SUCCESS:
      const { username, name } = action.payload;
      return {
        ...state,
        createUserStarted: false,
        username,
        name
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        createUserStarted: false
      };
    default:
      return state;
  }
}