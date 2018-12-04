import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import socket from './socket'

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE'
const INPUT_NAME = 'INPUT_NAME'

export const gotMessagesFromServer = (messages) => ({
  type: GOT_MESSAGES_FROM_SERVER,
  messages
})
export const gotNewMessageFromServer = (message) => ({
  type: GOT_NEW_MESSAGE_FROM_SERVER,
  message
})
export const writeMessage = (inputContent) => ({
  type: WRITE_MESSAGE,
  newMessageEntry: inputContent
})

export const inputName = (name) => ({
  type: INPUT_NAME,
  name
})

export const getMessages = () => async (dispatch) => {
  const response = await axios.get('/api/messages');
  const messages = response.data;
  dispatch(gotMessagesFromServer(messages));
}


export const postNewMessageToServer = (message) => async (dispatch) => {
  const response = await axios.post('/api/messages', message);
  const returnedMessage = response.data;
  dispatch(gotNewMessageFromServer(returnedMessage));
  socket.emit('new-message', returnedMessage);
}

const initialState = {
  messages: [],
  newMessageEntry: '',
  name: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return { ...state, messages: action.messages };
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry }
    case GOT_NEW_MESSAGE_FROM_SERVER:
      return { ...state, messages: [...state.messages, action.message] }
    case INPUT_NAME:
      return { ...state, name: action.name }
    default:
      return state
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))
export default store;
