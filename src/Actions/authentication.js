import cookie from 'react-cookies'
import constants from '../Constants/index';
import axios from 'axios';
import {ChatManager, TokenProvider} from "@pusher/chatkit";

const chatManager = (userId) => (new ChatManager({
  instanceLocator: "v1:us1:3d6a9494-51ec-4bd8-98b7-237759fd1b45",
  userId,
  tokenProvider: new TokenProvider({
    url: `https://us1.pusherplatform.io/services/chatkit_token_provider/v1/3d6a9494-51ec-4bd8-98b7-237759fd1b45/token`
  })
}));

const { LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE,
  CONNECT, DISCONNECT, CONNECTION_REQUEST,
  CREATE_USER_FAILURE, CREATE_USER_SUCCESS, CREATE_USER, RESET_STORE} = constants;

export default {
  checkAuth: (username) => {
    return (dispatch) => {
      // const username = cookie.load('username');
      dispatch({
        type: LOGIN_USER_SUCCESS,
        username
      });
    }
  },
  login: (dispatch) => {
    dispatch({ type: LOGIN_USER });

  },
  createUser: ({ name, username }) => {
    return (dispatch) => {
      dispatch({ type: CREATE_USER });

      axios.post(`https://react-test-1.glitch.me/create/user`, {
        id: username,
        name: name
      })
        .then((response) => {
          console.log(response);
          dispatch({ type: CREATE_USER_SUCCESS, payload: { name, username } })
        })
        .catch((error) => {
          console.error(error);
          dispatch({ type: CREATE_USER_FAILURE })
        });
    }
  },
  connect: (userId) => {
    return (dispatch) => {
      dispatch({ type: CONNECTION_REQUEST });

      chatManager(userId).connect()
        .then(currentUser => {
          console.log(`Successful connection ${currentUser}`);
          dispatch({ type: CONNECT, payload: currentUser });
        })
        .catch(err => {
          console.error(`Error on connection ${err}`);
          dispatch({ type: DISCONNECT });
        });
    }
  },
  disconnect: (dispatch) => {
    dispatch({ type: DISCONNECT });
  },
  resetStoreAuth: () => {
    return (dispatch) => {
      dispatch({ type: RESET_STORE });
    }
  }
}

