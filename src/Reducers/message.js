import constants from '../Constants';

const { ADD_MESSAGE, ADD_MESSAGE_SUCCESS, ADD_MESSAGE_FAILURE,
  CHANGE_CHANNEL, CHANGE_CHANNEL_SUCCESS, CHANGE_CHANNEL_FAILURE,
  LOAD_MESSAGES_SUCCESS, LOAD_MESSAGES, LOAD_MESSAGES_FAILURE,
  LOAD_CHANNELS, LOAD_CHANNELS_SUCCESS, LOAD_CHANNELS_FAILURE, CREATE_CHANNEL,
  CREATE_CHANNEL_SUCCESS, CREATE_CHANNEL_FAILURE, RECEIVE_MESSAGE } = constants;

const defaultState = {
  addMessageStarted: false,
  changeChannelStarted: false,
  loadChannelsStarted: false,
  loadMessagesStarted: false,
  createChannelStarted: false,
  messages: [],
  channelsList: [],
  currentChannel: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        addMessageStarted: true
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        addMessageStarted: false
      };
    case ADD_MESSAGE_FAILURE:
      return {
        ...state,
        messages: [],
        addMessageStarted: false
      };
    case CHANGE_CHANNEL:
      return {
        ...state,
        changeChannelStarted: true
      };
    case CHANGE_CHANNEL_SUCCESS:
      return {
        ...state,
        currentChannel: action.payload,
        changeChannelStarted: false
      };
    case CHANGE_CHANNEL_FAILURE:
      return {
        ...state,
        changeChannelStarted: false
      };
    case LOAD_CHANNELS:
      return {
        ...state,
        loadChannelsStarted: true
      };
    case LOAD_CHANNELS_SUCCESS:
      return {
        ...state,
        channelsList: action.payload,
        loadChannelsStarted: false
      };
    case LOAD_CHANNELS_FAILURE:
      return {
        ...state,
        channelsList: [],
        loadChannelsStarted: false
      };
    case LOAD_MESSAGES:
      return {
        ...state,
        loadMessagesStarted: true
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload,
        loadMessagesStarted: false
      };
    case LOAD_MESSAGES_FAILURE:
      return {
        ...state,
        loadMessagesStarted: false
      };
    case CREATE_CHANNEL:
      return {
        ...state,
        createChannelStarted: true
      };
    case CREATE_CHANNEL_SUCCESS:
      return {
        ...state,
        channelsList: [action.payload, ...state.channelsList],
        createChannelStarted: false
      };
    case CREATE_CHANNEL_FAILURE:
      return {
        ...state,
        createChannelStarted: false
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};