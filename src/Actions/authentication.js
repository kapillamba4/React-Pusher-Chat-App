import cookie from 'react-cookies';
import constants from '../Constants/index';
import axios from 'axios';
import { ChatManager, TokenProvider } from '@pusher/chatkit';

const {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  CONNECT,
  DISCONNECT,
  CONNECTION_REQUEST,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  CREATE_USER,
  RESET_STORE,
  INSTANCE_LOCATOR,
  TOKEN_PROVIDER_URL,
  BASE_SERVER_URL,
} = constants;

const chatManager = userId =>
  new ChatManager({
    instanceLocator: INSTANCE_LOCATOR,
    userId,
    tokenProvider: new TokenProvider({
      url: TOKEN_PROVIDER_URL,
    }),
  });

export default {
  checkAuth: username => {
    return dispatch => {
      // const username = cookie.load('username');
      dispatch({
        type: LOGIN_USER_SUCCESS,
        username,
      });
    };
  },
  login: dispatch => {
    dispatch({ type: LOGIN_USER });
  },
  createUser: ({ name, username }) => {
    return dispatch => {
      dispatch({ type: CREATE_USER });

      axios
        .post(`${BASE_SERVER_URL}create/user`, {
          id: username,
          name: name,
        })
        .then(response => {
          console.log(response);
          dispatch({ type: CREATE_USER_SUCCESS, payload: { name, username } });
        })
        .catch(error => {
          console.error(error);
          dispatch({ type: CREATE_USER_FAILURE });
        });
    };
  },
  connect: userId => {
    return dispatch => {
      dispatch({ type: CONNECTION_REQUEST });

      chatManager(userId)
        .connect()
        .then(currentUser => {
          console.log(`Successful connection ${currentUser}`);
          dispatch({ type: CONNECT, payload: currentUser });
        })
        .catch(err => {
          console.error(`Error on connection ${err}`);
          dispatch({ type: DISCONNECT });
        });
    };
  },
  disconnect: dispatch => {
    dispatch({ type: DISCONNECT });
  },
  resetStoreAuth: () => {
    return dispatch => {
      dispatch({ type: RESET_STORE });
    };
  },
};
