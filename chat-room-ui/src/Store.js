import React, { createContext, useReducer } from 'react'

export const MessageContext = createContext();

const initState = {
  general: [
    { from: 'Nick', msg: "Hi, I'm Nick." },
    { from: 'Nick', msg: 'Feel free to talk.' }
  ],
  cvs: [
    { from: 'Aaron', msg: "I love cvs so much." }
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
  conn.send(JSON.stringify(msg));
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
    const data = JSON.parse(message.data);

    // test function
    console.log('[INFO]', data);
    dispatch({
      type: 'RECEIVE_MESSAGE',
      payload: {
        'from': data.from,
        'msg': data.msg,
        'topic': data.topic
      }
    });
  };

  return (
    <MessageContext.Provider value={{ allChats, sendWSMessage }}>
      {props.children}
    </MessageContext.Provider>
  );
}