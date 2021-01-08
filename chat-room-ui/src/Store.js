import React, { createContext, useReducer } from 'react'

export const MessageContext = createContext();

const initState = {
  general: [
    { from: 'Jason', msg: 'hi' },
    { from: 'Aaron', msg: 'Hello' }
  ],
  topic2: [
    { from: 'Aaron', msg: "I'm here." }
  ]
};

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case 'RECEIVE_MESSAGE':
      return {
        ...state,
        [topic]: [
          ...state[topic],
          { from, msg }
        ]
      }
    default:
      return state
  };
}

function sendWSMessage(msg) {
  if (!conn) {
    console.log('No web socket connection');
    return;
  }
  conn.send(msg);
}

let conn;
// conn = new W3CWebSocket('ws://127.0.0.1:8080/ws');

export default function Store(props) {

  // all chats & a function to update those chats
  const [allChats, dispatch] = useReducer(reducer, initState);

  if(!conn) {
    console.log('socket connecting...');
    conn = new WebSocket(process.env.REACT_APP_WS_URL);
  };
  conn.onmessage = (message) => {
    // const data = JSON.parse(message.data);

    // test function
    console.log('[INFO]', message);
    dispatch({
      type: 'RECEIVE_MESSAGE',
      payload: {
        'from': 'admin',
        'msg': message.data,
        'topic': 'general'
      }
    });
  };

  return (
    <MessageContext.Provider value={{ allChats, sendWSMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
}